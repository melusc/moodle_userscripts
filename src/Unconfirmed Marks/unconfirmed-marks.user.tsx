// ==UserScript==
// @name      Unconfirmed Marks Preact
// @version   1.3.0
// @author    lusc
// @include   *://moodle.ksasz.ch/
// @include   *://moodle.ksasz.ch/?*
// @updateURL https://git.io/JXzhC
// @grant     GM_xmlhttpRequest
// @grant     GM_setValue
// @grant     GM_getValue
// @grant     GM_addStyle
// @grant     GM_deleteValue
// @grant     GM_addValueChangeListener
// @grant     GM_registerMenuCommand
// @run-at    document-start
// @connect   www.schul-netz.com
// ==/UserScript==

import {render, Component, h, createRef} from 'preact';

import {domReady} from '../shared/general-functions/index.js';

import style from './style.scss';
import {getMarks, MarksRow} from './get-marks.js';

if (location.protocol !== 'https:') {
	location.protocol = 'https:';
}

const expectNever = /* #__PURE__ */ (_input: never): void => {
	/* Compile-time check only, nothing here */
};

const enum States {
	loading,
	error,
	marks,
	noMarks,
	loggedOut,
	offline,
}

type SchulNetzMarksState = {
	marks: MarksRow[];
	errorMsg?: string;
	bottomHR: boolean;
	state: States;
};

class SchulNetzMarks extends Component<
	Record<string, unknown>,
	SchulNetzMarksState
