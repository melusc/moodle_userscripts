import {render, Component, Fragment, h, createRef} from 'preact';
import {produce} from 'immer';
import {getCourses} from '../shared/moodle-functions';
import {uniqueId} from '../shared/general-functions';
import {parseTimeToString, moodleIcon} from './shared';
import settingsPageStyle from './settingspage.scss';

const title = 'Moodle timetable v5';

const parseStringToTimeInput = document.createElement('input');
parseStringToTimeInput.type = 'time';

const parseStringToTime = raw => {
	const string = raw.trim();

	if (!/^\d{2}:\d{2}$/.test(string)) {
		return false;
	}

	parseStringToTimeInput.value = string;
	if (parseStringToTimeInput.value !== string) {
		return false;
	}

	const [hour, minute] = string.split(':');

	const hoursInMinutes = Number(hour) * 60; // To stop prettier removing parens and eslint complaining

	return hoursInMinutes + Number(minute);
};

const defaultTimes = () =>
	[
		{from: '08:00', to: '08:45'},
		{from: '08:45', to: '09:30'},
		{from: '09:50', to: '10:35'},
		{from: '10:40', to: '11:25'},
		{from: '11:30', to: '12:15'},
		{from: '12:15', to: '13:10'},
		{from: '13:10', to: '13:55'},
		{from: '13:55', to: '14:40'},
		{from: '14:50', to: '15:35'},
		{from: '15:35', to: '16:15'},
	].map(item => ({
		...item,
		key: uniqueId(),
		parsedfrom: parseStringToTime(item.from),
		parsedto: parseStringToTime(item.to),
	}));

const validateTimeOrder = array =>
	produce(array, draftArray => {
		for (let index = 0; index < draftArray.length; ++index) {
			const currentFrom = draftArray[index].parsedfrom;
			const currentTo = draftArray[index].parsedto;
			let isCurrentValid = true;

			if (Number.isInteger(currentFrom) && Number.isInteger(currentTo)) {
				if (currentFrom > currentTo) {
					draftArray[index].fromvalid = false;
					draftArray[index].tovalid = false;
					isCurrentValid = false;
				} else {
					delete draftArray[index].fromvalid;
					delete draftArray[index].tovalid;
				}
			}

			if (index > 0) {
				const previousTo = draftArray[index - 1].parsedto;

				if (Number.isInteger(previousTo) && Number.isInteger(currentFrom)) {
					if (currentFrom < previousTo) {
						draftArray[index].fromvalid = false;
						draftArray[index - 1].tovalid = false;
					} else {
						if (isCurrentValid) {
							delete draftArray[index].fromvalid;
						}

						delete draftArray[index - 1].tovalid;
					}
				}
			}

			if (index < draftArray.length - 1) {
				const nextFrom = draftArray[index + 1].parsedfrom;

				if (Number.isInteger(currentTo) && Number.isInteger(nextFrom)) {
					if (nextFrom < currentTo) {
						draftArray[index].tovalid = false;
						draftArray[index + 1].fromvalid = false;
					} else {
						if (isCurrentValid) {
							delete draftArray[index].tovalid;
						}

						delete draftArray[index + 1].fromvalid;
					}
				}
			}
		}
	});

const filterCourses = (array, inputText) => {
	const result = [];
	const regex = new RegExp(inputText, 'i');

	for (const item of array) {
		if (regex.test(item.name)) {
			result.push({
				...item,
				index: item.name.toLowerCase().indexOf(inputText),
			});
		}
	}

	result.sort(({index: indexA}, {index: indexB}) => indexA - indexB);

	return result;
};

const timeStringIsValid = (() => {
	const input = document.createElement('input');

	input.type = 'time';

	return raw => {
		const string = `${raw}`.trim();

		if (!/^\d{2}:\d{2}$/.test(string)) {
			return false;
		}

		input.value = string;
		return input.value === string;
	};
})();

const testIsValidRow = ({from, to}) => {
	const fromValid = timeStringIsValid(from);
	const toValid = timeStringIsValid(to);

	return fromValid && toValid;
};

