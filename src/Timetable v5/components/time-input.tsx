import {h, JSX} from 'preact';
import clsx, {ClassValue} from 'clsx';

import {Except} from 'type-fest';
import {parseStringToTime} from '../shared';

type TimeInputCustomProps = {
	time: string;
	class: ClassValue;
	index: number;
};

const TimeInput = ({
	time,
	class: class_,
	onInput: handleInput,
	index,
	...props
}: TimeInputCustomProps &
	Except<JSX.HTMLAttributes<HTMLInputElement>, 'class'>) => (
	<input
		{...props}
		class={clsx('time-input', class_, {
			'invalid-input': parseStringToTime(time) === false,
		})}
		value={time}
		onInput={handleInput}
	/>
);

export default TimeInput;
