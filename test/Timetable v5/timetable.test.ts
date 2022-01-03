import {TimetableStates} from '../../src/Timetable v5/consts';
import {
	getNextDay,
	getCourses,
	getMinutesSinceMidnight,
	getMsSinceMidnight,
} from '../../src/Timetable v5/timetable';

type GetCourses = ReturnType<typeof getCourses>;

describe('getNextDay', () => {
	jest.useFakeTimers();

	test('on Sunday', () => {
		jest.setSystemTime(new Date(2022, 0, 2, 12));

		expect(
			getNextDay({
				0: [
					{
						from: 8 * 60,
						to: 9 * 60,
					},
				],
			}),
		).toStrictEqual(12 * 60 * 60 * 1000);
	});

	test('on Friday', () => {
		jest.setSystemTime(new Date(2022, 0, 7));

		expect(
			getNextDay({
				0: [
					{
						from: 8 * 60,
						to: 9 * 60,
					},
				],
			}),
		).toStrictEqual(24 * 3 * 60 * 60 * 1000);
	});

	test('on Friday without Monday', () => {
		jest.setSystemTime(new Date(2022, 0, 7));

		expect(
			getNextDay({
				0: [],
				1: [
					{
						from: 8 * 60,
						to: 9 * 60,
					},
				],
			}),
		).toStrictEqual(24 * 4 * 60 * 60 * 1000);
	});

	test('on empty Timetable', () => {
		// Doesn't matter which what time

		expect(getNextDay({})).toBeUndefined();
	});

	test('on timetable with one day', () => {
		// Monday
		jest.setSystemTime(new Date(2022, 0, 3, 12));

		expect(
			getNextDay({
				0: [
					{
						from: 8 * 60,
						to: 9 * 60,
					},
				],
			}),
		).toStrictEqual((12 + 6 * 24) * 60 * 60 * 1000);
	});

	test('with undefined', () => {
		expect(getNextDay(undefined)).toBeUndefined();
	});
});

describe('getMinutesSinceMidnight', () => {
	jest.useFakeTimers();

	test('08:32:01.124', () => {
		jest.setSystemTime(new Date(2022, 0, 3, 8, 32, 1, 124));

		expect(getMinutesSinceMidnight()).toStrictEqual(
			8 * 60 + 32 + 1 / 60 + 124 / 60 / 1000,
		);
	});
});

describe('getMsSinceMidnight', () => {
	jest.useFakeTimers();

	test('08:32:01.124', () => {
		jest.setSystemTime(new Date(2022, 0, 3, 8, 32, 1, 124));

		expect(getMsSinceMidnight()).toStrictEqual(
			8 * 60 * 60 * 1000 + 32 * 60 * 1000 + 1 * 1000 + 124,
		);
	});
});

