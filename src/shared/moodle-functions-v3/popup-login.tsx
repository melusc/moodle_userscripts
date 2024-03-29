import {render, type FunctionalComponent, type JSX} from 'preact';
// eslint-disable-next-line n/file-extension-in-import
import {useRef, useState} from 'preact/hooks';

import {getUsername} from './credentials.js';
import {memoise} from './memoise.js';
import type {Moodle, RegisterFunction} from './moodle.js';
import genericPopupSCSS from './popup-login.scss';

const GenericPopup: FunctionalComponent<{
	cb: (token: string) => void;
	title: string;
	moodle: Moodle;
}> = ({cb, title, moodle}) => {
	const usernameRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);

	const [isLoggedOut, setLoggedOut] = useState(true);
	const [validities, setValidities] = useState({
		username: true,
		password: true,
	});

	const handleLogin: JSX.GenericEventHandler<HTMLFormElement> = async event => {
		event.preventDefault();
		event.stopImmediatePropagation();

		const username = usernameRef.current?.value.trim();
		const password = passwordRef.current?.value;

		setValidities({
			password: Boolean(password),
			username: Boolean(username),
		});

		if (username && password) {
			setLoggedOut(false);

			try {
				const token = await moodle.login({username, password});

				cb(token);
			} catch {
				setLoggedOut(true);
			}
		}
	};

	return isLoggedOut ? (
		<div class='vertical-horizontal-center'>
			<form onSubmit={handleLogin}>
				<div class='card shadow'>
					<div class='card-body'>
						<h5 class='card-title'>Login - {title}</h5>
						<div class='mb-3'>
							<label htmlFor='popup-username' class='form-label'>
								Username
							</label>
							<input
								ref={usernameRef}
								required
								defaultValue={getUsername()}
								id='popup-username'
								placeholder='Username'
								class={`form-control${
									validities.username ? '' : ' is-invalid'
								}`}
								onInput={() => {
									setValidities(validities => ({
										...validities,
										username: true,
									}));
								}}
							/>
						</div>

						<div class='mb-3'>
							<label htmlFor='popup-password' class='form-label'>
								Password
							</label>
							<input
								ref={passwordRef}
								required
								id='popup-password'
								placeholder='Password'
								class={`form-control${
									validities.password ? '' : ' is-invalid'
								}`}
								type='password'
								onInput={() => {
									setValidities(validities => ({
										...validities,
										password: true,
									}));
								}}
							/>
						</div>
					</div>
					<button class='btn btn-primary' type='submit'>
						Login
					</button>
				</div>
			</form>
		</div>
	) : null;
};

const popupLogin = async function (
	this: Moodle,
	title: string,
): Promise<string> {
	return new Promise<string>(resolve => {
		const style = GM_addStyle(genericPopupSCSS);

		const callback = (token: string) => {
			render(null, div);
			style.remove();
			div.remove();

			resolve(token);
		};

		const div = document.createElement('div');
		div.className = 'login-popup-userscript';

		document.body.append(div);

		render(<GenericPopup cb={callback} title={title} moodle={this} />, div);
	});
};

const register: RegisterFunction = Moodle => {
	Moodle.prototype.popupLogin = memoise(popupLogin);
};

export {register as popupLogin};
