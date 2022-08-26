import {clsx} from 'clsx';
import {h, type FunctionalComponent, type JSX, type RefObject} from 'preact';

// eslint-disable-next-line n/file-extension-in-import
import {useRef} from 'preact/hooks';
import {SvgIconX} from '../icons.js';

import type {
	TableOnInputSelectors,
	TableRow as TypeTableRow,
} from '../settingspage.d.js';
import TimeInput from './time-input.js';

const TableRow: FunctionalComponent<{
	row: TypeTableRow;
	index: number;
	onInput: (
		target: TableOnInputSelectors,
		index: number,
	) => JSX.GenericEventHandler<HTMLInputElement>;
	deleteRow: (index: number) => void;
	handleFocus: (
		idRef?: RefObject<HTMLInputElement> | undefined,
		contentRef?: RefObject<HTMLInputElement> | undefined,
		index?: number | undefined,
	) => JSX.FocusEventHandler<HTMLElement>;
}> = ({row, index, onInput, deleteRow, handleFocus}) => {
	const {fromInvalid, from, toInvalid, to, content, id} = row;

	const idRef = useRef<HTMLInputElement>(null);
	const contentRef = useRef<HTMLInputElement>(null);

	return (
		<div class='table-row'>
			<div class='table-cell time'>
				<TimeInput
					index={index}
					class={clsx('time-from', {
						'invalid-input': fromInvalid === true,
					})}
					time={from.str}
					placeholder='HH:mm'
					onInput={onInput('from', index)}
				/>
				{' - '}
				<TimeInput
					index={3}
					class={clsx('time-to', {
						'invalid-input': toInvalid === true,
					})}
					time={to.str}
					placeholder='HH:mm'
					onInput={onInput('to', index)}
				/>
			</div>
			<div class='table-cell content'>
				<input
					ref={contentRef}
					value={content}
					placeholder='Content'
					onInput={onInput('content', index)}
					onFocus={handleFocus(idRef, contentRef, index)}
				/>
				<hr />
				<input
					ref={idRef}
					value={id}
					placeholder='Course id'
					onInput={onInput('id', index)}
					onFocus={handleFocus(idRef, contentRef, index)}
				/>
			</div>
			<div
				class='table-cell remove-row'
				onClick={() => {
					deleteRow(index);
				}}
			>
				<SvgIconX />
			</div>
		</div>
	);
};

const Table: FunctionalComponent<{
	rows: TypeTableRow[] | undefined;
	onInput: (
		target: TableOnInputSelectors,
		index: number,
	) => JSX.GenericEventHandler<HTMLInputElement>;
	deleteRow: (index: number) => void;
	handleFocus: (
		idRef?: RefObject<HTMLInputElement> | undefined,
		contentRef?: RefObject<HTMLInputElement> | undefined,
		index?: number | undefined,
	) => JSX.FocusEventHandler<HTMLElement>;
}> = ({rows, handleFocus, onInput, deleteRow}) => (
	<div>
		{rows?.map((row, index) => (
			<TableRow
				key={row.key}
				row={row}
				index={index}
				handleFocus={handleFocus}
				deleteRow={deleteRow}
				onInput={onInput}
			/>
		))}
	</div>
);

export default Table;
