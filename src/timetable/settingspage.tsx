// Dependencies
import {produce} from 'immer';
import {Component, render, type JSX, type RefObject} from 'preact';
// Shared across repo

import {uniqueId} from '../shared/general-functions/index.js';
import {
	getCourses,
	Moodle,
	type Courses,
} from '../shared/moodle-functions-v3/index.js';
// Locally shared

import ButtonGrid from './components/button-grid.js';
import LoggedOut from './components/logged-out.js';
import SuggestionsPopup from './components/suggestions-popup.js';
import Table from './components/table.js';
import {SvgIconAdd} from './icons.js';
import {parseStringToTime, parseTimeToString} from './shared.js';

// Types
import type {
	SettingsPageState,
	SingleDay,
	TableOnInputSelectors,
	TableRow,
} from './settingspage.d.js';

// Style
import settingsPageStyle from './settingspage.scss';

Moodle.extend(getCourses);
// =============

const getDayOfWeek = () => {
	const day = (new Date().getDay() + 6) % 7; // Monday is 0, Sunday is 6

	return day > 4 ? 0 : day;
};

const emptyRow = (): TableRow => ({
	key: uniqueId(),
	from: {
		num: 0,
		str: parseTimeToString(0),
	},
	to: {
		num: 0,
		str: parseTimeToString(0),
	},
	content: '',
	id: '',
});

const defaultRows = (): TableRow[] =>
	[
		{from: 480, to: 525},
		{from: 525, to: 570},
		{from: 590, to: 635},
		{from: 640, to: 685},
		{from: 690, to: 735},
		{from: 735, to: 790},
		{from: 790, to: 835},
		{from: 835, to: 880},
		{from: 890, to: 935},
		{from: 935, to: 975},
	].map(({from, to}) => ({
		...emptyRow(),
		from: {
			num: from,
			str: parseTimeToString(from),
		},
		to: {
			num: to,
			str: parseTimeToString(to),
		},
	}));

const getTables = (): SettingsPageState['tables'] => {
	const array: TableRow[][] = [];
	const days = GM_getValue<Record<number, SingleDay> | undefined>('days');

	for (let index = 0; index < 5; ++index) {
		const storedValue = days?.[index];

		if (storedValue) {
			array[index] = storedValue.map(({from, to, content, id}) => ({
				key: uniqueId(),
				from: {
					str: parseTimeToString(from),
					num: from,
				},
				to: {
					str: parseTimeToString(to),
					num: to,
				},
				id: id ?? '',
				content: content ?? '',
			}));
		} else {
			array[index] = defaultRows();
		}
	}

	// At this point it has length 5
	return array as unknown as SettingsPageState['tables'];
};

class SettingsPage extends Component<
	Record<string, unknown>,
	SettingsPageState