> {
	override state: SchulNetzMarksState = {
		marks: [],
		state: States.loading,
		errorMsg: undefined,
		bottomHR: Boolean(GM_getValue<boolean>('bottomHR')),
	};

	inputs = {
		username: createRef<HTMLInputElement>(),
		password: createRef<HTMLInputElement>(),
		page: createRef<HTMLInputElement>(),
	};

	timeout: {
		set: (duration: number) => void;
		clear: () => void;
		timeoutId?: number | undefined;
	} = {
		set: (duration: number) => {
			this.timeout.clear();

			// Explicitely tell TypeScript setTimeout returns number
			this.timeout.timeoutId = window.setTimeout(
				this.loginFromStorage,
				duration,
			);
		},
		clear: () => {
			const {timeoutId} = this.timeout;

			if (timeoutId !== undefined) {
				// Explicitely tell TypeScript clearTimeout expects number
				window.clearTimeout(timeoutId);
				delete this.timeout.timeoutId;
			}
		},
	};

	render() {
		const {marks, state, errorMsg, bottomHR} = this.state;

		return (
			<div class='mod-indent-outer w-100'>
				<div class='contentwithoutlink'>
					<div class='ucmr-title'>
						Unconfirmed Marks
						{(state === States.marks
							|| state === States.noMarks
							|| state === States.error) && (
							<i
								role='button'
								class='icon fa fa-refresh fa-fw ml-1'
								onClick={this.refresh}
							/>
						)}
					</div>

					{state === States.loading && (
						<i class='icon fa fa-circle-o-notch fa-fw fa-spin' />
					)}

					{state === States.marks && (
						<div>
							{marks.map(({key, course, name, date, mark}) => (
								<div key={key} class='ucmr-row'>
									<div class='ucmr-course'>{course}</div>
									<div class='ucmr-name'>{name}</div>
									<div class='ucmr-date'>{date}</div>
									<div class='ucmr-mark'>{mark}</div>
								</div>
							))}
						</div>
					)}

					{state === States.noMarks && (
						<div>Sie haben alle Noten bestätigt.</div>
					)}

					{state === States.offline && <div>Offline</div>}

					{state === States.loggedOut && (
						<form class='login-form' onSubmit={this.handleLogin}>
							<input
								ref={this.inputs.username}
								required
								class='form-control'
								placeholder='Username'
								type='text'
								value={GM_getValue<string | undefined>('username')}
							/>
							<input
								ref={this.inputs.password}
								required
								class='form-control'
								placeholder='Password'
								type='password'
								value={GM_getValue<string | undefined>('password')}
							/>
							<input
								ref={this.inputs.page}
								required
								class='form-control'
								placeholder='Page (ausserschwyz, einsiedeln...)'
								type='text'
								value={GM_getValue<string | undefined>('page')}
							/>
							<button class='btn btn-primary' type='submit'>
								Save
							</button>
						</form>
					)}

					{state === States.error && (
						<div class='ucmr-error'>{errorMsg ?? 'Something went wrong'}</div>
					)}

					{bottomHR && <hr />}
				</div>
			</div>
		);
	}

	refresh: h.JSX.MouseEventHandler<HTMLElement> = event_ => {
		event_.preventDefault();
		this.loginFromStorage();
	};

	handleLogin: h.JSX.GenericEventHandler<HTMLElement> = event_ => {
		event_.preventDefault();

		const username = this.inputs.username.current?.value;
		const password = this.inputs.password.current?.value;
		const page = this.inputs.page.current?.value;

		if (username && password && page) {
			GM_setValue('username', username);
			GM_setValue('password', password);
			GM_setValue('page', page);
			this.setState({
				state: States.loading,
			});

			void this.getMarks({
				username,
				password,
				page,
			});
		}
	};

	reset = () => {
		this.setState({
			state: States.loading,
			errorMsg: undefined,
			marks: [],
		});
	};

	loginFromStorage = () => {
		this.timeout.clear();

		const username = GM_getValue<string | undefined>('username');
		const password = GM_getValue<string | undefined>('password');
		const page = GM_getValue<string | undefined>('page');

		this.reset();

		if (username && password && page) {
			void this.getMarks({
				username,
				password,
				page,
			});
		} else {
			this.setState({
				state: States.loggedOut,
			});
		}
	};

	override componentDidMount() {
		this.loginFromStorage();

		GM_addValueChangeListener(
			'bottomHR',
			(_name, _oldValue, newValue: boolean) => {
				this.setState({
					bottomHR: Boolean(newValue),
				});
			},
		);

		GM_registerMenuCommand('Toggle divider', () => {
			GM_setValue('bottomHR', !GM_getValue('bottomHR'));
		});
	}

	logout = (
		credentialsToRemove: Array<'username' | 'password' | 'page'> = [],
	) => {
		for (const value of credentialsToRemove) {
			GM_deleteValue(value);
		}

		this.setState({
			state: States.loggedOut,
		});
	};

	getMarks = async ({
		username,
		password,
		page,
	}: {
		username: string;
		password: string;
		page: string;
	}) => {
		this.timeout.clear();

		const marksResult = await getMarks({
			username,
			password,
			page,
		});

		switch (marksResult.type) {
			case 'error': {
				// Update every 30 minutes
				// Only if network error or similar
				this.timeout.set(30 * 60 * 1000);

				this.setState({
					state: States.error,
					errorMsg: marksResult.errorMsg,
				});
				break;
			}

			case 'loggedout': {
				this.logout(marksResult.credentialsToRemove);
				break;
			}

			case 'success': {
				// Update every 30 minutes
				this.timeout.set(30 * 60 * 1000);

				if (marksResult.marks === undefined) {
					this.setState({
						state: States.noMarks,
					});

					return;
				}

				this.setState({
					marks: marksResult.marks,
					state: States.marks,
				});
				break;
			}

			case 'offline': {
				this.setState({
					state: States.offline,
				});

				addEventListener(
					'online',
					() => {
						this.loginFromStorage();
					},
					{once: true},
				);

				break;
			}

			default: {
				expectNever(marksResult);
				// Nothing
			}
		}
	};
}

const init = () => {
	const main = document.querySelector<HTMLUListElement>(
		'#region-main ul.section',
	);
	if (!main) {
		return;
	}

	const li = document.createElement('li');

	li.id = 'module-marks';
	li.className = 'activity label modtype_label';

	const timetablev5 = document.querySelector('#module-timetable-v5');

	if (timetablev5) {
		timetablev5.after(li);
	} else {
		main.prepend(li);
	}

	render(<SchulNetzMarks />, li);

	GM_addStyle(style);
};

domReady(init);
