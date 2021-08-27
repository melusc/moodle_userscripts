// ==UserScript==
// @name      Moodle Timetable v5
// @version   2021.08.27a
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
import {initSettingsPage} from './settingspage';

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

const getHref = (href: string): string => {
	if (Number.isInteger(Number(href))) {
		return `/course/view.php?id=${href}`;
	}

	return href;
};

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
					<a href={getHref(id)} target="_blank" rel="noopener noreferrer">
						{content}
					</a>
				) : (
					content
				)}
			</div>
		</div>
	);
};

const getMinutesSinceMidnight = (): number => {
	const now = new Date();

	/* ((now)) - ((midnight)) doesn't work because it would be wrong when daylight savings changes
	 * Instead we use the method below because this always returns what "you can see on the clock"
	 * With daylight savings 08:00 might be 9 hours after midnight but we'd still want this to behave
	 * like it's 8 hours since
	 */

	// prettier-ignore
	return (
		(now.getHours() * 60)
		+ now.getMinutes()
		+ (now.getSeconds() / 60)
		+ (now.getMilliseconds() / 60 / 1000)
	);
};

const getCourses = (): Readonly<{
	state: TimetableStates;
	courses?: Array<TimetableStorageValues | undefined>;
}> => {
	const valuesWeek = GM_getValue<TimetableStorageValuesWeek | undefined>(
		'days',
	);

	const date = new Date();
	const minutesOfDay = getMinutesSinceMidnight();

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
		const timeout = 4000;

		/* If this is running in violentmonkey the function below returns an object
		 * to remove the notification
		 * https://violentmonkey.github.io/api/gm/#gm_notification
		 *
		 * If this is running in tampermonkey it uses the timeout value instead
		 */

		// eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
		const notification = GM_notification({
			text: content,
			title: 'Now',
			image: notificationIconUrl,
			timeout,
			onclick: () => {
				if (id !== undefined) {
					open(getHref(id));
				}
			},
		}) as undefined | {remove: () => void};

		if (notification) {
			setTimeout(() => {
				notification.remove();
			}, timeout);
		}
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

class FrontPage extends Component<Record<string, unknown>, FrontPageState> {
	override state: FrontPageState = {
		courses: [],
		timetableState: TimetableStates.init,
	};

	_timeoutId: ReturnType<typeof setTimeout> | undefined;

	setTimeout = (nextNotificationTimeInMinutes: number) => {
		const currentTimeInMinutes = getMinutesSinceMidnight();

		const delayInMinutes = nextNotificationTimeInMinutes - currentTimeInMinutes;
		const delay = delayInMinutes * 60 * 1000;

		this.clearTimeout();

		this._timeoutId = setTimeout(() => {
			this.updateCourses(true);
		}, delay + 200 /* Never fire too early due to rounding errors */);
	};

	clearTimeout = () => {
		if (this._timeoutId !== undefined) {
			clearTimeout(this._timeoutId);
		}
	};

	updateCourses = (calledFromTimeout?: boolean) => {
		this.clearTimeout(); // If exit early it should not fire in future

		/* If it is both holiday
		 * and weekend, holiday outweighs
		 * and gets displayed, thats
		 * why check isHoliday first */
		if (isHoliday()) {
			this.setState({
				timetableState: TimetableStates.holiday,
			} as FrontPageState);
			return;
		}

		if (!isWeekday()) {
			this.setState({
				timetableState: TimetableStates.weekend,
			});
			return;
		}

		const {courses, state} = getCourses();

		this.setState({
			timetableState: state,
		});

		if (courses) {
			const [currentCourse, nextCourse] = courses;

			this.setState({
				courses,
			});

			/* The current course ends at currentCourse.to,
				thats when we want a notification
				If it is currently before school though,
				we want it to notify when school starts,
				thats when we use nextCourse.from */
			const nextNotificationTimeInMinutes
				= currentCourse?.to ?? nextCourse?.from;
			if (typeof nextNotificationTimeInMinutes === 'number') {
				this.setTimeout(nextNotificationTimeInMinutes);
			}

			if (calledFromTimeout && currentCourse) {
				notify(currentCourse);
			}
		}
	};

	override componentDidMount = () => {
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
							<hr />
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
								<hr />
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

		render(<FrontPage />, li);
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
