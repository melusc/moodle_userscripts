import {clsx, type ClassValue} from 'clsx';
import type {FunctionalComponent, JSX} from 'preact';

import type {Except} from 'type-fest';
import {parseStringToTime} from '../shared.js';

const TimeInput: FunctionalComponent<
	{
		time: string;
		class: ClassValue;
		index: number;
	} & Except<JSX.HTMLAttributes<HTMLInputElement>, 'class' | 'value'>
> = ({time, class: class_, index, ...props}) => (
	<input
		{...props}
		class={clsx('time-input', class_, {
			'invalid-input': parseStringToTime(time) === false,
		})}
		value={time}
	/>
);

export default TimeInput;
