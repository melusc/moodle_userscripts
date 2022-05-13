import {render, h, FunctionalComponent, JSX} from 'preact';
import {useRef, useState} from 'preact/hooks';

import genericPopupSCSS from './popup-login.scss';
import type {Moodle, RegisterFunction} from './moodle';
import {getUsername} from './credentials';

const GenericPopup: FunctionalComponent<{
	cb: () => void;
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
				await moodle.login({username, password});

				cb();
			} catch {
				setLoggedOut(true);
			}
		}
	};

	return isLoggedOut ? (
		<div class="vertical-horizontal-center">
			<form onSubmit={handleLogin}>
				<div class="card shadow">
					<div class="card-body">
						<h5 class="card-title">Login - {title}</h5>
						<div class="mb-3">
							<label htmlFor="popup-username" class="form-label">
								Username
							</label>
							<input
								ref={usernameRef}
								required
								defaultValue={getUsername()}
								id="popup-username"
								placeholder="Username"
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

						<div class="mb-3">
							<label htmlFor="popup-password" class="form-label">
								Password
							</label>
							<input
								ref={passwordRef}
								required
								id="popup-password"
								placeholder="Password"
								class={`form-control${
									validities.password ? '' : ' is-invalid'
								}`}
								type="password"
								onInput={() => {
									setValidities(validities => ({
										...validities,
										password: true,
									}));
								}}
							/>
						</div>
					</div>
					<button class="btn btn-primary" type="submit">
						Login
					</button>
				</div>
			</form>
		</div>
	) : null;
};

const popupLogin = async function (this: Moodle, title: string): Promise<void> {
	return new Promise<void>(resolve => {
		const style = GM_addStyle(genericPopupSCSS);

		const callback = () => {
			render(null, div);
			style.remove();
			div.remove();

			resolve();
		};

		const div = document.createElement('div');
		div.className = 'login-popup-userscript';

		document.body.append(div);

		render(<GenericPopup cb={callback} title={title} moodle={this} />, div);
	});
};

const register: RegisterFunction = Moodle => {
	Moodle.prototype.popupLogin = popupLogin;
};

export {register as popupLogin};
