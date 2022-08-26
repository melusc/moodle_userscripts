import type {RefObject} from 'preact';
import type {FixedLengthArray} from 'type-fest';

type Time = {
	str: string;
	num: number;
};

type TableRow = {
	from: Time;
	to: Time;
	id: string;
	content: string;
	key: string;
	fromInvalid?: true;
	toInvalid?: true;
};

type TableOnInputSelectors = 'content' | 'from' | 'to' | 'id';

type SingleDay = Array<{
	from: number;
	to: number;
	content?: string;
	id?: string;
}>;

type Course = {
	id: string;
	name: string;
	key: string;
};

type SettingsPageState = {
	day: number;
	loggedOut: boolean;
	courses: Course[];
	focusedElement:
		| {
				top: number;
				left: number;
				height: number;
				inputText: string;
				index: number;
		  }
		| undefined;
	tables: FixedLengthArray<TableRow[], 5>;
	saveValidity: boolean | undefined;
};

export type {
	TableRow,
	SingleDay,
	Course,
	SettingsPageState,
	TableOnInputSelectors,
};
