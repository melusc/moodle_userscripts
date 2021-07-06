// ==UserScript==
// @name      Moodle Timetable v5
// @version   2021.07.06a
// @author    lusc
// @updateURL https://git.io/Jqlt4
// @include   *://moodle.ksasz.ch/
// @include   *://moodle.ksasz.ch/?*
// @include   *://moodle.ksasz.ch/timetable/v5*
// @grant     GM_addValueChangeListener
// @grant     GM_setValue
// @grant     GM_getValue
// @grant     GM_deleteValue
// @grant     GM_registerMenuCommand
// @grant     GM_addStyle
// @grant     GM_notification
// @run-at    document-start
// ==/UserScript==

import {Component, h, render} from 'preact';
import {initSettingsPage} from './settingspage.js';

import frontPageStyle from './frontpage.scss';
import {TimetableStates, Lang, notificationIconUrl} from './consts';
import {parseTimeToString} from './shared';

if (location.protocol !== 'https:') {
	location.protocol = 'https:';
}

type TimetableStorageValues = {
	content?: string;
	id?: string;
	from: number;
	to: number;
};
type TimetableStorageValuesWeek = Record<string, TimetableStorageValues[]>;

const TimetableRow = ({
	values,
	isNow = false,
}: {
	values: Partial<TimetableStorageValues>; // Because {content: 'No school'} should be valid or even {} (free lesson)
	isNow?: boolean;
}) => {
	const {from, to, id} = values;
	const content = values.content ?? Lang.freeLesson;

	return (
		<div class="tt-tr">
			<div class="tt-th">
				{isNow ? Lang.now : Lang.next}
				{from !== undefined
					&& to !== undefined
					&& ` (${parseTimeToString(from)} - ${parseTimeToString(to)})`}
				{
					':'
					/* To make it obvious that this
						is not part of a ternary operator
						(at a quick glance) */
				}
			</div>
			<div class="tt-td">
				{typeof id === 'string' ? (
					<a
						href={`/course/view.php?id=${id}`}
						target="_blank"
						rel="noopener noreferrer"
					>
						{content}
					</a>
				) : (
					content
				)}
			</div>
		</div>
	);
};

const getCourses = (
	minutesOfDay: number,
): Readonly<{
	state: TimetableStates;
	courses?: Array<TimetableStorageValues | undefined>;
}> => {
	const valuesWeek = GM_getValue<TimetableStorageValuesWeek | undefined>(
		'days',
	);

	const date = new Date();

	/* Make monday 0 and friday 4 (sunday -1)
		it shouldn't get here if weekend
		but if it does it can handle that */
	const dayOfWeek = date.getDay() - 1;

	const values = valuesWeek?.[dayOfWeek];

	if (values === undefined || values.length === 0) {
		return {
			state: TimetableStates.empty,
		};
	}

	const lastValue = values[values.length - 1];

	if (!lastValue || lastValue.to <= minutesOfDay) {
		return {
			state: TimetableStates.after,
		};
	}

	const firstValue = values[0];

	if (!firstValue || firstValue.from > minutesOfDay) {
		return {
			state: TimetableStates.before,
			courses: [undefined, firstValue],
		};
	}

	let currentCourseIdx = 0;
	let currentCourse: TimetableStorageValues | undefined;

	/* Continue iterating through the courses while "now"
		is after the course, meaning it has already taken place */
	while (
		(currentCourse = values[currentCourseIdx])
		&& currentCourse.to < minutesOfDay
	) {
		++currentCourseIdx;
	}

	return {
		state: TimetableStates.during,
		courses: [currentCourse, values[currentCourseIdx + 1]],
	};
};

const notify = (value: TimetableStorageValues) => {
	const {id, content} = value;

	if (content) {
		GM_notification({
			text: content,
			title: 'Now',
			image: notificationIconUrl,
			timeout: 4000,
			onclick: () => {
				open(id ? `/course/view.php?id=${id}` : '/');
			},
		});
	}
};

const isWeekday = (): boolean => {
	const day = new Date().getDay();

	return day !== 0 && day !== 6;
};

const isHoliday = (): boolean => {
	const value = GM_getValue<boolean | undefined>('isHoliday');

	if (typeof value !== 'boolean') {
		GM_setValue('isHoliday', false);
		return false;
	}

	return value;
};

type FrontPageState = {
	courses: Array<TimetableStorageValues | undefined>;
	timetableState: TimetableStates;
};

class FrontPage extends Component {
	state: FrontPageState = {
		courses: [],
		timetableState: TimetableStates.init,
	};

	timeout = {
		_t: 0,
		set: (delay: number) => {
			delay += 3; /* Due to rounding errors
				It will never be accurate up to 3ms
				but this way it never fires too early */

			const {timeout, updateCourses} = this;
			timeout.clear();
			timeout._t = setTimeout(updateCourses, delay, true);
		},
		clear: () => {
			clearTimeout(this.timeout._t);
		},
	};

