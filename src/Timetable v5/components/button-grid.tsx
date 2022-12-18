import {clsx, type ClassValue} from 'clsx';
import {h, Fragment, type FunctionalComponent} from 'preact';

import {SvgIconCaretBack, SvgIconCaretForward} from '../icons.js';

const getDay = (n: number): string => {
	const d = new Date();
	d.setDate(d.getDate() - d.getDay() + (n + 1));
	return d.toLocaleString('en', {weekday: 'long'});
};

const ButtonGrid: FunctionalComponent<{
	handleClick: (arg0: number) => void;
	handleSave: () => void;
	saveButtonClass?: ClassValue;
	resetSaveValidity: () => void;
	day: number;
}> = ({handleClick, handleSave, day, saveButtonClass, resetSaveValidity}) => (
	<>
		<div class='day-controls'>
			<div
				class='caret-back'
				onClick={() => {
					// Overflow from 0 to 4
					handleClick((day - 1 + 5) % 5);
				}}
			>
				<SvgIconCaretBack />
			</div>
			<div class='day-current-day'>{getDay(day)}</div>
			<div
				class='caret-forward'
				onClick={() => {
					// Overflow from 4 to 0
					handleClick((day + 1) % 5);
				}}
			>
				<SvgIconCaretForward />
			</div>
		</div>
		<button
			type='button'
			class={clsx('save-button', saveButtonClass)}
			onClick={handleSave}
			onAnimationEnd={resetSaveValidity}
		>
			Save
		</button>
	</>
);

export default ButtonGrid;