> {
	override state: SettingsPageState = {
		day: getDayOfWeek(),
		loggedOut: false,
		courses: [],
		focusedElement: undefined,
		tables: getTables(),
		saveValidity: undefined,
	};

	moodle = new Moodle();

	render() {
		const {
			tryLogin: loggedOutCallback,
			handleButtonNavigate,
			handleSave,
			deleteRow,
			handleTableInput,
			createRow,
			handleSuggestionsClick,
			resetSaveValidity,
			handleTableFocus,
		} = this;
		const {loggedOut, focusedElement, courses, day, tables, saveValidity}
			= this.state;

		return (
			<>
				<LoggedOut loggedOut={loggedOut} cb={loggedOutCallback} />
				<div class='container'>
					<div class='table-center'>
						<div class='grid-buttons'>
							<ButtonGrid
								day={day}
								handleSave={handleSave}
								handleClick={handleButtonNavigate}
								saveButtonClass={{
									'save-successful': saveValidity === true,
									'save-failed': saveValidity === false,
								}}
								resetSaveValidity={resetSaveValidity}
							/>
						</div>
						<div class='main-table'>
							<Table
								rows={tables[day]}
								deleteRow={deleteRow}
								handleFocus={handleTableFocus}
								onInput={handleTableInput}
							/>
							<div class='row-icon-add-row'>
								<div class='icon-add-row'>
									<SvgIconAdd onClick={createRow} />
								</div>
							</div>
						</div>
					</div>
				</div>
				<SuggestionsPopup
					focusedElement={focusedElement}
					courses={courses}
					onClick={handleSuggestionsClick}
				/>
			</>
		);
	}

	resetSaveValidity = () => {
		this.setState({
			saveValidity: undefined,
		});
	};

	validateOrder = (): true | number => {
		let allValid = true;

		this.setState(
			produce((state: SettingsPageState) => {
				const setInvalid = (day: number) => {
					if (allValid) {
						allValid = false;

						state.day = day;
					}
				};

				for (const [day, table] of state.tables.entries()) {
					for (const row of table) {
						delete row.fromInvalid;
						delete row.toInvalid;
					}

					for (const [i, currentRow] of table.entries()) {
						const nextRow = table[i + 1];
						const {from, to} = currentRow;

						if (parseStringToTime(from.str) === false) {
							currentRow.fromInvalid = true;
							setInvalid(day);
						}

						if (parseStringToTime(to.str) === false) {
							currentRow.toInvalid = true;
							setInvalid(day);
						}

						if (from.num >= to.num) {
							currentRow.fromInvalid = true;
							currentRow.toInvalid = true;

							setInvalid(day);
						}

						if (nextRow && nextRow.from.num < to.num) {
							currentRow.toInvalid = true;
							nextRow.fromInvalid = true;

							setInvalid(day);
						}
					}
				}
			}),
		);

		return allValid;
	};

	handleSave = () => {
		const allValid = this.validateOrder();

		if (!allValid) {
			this.setState({
				saveValidity: false,
			});

			return;
		}

		this.setState({
			saveValidity: true,
		});

		const rows: SingleDay[] = [];

		for (const table of this.state.tables) {
			const row: SingleDay = [];
			rows.push(row);

			for (const {from, to, content, id} of table) {
				row.push({
					from: from.num,
					to: to.num,
					content: content || undefined,
					id: id || undefined, // If empty string there is no id (and it tests for undefined to determine that)
				});
			}
		}

		GM_setValue('days', {...rows});
	};

	handleTableFocus
		= (
			idRef?: RefObject<HTMLInputElement>,
			contentRef?: RefObject<HTMLInputElement>,
			index?: number,
		) =>
		(event_: JSX.TargetedFocusEvent<HTMLElement>) => {
			const idInput = idRef?.current;
			const contentInput = contentRef?.current;

			if (!contentInput || !idInput || index === undefined) {
				this.setState({
					focusedElement: undefined,
				});

				return;
			}

			event_.stopImmediatePropagation();

			const rect = idInput.getBoundingClientRect();
			const win = idInput.ownerDocument.defaultView;

			if (!win) {
				this.setState({
					focusedElement: undefined,
				});

				return;
			}

			const top = rect.top + win.pageYOffset;
			const left = rect.left + win.pageXOffset;
			const height = idInput.clientHeight;
			const inputText = contentInput.value.trim();

			this.setState({
				focusedElement: {
					top,
					left,
					height,
					inputText,
					index,
				},
			});
		};

	handleSuggestionsClick = (id: string) => {
		this.setState(
			produce((state: SettingsPageState) => {
				if (!state.focusedElement) {
					return;
				}

				const table = state.tables[state.day];
				const row = table?.[state.focusedElement.index];

				if (!row) {
					return;
				}

				row.id = id;
				state.focusedElement = undefined;
			}),
		);
	};

	deleteRow = (index: number) => {
		this.setState(
			produce((state: SettingsPageState) => {
				const table = state.tables[state.day];

				table?.splice(index, 1);
			}),
		);
	};

	override componentDidMount() {
		document.body.addEventListener('focusout', () => {
			this.setState({
				focusedElement: undefined,
			});
		});

		document.body.addEventListener('keydown', event_ => {
			if (event_.key === 's' && event_.ctrlKey) {
				event_.preventDefault();
				this.handleSave();
			}
		});

		this.tryLogin();
	}

	handleTableInput
		= (
			selector: TableOnInputSelectors,
			index: number,
		): JSX.GenericEventHandler<HTMLInputElement> =>
		event_ => {
			this.setState(
				produce((state: SettingsPageState) => {
					const row = state.tables[state.day]?.[index];

					if (!row) {
						return;
					}

					const value = event_.currentTarget.value;

					const parsedTime = parseStringToTime(value);

					switch (selector) {
						case 'from': {
							delete row.fromInvalid;

							row.from.str = value;
							if (parsedTime === false) {
								row.fromInvalid = true;
							} else {
								row.from.num = parsedTime;
							}

							break;
						}

						case 'to': {
							delete row.toInvalid;

							row.to.str = value;
							if (parsedTime === false) {
								row.toInvalid = true;
							} else {
								row.to.num = parsedTime;
							}

							break;
						}

						case 'content': {
							row.content = value;

							if (state.focusedElement) {
								state.focusedElement.inputText = value;
							}

							break;
						}

						case 'id': {
							row.id = value;

							break;
						}

						default: // No default
					}
				}),
			);

			this.validateOrder();
		};

	createRow = () => {
		this.setState(
			produce((state: SettingsPageState) => {
				const table = state.tables[state.day];

				table?.push(emptyRow());
			}),
		);
	};

	onLogin = async () => {
		await this.fetchCourses();
	};

	logout = () => {
		this.moodle.logout();

		this.setState({
			loggedOut: true,
		});
	};

	tryLogin = (creds?: {username: string; password: string}) => {
		this.setState({
			loggedOut: false,
		});

		this.moodle.login(creds).then(this.onLogin, this.logout);
	};

	fetchCourses = async () => {
		let courses: Courses;

		try {
			courses = await this.moodle.getCourses();
		} catch {
			this.logout();

			return;
		}

		const coursesWithKey = courses.map(({id, name}) => ({
			id: String(id),
			name,
			key: uniqueId(),
		}));

		this.setState({courses: coursesWithKey});
	};

	handleButtonNavigate = (n: number) => {
		this.setState({
			day: n,
		});
	};
}

const initSettingsPage = () => {
	history.replaceState({}, '', '/timetable');

	const {body, head} = document;
	while (head.lastChild) {
		head.lastChild.remove();
	}

	while (body.lastChild) {
		body.lastChild.remove();
	}

	document.title = 'Moodle timetable';

	const icon = document.createElement('link');
	icon.rel = 'shortcut icon';
	icon.href = '/theme/image.php/classic/theme/1620639422/favicon';
	head.append(icon);

	GM_addStyle(settingsPageStyle);

	const root = document.createElement('div');

	root.id = 'root';
	body.append(root);

	render(<SettingsPage />, root);
};

export {initSettingsPage};
