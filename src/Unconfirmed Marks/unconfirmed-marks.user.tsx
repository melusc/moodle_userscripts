// ==UserScript==
// @name      Unconfirmed Marks Preact
// @version   2021.07.12a
// @author    lusc
// @include   *://moodle.ksasz.ch/
// @include   *://moodle.ksasz.ch/?*
// @updateURL https://git.io/JqltZ
// @grant     GM_xmlhttpRequest
// @grant     GM_setValue
// @grant     GM_getValue
// @grant     GM_addStyle
// @grant     GM_deleteValue
// @grant     GM_addValueChangeListener
// @run-at    document-start
// @connect   www.schul-netz.com
// ==/UserScript==

import {render, Component, h, createRef} from 'preact';
import {uniqueId} from '../shared/general-functions';
import style from './style.scss';

if (location.protocol !== 'https:') {
	location.protocol = 'https:';
}

const SvgCircleNotch = () => (
	<svg
		aria-hidden="true"
		class="ucmr-circle-notch ucmr-spin"
		viewBox="0 0 512 512"
	>
		<path
			fill="currentColor"
			d="M288 39.056v16.659c0 10.804 7.281 20.159 17.686 23.066C383.204 100.434 440 171.518 440 256c0 101.689-82.295 184-184 184-101.689 0-184-82.295-184-184 0-84.47 56.786-155.564 134.312-177.219C216.719 75.874 224 66.517 224 55.712V39.064c0-15.709-14.834-27.153-30.046-23.234C86.603 43.482 7.394 141.206 8.003 257.332c.72 137.052 111.477 246.956 248.531 246.667C393.255 503.711 504 392.788 504 256c0-115.633-79.14-212.779-186.211-240.236C302.678 11.889 288 23.456 288 39.056z"
		/>
	</svg>
);

const enum States {
	loading,
	error,
	marks,
	noMarks,
	loggedOut,
}