describe('getCourses', () => {
	jest.useFakeTimers();

	test('During course with next course', () => {
		// 2022-01-03T08:01:00.000Z, Monday
		jest.setSystemTime(new Date(2022, 0, 3, 8, 1));

		const courses = [
			{
				from: 8 * 60,
				to: 9 * 60,
			},
			{
				from: 9 * 60 + 5,
				to: 10 * 60 + 5,
			},
		];

		expect(
			getCourses({
				0: courses,
			}),
		).toStrictEqual<GetCourses>({
			state: TimetableStates.during,
			timeToUpdate: 59 * 60 * 1000,
			courses,
		});
	});

	test('during course with no next course', () => {
		// 2022-01-03T08:01:00.000Z, Monday
		jest.setSystemTime(new Date(2022, 0, 3, 8, 1));

		expect(
			getCourses({
				0: [
					{
						from: 8 * 60,
						to: 9 * 60,
					},
				],
				1: [
					{
						from: 8 * 60,
						to: 9 * 60,
					},
				],
			}),
		).toStrictEqual<GetCourses>({
			state: TimetableStates.during,
			timeToUpdate: 59 * 60 * 1000,
			courses: [
				{
					from: 8 * 60,
					to: 9 * 60,
				},
				undefined,
			],
		});
	});

	test('before course with next course', () => {
		// 2022-01-03T07:00:00.000Z, Monday
		jest.setSystemTime(new Date(2022, 0, 3, 7));

		expect(
			getCourses({
				0: [
					{
						from: 8 * 60,
						to: 9 * 60,
					},
				],
			}),
		).toStrictEqual<GetCourses>({
			state: TimetableStates.before,
			timeToUpdate: 60 * 60 * 1000,
			courses: [
				undefined,
				{
					from: 8 * 60,
					to: 9 * 60,
				},
			],
		});
	});

	test('after course with next course', () => {
		// 2022-01-03T09:00:00.000Z, Monday
		jest.setSystemTime(new Date(2022, 0, 3, 9));

		expect(
			getCourses({
				0: [
					{
						from: 8 * 60,
						to: 9 * 60,
					},
					{
						from: 9 * 60 + 5,
						to: 10 * 60 + 5,
					},
					{
						from: 10 * 60 + 10,
						to: 11 * 60 + 10,
					},
				],
				1: [
					{
						from: 8 * 60,
						to: 9 * 60,
					},
				],
			}),
		).toStrictEqual<GetCourses>({
			state: TimetableStates.during,
			timeToUpdate: 65 * 60 * 1000,
			courses: [
				{
					from: 9 * 60 + 5,
					to: 10 * 60 + 5,
				},
				{
					from: 10 * 60 + 10,
					to: 11 * 60 + 10,
				},
			],
		});
	});
	test('after course with no next course', () => {
		// 2022-01-03T09:00:00.000Z, Monday
		jest.setSystemTime(new Date(2022, 0, 3, 9));

		expect(
			getCourses({
				0: [
					{
						from: 8 * 60,
						to: 9 * 60,
					},
				],
				1: [
					{
						from: 8 * 60,
						to: 9 * 60,
					},
				],
			}),
		).toStrictEqual<GetCourses>({
			state: TimetableStates.after,
			timeToUpdate: 15 * 60 * 60 * 1000,
		});
	});

	test('empty timetable', () => {
		expect(getCourses({})).toStrictEqual<GetCourses>({
			state: TimetableStates.empty,
			timeToUpdate: undefined,
		});
	});

	test('empty day, next course next day', () => {
		// 2022-01-03T08:00:00.000Z, Monday
		jest.setSystemTime(new Date(2022, 0, 3, 8));

		expect(
			getCourses({
				1: [
					{
						from: 8 * 60,
						to: 9 * 60,
					},
				],
			}),
		).toStrictEqual<GetCourses>({
			state: TimetableStates.empty,
			timeToUpdate: 16 * 60 * 60 * 1000,
		});
	});

	test('After course, next course today next week', () => {
		// 2022-01-03T09:00:00.000Z, Monday
		jest.setSystemTime(new Date(2022, 0, 3, 9));

		expect(
			getCourses({
				0: [
					{
						from: 8 * 60,
						to: 9 * 60,
					},
				],
			}),
		).toStrictEqual<GetCourses>({
			state: TimetableStates.after,
			timeToUpdate: (15 + 24 * 6) * 60 * 60 * 1000,
		});
	});

	test('Last course of day', () => {
		// 2022-01-03T012:00:00.000Z, Monday
		jest.setSystemTime(new Date(2022, 0, 3, 12));

		expect(
			getCourses({
				0: [
					{
						from: 8 * 60,
						to: 9 * 60,
					},
					{
						from: 9 * 60,
						to: 10 * 60,
					},
					{
						from: 10 * 60,
						to: 11 * 60,
					},
					{
						from: 12 * 60,
						to: 13 * 60,
					},
				],
			}),
		).toStrictEqual<GetCourses>({
			state: TimetableStates.during,
			timeToUpdate: 60 * 60 * 1000,
			courses: [
				{
					from: 12 * 60,
					to: 13 * 60,
				},
				undefined,
			],
		});
	});

	test('with undefined', () => {
		expect(getCourses(undefined)).toStrictEqual<GetCourses>({
			state: TimetableStates.empty,
			timeToUpdate: undefined,
		});
	});
});