	updateCourses = (calledFromTimeout?: boolean) => {
		this.timeout.clear(); // If exit early it should not fire in future

		/* If it is both holiday
			and weekend, holiday outweighs
			and gets displayed, thats
			why check isHoliday first */
		if (isHoliday()) {
			this.setState({
				timetableState: TimetableStates.holiday,
			} as FrontPageState);
			return;
		}

		if (!isWeekday()) {
			this.setState({
				timetableState: TimetableStates.weekend,
			} as FrontPageState);
			return;
		}

		const date = new Date();

		// prettier-ignore
		const minutesOfDay
			= (date.getHours() * 60)
			+ date.getMinutes()
			+ (date.getSeconds() / 60)
			+ (date.getMilliseconds() / 60 / 1000);

		const {courses, state} = getCourses(minutesOfDay);

		this.setState({
			timetableState: state,
		} as FrontPageState);

		if (courses) {
			const [currentCourse, nextCourse] = courses;

			this.setState({
				courses,
			} as FrontPageState);

			/* The current course ends at currentCourse.to,
				thats when we want a notification
				If it is currently before school though,
				we want it to notify when school starts,
				thats when we use nextCourse.from */
			const nextNotificationTimeInMinutes
				= currentCourse?.to ?? nextCourse?.from;
			if (typeof nextNotificationTimeInMinutes === 'number') {
				const diff = nextNotificationTimeInMinutes - minutesOfDay; // In minutes
				this.timeout.set(diff * 60 * 1000); // In milliseconds
			}

			if (calledFromTimeout && currentCourse) {
				notify(currentCourse);
			}
		}
	};

	componentDidMount = () => {
		this.updateCourses();

		const listener = () => {
			this.updateCourses();
		};

		GM_addValueChangeListener('days', listener);

		GM_addValueChangeListener('isHoliday', listener);
	};

	render = () => {
		const {timetableState, courses} = this.state;
		const [currentCourse, nextCourse] = courses;
		return (
			<div>
				<div class="mod-indent-outer">
					<div class="contentwithoutlink">
						<div class="no-overflow">
							<hr/>
							<div class="tt-body">
								<div class="tt-title">Timetable</div>

								{timetableState === TimetableStates.init && <div>Loading</div>}

								{timetableState === TimetableStates.after && (
									<div>{Lang.afterSchool}</div>
								)}
								{timetableState === TimetableStates.weekend && (
									<div class="tt-title">{Lang.weekend}</div>
								)}
								{timetableState === TimetableStates.holiday && (
									<div class="tt-title">{Lang.holiday}</div>
								)}

								{timetableState === TimetableStates.empty && (
									<div>
										{Lang.emptyBeforeAnchor}
										<a
											href="/timetable/v5"
											rel="noopener noreferrer"
											target="_blank"
										>
											{Lang.emptyInAnchor}
										</a>
									</div>
								)}
								<div class="tt-table">
									{(timetableState === TimetableStates.before
										|| timetableState === TimetableStates.during) && (
										<div class="tt-tbody">
											{
												/* If currentCourse is undefined
													it is currently before school
													in that case we show "No school" instead */
												<TimetableRow
													isNow
													values={currentCourse ?? {content: Lang.noSchool}}
												/>
											}
											{
												/* If nextCourse is undefined
												  there is no next lesson (next lesson
													is free, after school),
													so instead we show "no school" */
												<TimetableRow
													values={nextCourse ?? {content: Lang.noSchool}}
												/>
											}
										</div>
									)}
								</div>
							</div>
							{
								<hr/>
								/* Comment to point out that this
								isn't a boring old closing tag */
							}
						</div>
					</div>
				</div>
			</div>
		);
	};
}

const initFrontpage = () => {
	GM_registerMenuCommand('Open settings', () => {
		open('/timetable/v5', '_blank');
	});

	GM_registerMenuCommand('Toggle holiday', () => {
		GM_setValue('isHoliday', !GM_getValue('isHoliday'));
	});

	GM_addStyle(frontPageStyle);

	const main = document.querySelector<HTMLUListElement>(
		'#region-main-box ul.section',
	);

	if (main) {
		const li = document.createElement('li');

		li.id = 'module-timetable-v5';
		li.className = 'activity label modtype_label';
		main.prepend(li);

		render(<FrontPage/>, li);
	}
};

const functionToRun = /^\/timetable\/v5/i.test(location.pathname)
	? initSettingsPage
	: initFrontpage;

if (document.readyState === 'complete') {
	functionToRun();
} else {
	addEventListener('DOMContentLoaded', functionToRun, {once: true});
}
