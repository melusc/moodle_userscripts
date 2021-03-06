import {h, JSX, RefObject} from 'preact';
import clsx from 'clsx';

import {useRef} from 'preact/hooks';
import {SvgIconX} from '../icons';

import {
	TableRow as TypeTableRow,
	TableOnInputSelectors,
} from '../settingspage.d';
import TimeInput from './time-input';

const TableRow = ({
	row,
	index,
	onInput,
	deleteRow,
	handleFocus,
}: {
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
}) => {
	const {fromInvalid, from, toInvalid, to, content, id} = row;

	const idRef = useRef<HTMLInputElement>(null);
	const contentRef = useRef<HTMLInputElement>(null);

	return (
		<div class="table-row">
			<div class="table-cell time">
				<TimeInput
					index={index}
					class={clsx('time-from', {
						'invalid-input': fromInvalid === true,
					})}
					time={from.str}
					placeholder="HH:mm"
					onInput={onInput('from', index)}
				/>
				{' - '}
				<TimeInput
					index={3}
					class={clsx('time-to', {
						'invalid-input': toInvalid === true,
					})}
					time={to.str}
					placeholder="HH:mm"
					onInput={onInput('to', index)}
				/>
			</div>
			<div class="table-cell content">
				<input
					ref={contentRef}
					value={content}
					placeholder="Content"
					onInput={onInput('content', index)}
					onFocus={handleFocus(idRef, contentRef, index)}
				/>
				<hr />
				<input
					ref={idRef}
					value={id}
					placeholder="Course id"
					onInput={onInput('id', index)}
					onFocus={handleFocus(idRef, contentRef, index)}
				/>
			</div>
			<div
				class="table-cell remove-row"
				onClick={() => {
					deleteRow(index);
				}}
			>
				<SvgIconX />
			</div>
		</div>
	);
};

const Table = ({
	rows,
	handleFocus,
	onInput,
	deleteRow,
}: {
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
}) => (
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