const focusTarget = (target, offset) => {
	if (target instanceof HTMLElement) {
		const range = new Range();
		const sel = getSelection();
		const start = Number(offset ?? target.textContent.length);

		target.focus();
		range.setStart(target.childNodes[0] ?? target, start);
		range.collapse(true);
		sel.removeAllRanges();
		sel.addRange(range);
	}
};

const SvgIconX = () => (
	<svg viewBox="0 0 512 512">
		<path
			stroke="currentColor"
			stroke-linecap="round"
			stroke-width="32"
			d="M368 368L144 144m224 0L144 368"
		/>
	</svg>
);
const SvgIconCaretBack = () => (
	<svg viewBox="0 0 512 512">
		<path
			fill="currentColor"
			d="M321.94 98L158.82 237.78a24 24 0 000 36.44L321.94 414c15.57 13.34 39.62 2.28 39.62-18.22v-279.6c0-20.5-24.05-31.56-39.62-18.18z"
		/>
	</svg>
);
const SvgIconCaretForward = () => (
	<svg viewBox="0 0 512 512">
		<path
			fill="currentColor"
			d="M190.06 414l163.12-139.78a24 24 0 000-36.44L190.06 98c-15.57-13.34-39.62-2.28-39.62 18.22v279.6c0 20.5 24.05 31.56 39.62 18.18z"
		/>
	</svg>
);
const SvgIconAdd = () => (
	<svg viewBox="0 0 512 512">
		<path
			stroke="currentColor"
			stroke-linecap="round"
			stroke-width="32"
			d="M256 112v288m144-144H112"
		/>
	</svg>
);
const Table = ({content, handleFocus}) => (
	<div class="table" onFocus={handleFocus}>
		{content?.map(({from, to, content, id, fromvalid, tovalid, key}) => (
			<div key={key} class="table-row">
				<div class="table-cell time">
					<span
						contentEditable
						class={`time-input time-from${
							timeStringIsValid(from) && fromvalid !== false
								? ''
								: ' invalid-input'
						}`}
					>
						{from}
					</span>
					{' - '}
					<span
						contentEditable
						class={`time-input time-to${
							timeStringIsValid(to) && tovalid !== false ? '' : ' invalid-input'
						}`}
					>
						{to}
					</span>
				</div>
				<div class="table-cell entry">
					<span contentEditable data-type="content">
						{content}
					</span>
					<hr/>
					<span contentEditable data-type="id">
						{id}
					</span>
				</div>
				<div class="table-cell remove-row">
					<SvgIconX/>
				</div>
			</div>
		))}
	</div>
);
const buttonGridRemoveAnimation = ({target}) => {
	target?.classList?.remove('save-failed', 'save-successful');
};

