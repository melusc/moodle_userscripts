import {h, Fragment} from 'preact';
import clsx, {ClassValue} from 'clsx';

import {SvgIconCaretBack, SvgIconCaretForward} from '../icons';

const enum Days {
	Mo = 'Monday',
	Tu = 'Tuesday',
	We = 'Wednesday',
	Th = 'Thursday',
	Fr = 'Friday',
}

const getDay = (n: number): Days => {
	switch (n) {
		case 0:
			return Days.Mo;
		case 1:
			return Days.Tu;
		case 2:
			return Days.We;
		case 3:
			return Days.Th;
		case 4:
			return Days.Fr;
		default:
			throw new Error(`n was out of range: ${n}`);
	}
};

const ButtonGrid = ({
	handleClick,
	handleSave,
	day,
	saveButtonClass,
	resetSaveValidity,
}: {
	handleClick: (arg0: number) => void;
	handleSave: () => void;
	saveButtonClass?: ClassValue;
	resetSaveValidity: () => void;
	day: number;
}) => (
	<>
		<div class="day-controls">
			<div
				class="caret-back"
				onClick={() => {
					// Overflow from 0 to 4
					handleClick((day - 1 + 5) % 5);
				}}
			>
				<SvgIconCaretBack />
			</div>
			<div class="day-current-day">{getDay(day)}</div>
			<div
				class="caret-forward"
				onClick={() => {
					// Overflow from 4 to 0
					handleClick((day + 1) % 5);
				}}
			>
				<SvgIconCaretForward />
			</div>
		</div>
		<button
			type="button"
			class={clsx('save-button', saveButtonClass)}
			onClick={handleSave}
			onAnimationEnd={resetSaveValidity}
		>
			Save
		</button>
	</>
);

export default ButtonGrid;
