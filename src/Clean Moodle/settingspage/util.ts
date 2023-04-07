import {numericBaseSensitiveCollator} from '../../shared/general-functions/intl-collator.js';
import {getOverrides} from '../shared.js';

import type {Course} from './course.js';

/** Sort courses, mutates the array */
export const sortCoursesArray = (array: Course[]): Course[] =>
	array.sort(
		(
			{courseName: courseNameA, value: valueA},
			{courseName: courseNameB, value: valueB},
		) => {
			const textA = getName(valueA, courseNameA).trim();
			const textB = getName(valueB, courseNameB).trim();

			return numericBaseSensitiveCollator.compare(textA, textB);
		},
	);

export const getName = (
	name: string | undefined | false,
	defaultName: string,
) => (typeof name === 'string' ? name : defaultName);

/**
 * Set the new text for a course
 */
export const setReplaced = (
	course: Course,
	newValue: string | undefined = '',
) => {
	newValue = newValue.trim();

	const {courseId, courseName} = course;

	const overrides = getOverrides();
	// eslint-disable-next-line @typescript-eslint/no-dynamic-delete
	delete overrides[courseId];

	if (newValue !== '' && newValue !== courseName.trim()) {
		overrides[courseId] = newValue;
	}

	GM_setValue('overrides', overrides);
};
