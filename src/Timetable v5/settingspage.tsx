// Dependencies
import {h, Component, render, Fragment, JSX, RefObject} from 'preact';
import {produce} from 'immer';
import clsx from 'clsx';

// Shared across repo
import {uniqueId} from '../shared/general-functions';
import {
	getCourses_throwable,
	getCredentials,
	getToken,
	login_throwable,
	logout,
} from '../shared/moodle-functions-v2';

// Locally shared
import {SvgIconAdd} from './icons';
import {parseStringToTime, parseTimeToString} from './shared';
import Table from './components/table';
import SuggestionsPopup from './components/suggestions-popup';
import LoggedOut from './components/logged-out';
import ButtonGrid from './components/button-grid';

// Types
import {
	SingleDay,
	TableRow,
	SettingsPageState,
	TableOnInputSelectors,
} from './settingspage.d';

// Style
import settingsPageStyle from './settingspage.scss';

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

	callbacksAfterLogin = new Set<(token: string) => void>();

	constructor(...args: Array<Record<string, unknown>>) {
		super(...args);

		this.callbacksAfterLogin.add(this.fetchCourses);
	}

	render = () => {
		const {
			loggedOutCallback,
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
				<div class="container">
					<div class="table-center">
						<div class="grid-buttons">
							<ButtonGrid
								day={day}
								handleSave={handleSave}
								handleClick={handleButtonNavigate}
								saveButtonClass={clsx({
									'save-successful': saveValidity === true,
									'save-failed': saveValidity === false,
								})}
								resetSaveValidity={resetSaveValidity}
							/>
						</div>
						<div class="main-table">
							<Table
								rows={tables[day]}
								deleteRow={deleteRow}
								handleFocus={handleTableFocus}
								onInput={handleTableInput}
							/>
							<div class="row-icon-add-row">
								<div class="icon-add-row">
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
	};

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

	override componentDidMount = async () => {
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

		const token = await getToken();

		if (token) {
			this.callbackAfterLoginHandler(token);

			return;
		}

		const creds = await getCredentials();

		if (creds) {
			try {
				const token = await login_throwable(creds);
				this.callbackAfterLoginHandler(token);

				return;
			} catch {}
		}

		await this.logout(true);
	};

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

	logout = async (removeCreds?: boolean, cb?: (token: string) => void) => {
		await logout(removeCreds);

		if (cb) {
			this.callbacksAfterLogin.add(cb);
		}

		this.setState({
			loggedOut: true,
		});
	};

	callbackAfterLoginHandler = (token: string) => {
		for (const cb of this.callbacksAfterLogin) {
			cb(token);

			this.callbacksAfterLogin.delete(cb);
		}
	};

	loggedOutCallback = async (creds: {username: string; password: string}) => {
		try {
			const token = await login_throwable(creds);

			this.setState({
				loggedOut: false,
			});
			this.callbackAfterLoginHandler(token);
		} catch {
			await this.logout(true);
		}
	};

	fetchCourses = async (token: string) => {
		let coursesObject: Record<string, string>;

		try {
			coursesObject = await getCourses_throwable(token);
		} catch {
			await this.logout(false, this.fetchCourses);

			return;
		}

		const courses = Object.entries(coursesObject).map(([id, fullname]) => ({
			id,
			name: fullname,
			key: uniqueId(),
		}));

		this.setState({courses});
	};

	handleButtonNavigate = (n: number) => {
		this.setState({
			day: n,
		});
	};
}

const initSettingsPage = () => {
	history.replaceState({}, '', '/timetable/v5');

	const {body, head} = document;
	while (head.lastChild) {
		head.lastChild.remove();
	}

	while (body.lastChild) {
		body.lastChild.remove();
	}

	document.title = 'Moodle timetable v5';

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