const ButtonGrid = ({handleClick, handleSave, saveButtonRef, day}) => (
	<>
		<div class="day-controls" onClick={handleClick}>
			<div class="caret-input caret-back">
				<SvgIconCaretBack/>
			</div>
			<div>{day}</div>
			<div class="caret-input caret-forward">
				<SvgIconCaretForward/>
			</div>
		</div>
		<button
			ref={saveButtonRef}
			type="button"
			class="save-button"
			onClick={handleSave}
			onAnimationEnd={buttonGridRemoveAnimation}
		>
			Save
		</button>
	</>
);
const SettingsPage = (() => {
	const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
	const createTable = () => {
		const array = [];

		for (let index = 0, l = DAYS.length; index < l; ++index) {
			const storedValue = GM_getValue('days')?.[index];

			if (storedValue) {
				array[index] = storedValue.map(({from, to, content, id}) => ({
					from: parseTimeToString(from),
					parsedfrom: from,
					to: parseTimeToString(to),
					parsedto: to,
					id,
					content,
					key: uniqueId(),
				}));
			} else {
				array[index] = defaultTimes();
			}
		}

		return array;
	};

	let activeDay = new Date().getDay() - 1;

	if (activeDay === -1 || activeDay === 5) {
		activeDay = 0;
	}

	return class SettingsPage extends Component {
		state = {
			activeDay,
			tables: createTable(),
			focusedElement: {
				top: undefined,
				left: undefined,
				height: undefined,
				inputText: '',
				idInput: undefined,
				contentInput: undefined,
			},
			courses: [],

			loggedOut: false,
			loggedOutCallback: undefined,
		};

		inputs = {
			username: createRef(),
			password: createRef(),
		};

		saveButtonRef = createRef();

		render = () => {
			const {
				activeDay,
				tables,
				courses,
				focusedElement: {top, left, height, inputText},
			} = this.state;

			return (
				<>
					{this.state.loggedOut && (
						<div class="login-popup">
							<div class="vertical-horizontal-center">
								<div class="card">
									<div class="card-body">
										<h5 class="card-title">Login</h5>
										<input
											ref={this.inputs.username}
											required
											placeholder="Username"
											class="input-group-text"
										/>
										<input
											ref={this.inputs.password}
											required
											placeholder="Password"
											class="input-group-text"
											type="password"
										/>
									</div>
									<button
										type="button"
										class="btn btn-primary"
										onClick={this.handleLoginClick}
									>
										Login
									</button>
								</div>
							</div>
						</div>
					)}
					<div class="container">
						<div class="table-center">
							<div class="grid-buttons">
								<ButtonGrid
									day={DAYS[activeDay]}
									handleSave={this.handleSave}
									saveButtonRef={this.saveButtonRef}
									handleClick={this.handleCaretClick}
								/>
							</div>
							<div
								class="main-table"
								onKeyDown={this.handleTableKeyDown}
								onKeyUp={this.handleTableKeyUp}
								onInput={this.handleTableInput}
								onClick={this.handleTableClick}
							>
								<Table
									content={tables[activeDay]}
									handleFocus={this.handleTableFocus}
								/>
								<div class="row-icon-add-row">
									<div class="icon-add-row" onClick={this.createRow}>
										<SvgIconAdd/>
									</div>
								</div>
							</div>
						</div>
					</div>
					{typeof top === 'number' && ( // If top is type num all are
						<div
							class="suggestions"
							style={{transform: `translate(${left}px, ${top + height}px)`}}
							onClick={this.handleSuggestionsClick}
						>
							{filterCourses(courses, inputText).map(({id, name}) => {
								const index = name.toLowerCase().indexOf(inputText);
								const before = name.slice(0, index);

								const after = name.slice(index + inputText.length);
								const emphasised = name.slice(index, index + inputText.length);

								return (
									<div key={id} class="suggestion" data-id={id}>
										<div class="suggestion-name">
											{before}
											<span class="emphasised">{emphasised}</span>
											{after}
										</div>
										<div class="suggestion-id">{id}</div>
									</div>
								);
							})}
						</div>
					)}
				</>
			);
		};

		handleLoginClick = () => {
			const username = this.inputs.username.current.value.trim();
			const password = this.inputs.password.current.value;

			this.state.loggedOutCallback({username, password});
		};

		handleSuggestionsClick = event_ => {
			const {target} = event_;
			const suggestion = target.closest('.suggestion');

			if (suggestion) {
				const {idInput, contentInput} = this.state.focusedElement;
				const {id} = suggestion.dataset;
				const inputRow = idInput.closest('.table-row');
				const table = inputRow.parentNode;
				const index = [...table.children].indexOf(inputRow);

				this.setState(
					produce(state => {
						const {activeDay, tables} = state;
						const object = tables[activeDay];

						object[index].id = id;
					}),
					() => {
						focusTarget(contentInput);
					},
				);
			}
		};

		fetchCourses = () => {
			getCourses(false, this.setState.bind(this)).then(coursesObject => {
				const courses = Object.entries(coursesObject).map(([id, fullname]) => ({
					id,
					name: fullname,
					key: uniqueId(),
				}));

				this.setState({courses});
			});
		};

		componentDidMount = () => {
			addEventListener('click', this.handleTableFocus);
			addEventListener('keydown', event_ => {
				if (event_.ctrlKey && event_.key === 's') {
					event_.preventDefault();
					event_.stopImmediatePropagation();

					this.handleSave();
				}
			});

			this.fetchCourses();
		};

		handleTableFocus = event_ => {
			const {target} = event_;

			if (target instanceof HTMLElement) {
				let idInput;
				let contentInput;
				let top;
				let left;
				let height;
				let inputText = '';

				const inputType = target.dataset.type;
				if (inputType === 'id') {
					idInput = target;
					contentInput = target.parentNode.querySelector(
						'[data-type="content"]',
					);
				} else if (inputType === 'content') {
					idInput = target.parentNode.querySelector('[data-type="id"]');
					contentInput = target;
				}

				if (idInput) {
					// <from jquery>
					const rect = idInput.getBoundingClientRect();
					const win = idInput.ownerDocument.defaultView;

					top = rect.top + win.pageYOffset;
					left = rect.left + win.pageXOffset;
					// </from jquery>

					height = idInput.clientHeight;
					inputText = contentInput.textContent.trim().toLowerCase();
				}

				this.setState({
					focusedElement: {
						top,
						left,
						height,
						inputText,
						idInput,
						contentInput,
					},
				});
			}
		};

		handleSave = () => {
			let anyInvalid = false;
			let dayInvalid;
			const days = [];

			for (let index0 = 0, l = this.state.tables.length; index0 < l; ++index0) {
				const table = this.state.tables[index0];
				const day = [];

				days.push(day);

				for (let index1 = 0, l2 = table.length; index1 < l2; ++index1) {
					const row = table[index1];
					const {parsedfrom, parsedto, content, id} = row;
					const isValidRow = testIsValidRow(row);

					if (!isValidRow && !anyInvalid) {
						anyInvalid = true;
						dayInvalid = index0;
					}

					const object = {from: parsedfrom, to: parsedto};

					if (id) {
						object.id = id;
					}

					if (content) {
						object.content = content;
					}

					day.push(object);
				}
			}

			const saveButton = this.saveButtonRef.current;

			saveButton.classList.remove('save-failed', 'save-successful');

			if (anyInvalid) {
				this.setState({
					activeDay: dayInvalid,
				});
				saveButton.classList.add('save-failed');
			} else {
				GM_setValue('days', {...days});

				saveButton.classList.add('save-successful');
			}
		};

		handleTableClick = event_ => {
			const {target} = event_;
			const iconRemoveRow = target.closest('.remove-row');

			if (iconRemoveRow) {
				const currentRow = target.closest('.table-row');
				const rowIndex = [...target.closest('.table').children].indexOf(
					currentRow,
				);

				this.setState(
					produce(state => {
						const {activeDay, tables} = state;

						tables[activeDay].splice(rowIndex, 1);
					}),
				);
			}
		};

		handleCaretClick = event_ => {
			const closestDiv = event_.target.closest('div');

			if (!closestDiv) {
				return;
			}

			const {classList} = closestDiv;

			if (classList.contains('caret-input')) {
				const type = classList.contains('caret-forward') ? 1 : -1;

				this.setState(state => {
					let activeDay = state.activeDay + type;

					if (activeDay < 0) {
						activeDay = 4;
					} else if (activeDay > 4) {
						activeDay = 0;
					}

					return {
						activeDay,
					};
				});
			}
		};

		createRow = () =>
			new Promise(resolve => {
				this.setState(
					produce(state => {
						const {tables, activeDay} = state;

						tables[activeDay].push({key: uniqueId()});
					}),
					resolve,
				);
			});

		/**
		 * @returns Promise<void> when the row is ready, now or on preact render
		 */
		conditionallyCreateRow = async nextRow => {
			if (nextRow) {
				return;
			}

			return this.createRow();
		};

		handleTableInput = event_ => {
			const {target} = event_;
			const {
				classList,
				textContent: rawText,
				dataset: targetDataset,
				parentNode: parent,
			} = target;
			const currentRow = target.closest('.table-row');

			if (!currentRow) {
				return;
			}

			const currentRowIndex = [...currentRow.parentNode.children].indexOf(
				currentRow,
			);
			const {anchorOffset} = getSelection();

			if (classList.contains('time-input')) {
				const time = rawText.trim();

				this.setState(
					produce(draftState => {
						const {activeDay, tables} = draftState;
						const object = tables[activeDay][currentRowIndex];

						object[classList.contains('time-from') ? 'from' : 'to'] = time;
						object[
							classList.contains('time-from') ? 'parsedfrom' : 'parsedto'
						] = parseStringToTime(time);

						tables[activeDay] = validateTimeOrder(tables[activeDay]);

						draftState.saved = false;
					}),
					() => {
						focusTarget(target, anchorOffset);
					},
				);
			} else if (parent.classList.contains('entry')) {
				this.handleTableFocus(event_);
				this.setState(
					produce(state => {
						const {activeDay, tables} = state;
						const object = tables[activeDay][currentRowIndex];

						if (targetDataset.type === 'id') {
							object.id = rawText;
						} else if (targetDataset.type === 'content') {
							object.content = rawText;
							target.textContent = '';
							/* This fixes an issue where preact doesn't
							properly delete a text node and which causes duplicate text */
						}
					}),
					() => {
						focusTarget(target, anchorOffset);
					},
				);
			}
		};

		handleTableKeyUp = event_ => {
			const {key} = event_;

			if (key === 'Tab') {
				this.handleTableFocus({
					target: document.activeElement,
				});
			}
		};

		handleTableKeyDown = event_ => {
			const {target, key, shiftKey} = event_;

			if (key === 'Enter') {
				event_.preventDefault();

				let elementToFocus;

				if (target.closest('.entry')) {
					const currentRow = target.closest('.table-row');

					if (shiftKey) {
						elementToFocus
							= target.dataset.type === 'content'
								? currentRow.previousElementSibling?.querySelector(
										'div.table-cell.entry > [data-type="id"]',
								  )
								: target.parentNode.querySelector('[data-type="content"]');
					} else if (target.dataset.type === 'content') {
						elementToFocus
							= target.parentNode.querySelector('[data-type="id"]');
					} else {
						elementToFocus = this.conditionallyCreateRow(
							currentRow.nextElementSibling,
						).then(() =>
							currentRow.nextElementSibling?.querySelector(
								'div.table-cell.entry > [data-type="content"]',
							),
						);
					}
				} else if (target.closest('.time')) {
					const currentRow = target.closest('.table-row');

					if (shiftKey) {
						elementToFocus = target.classList.contains('time-from')
							? currentRow.previousElementSibling?.querySelector(
									'div.table-cell.time > .time-to',
							  )
							: target.parentNode.querySelector('.time-from');
					} else if (target.classList.contains('time-from')) {
						elementToFocus = target.parentNode.querySelector('.time-to');
					} else {
						elementToFocus = this.conditionallyCreateRow(
							currentRow.nextElementSibling,
						).then(() =>
							currentRow.nextElementSibling?.querySelector(
								'div.table-cell.time > .time-from',
							),
						);
					}
				}

				Promise.resolve(elementToFocus).then(elementToFocus_ => {
					focusTarget(elementToFocus_);

					this.handleTableFocus({
						target: elementToFocus_,
					});
				});
			}
		};
	};
})();

const initSettingsPage = () => {
	history.replaceState({}, '', '/timetable/v5');
	const {body, head} = document;
	while (head.lastChild) {
		head.lastChild.remove();
	}

	while (body.lastChild) {
		body.lastChild.remove();
	}

	document.title = title;

	const icon = document.createElement('link');

	icon.rel = 'shortcut icon';
	icon.href = moodleIcon();

	GM_addStyle(settingsPageStyle);

	head.append(icon);

	const root = document.createElement('div');

	root.id = 'root';
	body.append(root);

	render(<SettingsPage/>, root);
};

export {initSettingsPage};
