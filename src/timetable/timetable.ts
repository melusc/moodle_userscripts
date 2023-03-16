import {TimetableStates} from './consts.js';

export type TimetableStorageValues = {
	content?: string;
	id?: string;
	from: number;
	to: number;
};

export type TimetableStorageValuesWeek = Record<
	string,
	TimetableStorageValues[]
>;

export const getMsSinceMidnight = (): number => {
	const now = new Date();

	/* ((now)) - ((midnight)) doesn't work because it would be wrong when daylight savings changes
	 * Instead we use the method below because this always returns what "you can see on the clock"
	 * With daylight savings 08:00 might be 9 hours after midnight but we'd still want this to behave
	 * like it's 8 hours since
	 */

	// prettier-ignore
	return (
		(now.getHours() * 60 * 60 * 1000)
		+ (now.getMinutes() * 60 * 1000)
		+ (now.getSeconds() * 1000)
		+ (now.getMilliseconds())
	);
};

export const getMinutesSinceMidnight = (): number =>
	getMsSinceMidnight() / 60 / 1000;

export const getNextDay = (
	valuesWeek?: TimetableStorageValuesWeek,
): number | undefined => {
	if (valuesWeek === undefined) {
		return undefined;
	}

	// Monday is 0, Sunday is 6
	let day = new Date().getDay(); // Because we want next day but Sunday is 0 we can use it as is
	let offsetDays = 1;
	let values: TimetableStorageValuesWeek[string] | undefined;

	// While the current value is either not defined or empty
	while (
		(!(values = valuesWeek[day]) || values.length === 0)
		&& offsetDays <= 7
	) {
		++day;
		day %= 7;
		++offsetDays;
	}

	if (offsetDays > 7 || !values) {
		return undefined;
	}

	const nextDate = new Date();
	nextDate.setDate(nextDate.getDate() + offsetDays);
	nextDate.setHours(0, 0, 0, 0);

	return nextDate.getTime() - Date.now();
};

export const getCourses = (
	valuesWeek?: TimetableStorageValuesWeek,
): Readonly<{
	state: TimetableStates;
	courses?: Array<TimetableStorageValues | undefined>;
	timeToUpdate?: number | undefined;
}> => {
	const date = new Date();
	const minutesOfDay = getMinutesSinceMidnight();

	/* Make monday 0, friday 4, sunday 6, ... */
	const dayOfWeek = (date.getDay() + 6) % 7;

	const values = valuesWeek?.[dayOfWeek];

	if (values === undefined || values.length === 0) {
		return {
			state: TimetableStates.empty,
			timeToUpdate: getNextDay(valuesWeek),
		};
	}

	// `values.length === 0` is handled above
	const firstValue = values[0]!;

	if (firstValue.from > minutesOfDay) {
		return {
			state: TimetableStates.before,
			courses: [undefined, firstValue],
			// prettier-ignore
			timeToUpdate: (firstValue.from * 60 * 1000) - getMsSinceMidnight(),
		};
	}

	let currentCourseIdx = 0;
	let currentCourse: TimetableStorageValues | undefined;

	/* Continue iterating through the courses while "now"
	is after the course, meaning it has already taken place */
	while (
		(currentCourse = values[currentCourseIdx])
		&& currentCourse.to <= minutesOfDay
	) {
		++currentCourseIdx;
	}

	if (currentCourse === undefined) {
		return {
			state: TimetableStates.after,
			timeToUpdate: getNextDay(valuesWeek),
		};
	}

	// prettier-ignore
	const timeToUpdate = (currentCourse.to * 60 * 1000) - getMsSinceMidnight();

	return {
		state: TimetableStates.during,
		courses: [currentCourse, values[currentCourseIdx + 1]],
		timeToUpdate,
	};
};