type MarksRow = {
	key: string;
	course: string;
	name: string;
	date: string;
	mark: string;
};

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
	state: SchulNetzMarksState = {
		marks: [],
		state: States.loading,
		errorMsg: undefined,
		bottomHR:
			GM_getValue<boolean | undefined>('bottomHR')
			?? (() => {
				GM_setValue('bottomHR', false);

				return false;
			})(),
	};

	inputs = {
		login: createRef<HTMLInputElement>(),
		password: createRef<HTMLInputElement>(),
		page: createRef<HTMLInputElement>(),
	};

	render = () => {
		const {marks, state, errorMsg, bottomHR} = this.state;

		return (
			<div class="mod-indent-outer">
				<div class="contentwithoutlink">
					<div class="ucmr-title">Unconfirmed Marks</div>

					{state === States.loading && <SvgCircleNotch />}

					{state === States.marks && (
						<div>
							{marks.map(({key, course, name, date, mark}) => (
								<div key={key} class="ucmr-row">
									<div class="ucmr-course">{course}</div>
									<div class="ucmr-name">{name}</div>
									<div class="ucmr-date">{date}</div>
									<div class="ucmr-mark">{mark}</div>
								</div>
							))}
						</div>
					)}

					{state === States.noMarks && (
						<div>Sie haben alle Noten bestätigt.</div>
					)}

					{state === States.loggedOut && (
						<div class="login">
							<input
								ref={this.inputs.login}
								required
								class="form-control"
								placeholder="Username"
								type="text"
								value={GM_getValue<string | undefined>('login')}
								onKeyDown={this.onLoggedOutKeydown}
							/>
							<input
								ref={this.inputs.password}
								required
								class="form-control"
								placeholder="Password"
								type="password"
								value={GM_getValue<string | undefined>('password')}
								onKeyDown={this.onLoggedOutKeydown}
							/>
							<input
								ref={this.inputs.page}
								required
								class="form-control"
								placeholder="Page (ausserschwyz, einsiedeln...)"
								type="text"
								value={GM_getValue<string | undefined>('page')}
								onKeyDown={this.onLoggedOutKeydown}
							/>
							<button
								class="btn btn-primary"
								type="button"
								onClick={this.handleLogin}
							>
								Save
							</button>
						</div>
					)}

					{state === States.error && (
						<div class="ucmr-error">{errorMsg ?? 'Something went wrong'}</div>
					)}

					{bottomHR && <hr />}
				</div>
			</div>
		);
	};

	onLoggedOutKeydown: h.JSX.KeyboardEventHandler<HTMLInputElement> = event_ => {
		if (event_.key === 'Enter') {
			this.handleLogin();
		}
	};

	handleLogin = () => {
		const login = this.inputs.login.current?.value;
		const password = this.inputs.password.current?.value;
		const page = this.inputs.page.current?.value;

		if (login && password && page) {
			GM_setValue('login', login);
			GM_setValue('password', password);
			GM_setValue('page', page);
			this.setState({
				state: States.loading,
			});

			void this.getMarks({
				login,
				password,
				page,
			});
		}
	};

	checkCredentials = () => {
		const login = GM_getValue<string | undefined>('login');
		const password = GM_getValue<string | undefined>('password');
		const page = GM_getValue<string | undefined>('page');

		if (login && password && page) {
			void this.getMarks({
				login,
				password,
				page,
			});
		} else {
			this.setState({
				state: States.loggedOut,
			});
		}
	};

	componentDidMount = () => {
		this.checkCredentials();

		GM_addValueChangeListener('bottomHR', () => {
			const bottomHR = GM_getValue<unknown>('bottomHR');

			if (typeof bottomHR === 'boolean') {
				this.setState({
					bottomHR,
				});
			} else {
				// This below will call this very function and update state there
				GM_setValue('bottomHR', false);
			}
		});
	};

	logout = (credentialsToRemove: Array<'login' | 'password' | 'page'> = []) => {
		for (const value of credentialsToRemove) {
			GM_deleteValue(value);
		}

		this.setState({
			state: States.loggedOut,
		});
	};

	getMarks = async ({
		login,
		password,
		page,
	}: {
		login: string;
		password: string;
		page: string;
	}) => {
		let loginPageResponse: Tampermonkey.Response<string>;
		try {
			loginPageResponse = await new Promise<Tampermonkey.Response<string>>(
				(resolve, reject) => {
					GM_xmlhttpRequest<string>({
						method: 'GET',
						url: `https://www.schul-netz.com/${page}/loginto.php`,
						onload: resolve,
						timeout: 10_000,
						onerror: reject,
						onabort: reject,
						ontimeout: reject,
					});
				},
			);
		} catch (error: unknown) {
			console.error(error);

			this.setState({
				state: States.error,
				errorMsg: `An error occurred fetching "/${page}/loginto.php"`,
			});

			return;
		}

		if (loginPageResponse.status === 404) {
			this.logout(['page']);

			return;
		}

		if (loginPageResponse.status !== 200) {
			this.setState({
				state: States.error,
				errorMsg: `An error occurred fetching "/${page}/loginto.php": "${loginPageResponse.statusText}"`,
			});

			return;
		}

		const parsedLoginPage = new DOMParser().parseFromString(
			loginPageResponse.responseText,
			'text/html',
		);

		const loginHashElement = parsedLoginPage.querySelector<HTMLInputElement>(
			'input[name="loginhash"]',
		);

		if (!loginHashElement) {
			this.setState({
				state: States.error,
				errorMsg: 'Could not get loginhash.',
			});

			return;
		}

		const loginRequestBody = new URLSearchParams({
			loginhash: loginHashElement.value,
			login,
			passwort: password,
		});

		let frontPageResponse: Tampermonkey.Response<string>;
		try {
			frontPageResponse = await new Promise<Tampermonkey.Response<string>>(
				(resolve, reject) => {
					GM_xmlhttpRequest<string>({
						method: 'POST',
						url: `https://www.schul-netz.com/${page}/index.php?pageid=`,
						data: loginRequestBody.toString(),
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded',
						},
						timeout: 10_000,
						onload: resolve,
						onerror: reject,
						onabort: reject,
						ontimeout: reject,
					});
				},
			);
		} catch (error: unknown) {
			console.error(error);

			/* If the creds are incorrect it won't throw
				 That scenario is handled below */
			this.setState({
				state: States.error,
				errorMsg: 'An error occurred trying to log in.',
			});
			return;
		}

		if (/loginto\.php/i.test(frontPageResponse.finalUrl)) {
			this.logout(['password']);

			return;
		}

		const parsedFrontPage = new DOMParser().parseFromString(
			frontPageResponse.responseText,
			'text/html',
		);

		const table = parsedFrontPage.evaluate(
			'.//h3' // Find all h3
				+ '[contains(@class, "tabletitle")]' // That have the className "tabletitle"
				+ '[text() = "Ihre letzten Noten"]' // That have the text "Ihre letzten Noten"
				+ '/..' // Go to parent
				+ '/following-sibling::table', // And find all siblings of parent that are a table
			parsedFrontPage.body,
			null,
			XPathResult.FIRST_ORDERED_NODE_TYPE,
			null,
		).singleNodeValue as HTMLTableElement | null;

		if (table === null) {
			this.setState({
				state: States.error,
				errorMsg: 'Could not find table with marks.',
			});

			return;
		}

		const {rows} = table;
		const marks: MarksRow[] = [];
		let allConfirmed = false;

		for (const row of rows) {
			const [course, name, date, mark] = [...row.children].map(child =>
				child.textContent?.trim(),
			);

			if (/sie haben alle noten bestätigt./i.test(course ?? '')) {
				this.setState({state: States.noMarks});
				allConfirmed = true;
				break;
			}

			if (course && name && date && mark) {
				marks.push({
					course,
					name,
					date,
					mark,
					key: uniqueId(),
				});
			}
		}

		if (!allConfirmed) {
			this.setState({
				marks,
				state: States.marks,
			});
		}

		const anchor = parsedFrontPage.evaluate(
			'//a' // Find all anchors
				+ '[contains(@class, "mdl-menu__item")]' // That have class "mdl-menu__item"
				+ '[contains(text(), "Abmelden")]', // That have text "Abmelden"
			parsedFrontPage.body,
			null,
			XPathResult.FIRST_ORDERED_NODE_TYPE,
			null,
		).singleNodeValue as HTMLAnchorElement | null;

		const logoutPath = anchor?.getAttribute('href');

		if (logoutPath) {
			GM_xmlhttpRequest({
				method: 'GET',
				url: `https://www.schul-netz.com/${page}/${logoutPath}`,
			});
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

if (document.readyState === 'complete') {
	init();
} else {
	addEventListener('DOMContentLoaded', init, {once: true});
}
