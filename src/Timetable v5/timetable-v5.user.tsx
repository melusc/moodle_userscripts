// ==UserScript==
// @name      Moodle Timetable v5
// @version   1.2.1
// @author    lusc
// @updateURL https://git.io/JXzjr
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

import {Component, FunctionalComponent, h, render} from 'preact';

import {
	upgrader,
	cleanAuthStorage,
	domReady,
} from '../shared/general-functions/index.js';

import {initSettingsPage} from './settingspage.js';
import frontPageStyle from './frontpage.scss';
import {TimetableStates, Lang, notificationIconUrl} from './consts.js';
import {parseTimeToString} from './shared.js';
import {
	getCourses,
	TimetableStorageValues,
	TimetableStorageValuesWeek,
} from './timetable.js';

upgrader({
	'1.2.0': cleanAuthStorage,
});

if (location.protocol !== 'https:') {
	location.protocol = 'https:';
}

const getHref = (href: string): string => {
	if (Number.isInteger(Number(href))) {
		return `/course/view.php?id=${href}`;
	}

	return href;
};

const TimetableRow: FunctionalComponent<{
	values: Partial<TimetableStorageValues>; // Because {content: 'No school'} should be valid or even {} (free lesson)
	isNow?: boolean;
}> = ({values, isNow = false}) => {
	const {from, to, id} = values;
	const content = values.content ?? Lang.freeLesson;

	return (
		<div class='tt-tr'>
			<div class='tt-th'>
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
			<div class='tt-td'>
				{typeof id === 'string' ? (
					<a href={getHref(id)} target='_blank' rel='noopener noreferrer'>
						{content}
					</a>
				) : (
					content
				)}
			</div>
		</div>
	);
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
			onclick() {
				if (id !== undefined) {
					open(getHref(id));
				}
			},
		}) as undefined | {remove: () => void}; // Allow for timeout also with greasemonkey (which requires .remove)

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

	setTimeout = (timeoutDuration?: number) => {
		this.clearTimeout();

		if (timeoutDuration !== undefined) {
			this._timeoutId = setTimeout(() => {
				this.updateCourses(true);
			}, timeoutDuration + 200 /* Never fire too early due to rounding errors */);
		}
	};

	clearTimeout = () => {
		if (this._timeoutId !== undefined) {
			clearTimeout(this._timeoutId);
		}
	};

	updateCourses = (calledFromTimeout?: boolean) => {
		this.clearTimeout(); // If exit early it should not fire in future

		/* If it is both holiday
		 * and weekend, holiday outweighs */
		if (isHoliday()) {
			this.setState({
				timetableState: TimetableStates.holiday,
			});
			return;
		}

		const {courses, state, timeToUpdate} = getCourses(
			GM_getValue<TimetableStorageValuesWeek | undefined>('days'),
		);

		this.setTimeout(timeToUpdate);

		if (!isWeekday()) {
			this.setState({
				timetableState: TimetableStates.weekend,
			});

			return;
		}

		this.setState({
			timetableState: state,
		});

		if (courses) {
			const [currentCourse] = courses;

			this.setState({
				courses,
			});

			if (calledFromTimeout && currentCourse) {
				notify(currentCourse);
			}
		}
	};

	override componentDidMount() {
		this.updateCourses();

		const listener = () => {
			this.updateCourses();
		};

		GM_addValueChangeListener('days', listener);

		GM_addValueChangeListener('isHoliday', listener);
	}

	render() {
		const {timetableState, courses} = this.state;
		const [currentCourse, nextCourse] = courses;
		return (
			<div>
				<div class='mod-indent-outer w-100'>
					<div class='contentwithoutlink'>
						<div class='no-overflow'>
							<hr />
							<div class='tt-body'>
								<div class='tt-title'>Timetable</div>

								{timetableState === TimetableStates.init && <div>Loading</div>}

								{timetableState === TimetableStates.after && (
									<div>{Lang.afterSchool}</div>
								)}
								{timetableState === TimetableStates.weekend && (
									<div class='tt-title'>{Lang.weekend}</div>
								)}
								{timetableState === TimetableStates.holiday && (
									<div class='tt-title'>{Lang.holiday}</div>
								)}

								{timetableState === TimetableStates.empty && (
									<div>
										{Lang.emptyBeforeAnchor}
										<a
											href='/timetable/v5'
											rel='noopener noreferrer'
											target='_blank'
										>
											{Lang.emptyInAnchor}
										</a>
									</div>
								)}
								<div class='tt-table'>
									{(timetableState === TimetableStates.before
										|| timetableState === TimetableStates.during) && (
										<div class='tt-tbody'>
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
													so instead we show "No school" */
												/* If currentCourse and nextCourse is undefined
													`timetableState` is `TimetableStates.after` or `.empty`,
													so it never is the case here */
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
	}
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

const init = /^\/timetable\/v5/i.test(location.pathname)
	? initSettingsPage
	: initFrontpage;

domReady(init);
