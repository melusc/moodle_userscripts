import {render, h} from 'preact';
import {useRef, useState} from 'preact/hooks';
import {unmountComponentAtNode} from 'preact/compat';

import genericPopupSCSS from './use-popup.scss';
import {login_throwable} from './login';
import {getCourses_throwable} from './get-courses';
import {getCredentials, getToken} from './storage-util';
import {logout} from './logout';
import {getUserId_throwable} from './get-user-id';

const GenericPopup = (props: {cb: (arg0: string) => void; title: string}) => {
	const usernameRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);

	const [isLoggedOut, setLoggedOut] = useState(true);
	const [validities, setValidities] = useState({
		username: true,
		password: true,
	});

	const handleLogin = async () => {
		const username = usernameRef.current?.value.trim();
		const password = passwordRef.current?.value;

		setValidities({
			password: Boolean(password),
			username: Boolean(username),
		});

		if (username && password) {
			setLoggedOut(false);

			try {
				const token = await login_throwable({
					username,
					password,
				});

				props.cb(token);
			} catch {
				setLoggedOut(true);
			}
		}
	};

	return isLoggedOut ? (
		<div class="vertical-horizontal-center">
			<div class="card">
				<div class="card-body">
					<h5 class="card-title">Login - {props.title}</h5>
					<div class="mb-3">
						<label htmlFor="popup-username" class="form-label">
							Username
						</label>
						<input
							ref={usernameRef}
							required
							id="popup-username"
							placeholder="Username"
							class={`form-control${validities.username ? '' : ' is-invalid'}`}
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
							class={`form-control${validities.password ? '' : ' is-invalid'}`}
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
				<button class="btn btn-primary" type="button" onClick={handleLogin}>
					Login
				</button>
			</div>
		</div>
	) : null;
};

export const popupLogin = async (title: string): Promise<string> =>
	new Promise(resolve => {
		const style = GM_addStyle(genericPopupSCSS);

		const callback = (token: string) => {
			style.remove();
			unmountComponentAtNode(div);
			div.remove();

			resolve(token);
		};

		const div = document.createElement('div');
		div.className = 'login-popup-userscript';

		document.body.append(div);

		render(<GenericPopup cb={callback} title={title}/>, div);
	});

export const popupGetToken = async (title: string): Promise<string> => {
	const token = getToken();

	if (token) {
		return token;
	}

	const creds = getCredentials();

	if (creds) {
		try {
			return await login_throwable(creds);
		} catch {
			logout(true);
		}
	} else {
		logout(true);
	}

	return popupLogin(title);
};

export const popupGetCourses = async (
	title: string,
): Promise<Record<string, string>> => {
	const token = await popupGetToken(title);

	try {
		return await getCourses_throwable(token);
	} catch {
		logout();

		return popupGetCourses(title);
	}
};

export const popupGetUserId = async (title: string): Promise<number> => {
	const token = await popupGetToken(title);

	try {
		return await getUserId_throwable(token);
	} catch {
		logout();

		return popupGetUserId(title);
	}
};
