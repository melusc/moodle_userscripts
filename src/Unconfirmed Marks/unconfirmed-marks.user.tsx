// ==UserScript==
// @name      Unconfirmed Marks Preact
// @version   2021.11.07b
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
// @grant     GM_registerMenuCommand
// @run-at    document-start
// @connect   www.schul-netz.com
// ==/UserScript==

import {render, Component, h, createRef} from 'preact';
import style from './style.scss';
import {getMarks, MarksRow} from './get-marks';

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
						<form class="login-form" onSubmit={this.handleLogin}>
							<input
								ref={this.inputs.username}
								required
								class="form-control"
								placeholder="Username"
								type="text"
								value={GM_getValue<string | undefined>('username')}
							/>
							<input
								ref={this.inputs.password}
								required
								class="form-control"
								placeholder="Password"
								type="password"
								value={GM_getValue<string | undefined>('password')}
							/>
							<input
								ref={this.inputs.page}
								required
								class="form-control"
								placeholder="Page (ausserschwyz, einsiedeln...)"
								type="text"
								value={GM_getValue<string | undefined>('page')}
							/>
							<button class="btn btn-primary" type="submit">
								Save
							</button>
						</form>
					)}

					{state === States.error && (
						<div class="ucmr-error">{errorMsg ?? 'Something went wrong'}</div>
					)}

					{bottomHR && <hr />}
				</div>
			</div>
		);
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

	loginFromStorage = () => {
		const username = GM_getValue<string | undefined>('username');
		const password = GM_getValue<string | undefined>('password');
		const page = GM_getValue<string | undefined>('page');

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

	override componentDidMount = () => {
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
	};

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
		const marksResult = await getMarks({
			username,
			password,
			page,
		});

		if (marksResult.error) {
			if (marksResult.shouldLogOut) {
				this.logout(marksResult.credentialsToRemove);
				return;
			}

			this.setState({
				state: States.error,
				errorMsg: marksResult.errorMsg,
			});

			return;
		}

		if (marksResult.marks === null) {
			this.setState({
				state: States.noMarks,
			});

			return;
		}

		this.setState({
			marks: marksResult.marks,
			state: States.marks,
		});
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
