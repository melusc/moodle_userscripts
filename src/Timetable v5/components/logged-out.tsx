import {h, JSX} from 'preact';
import {useRef} from 'preact/hooks';

import {getUsername} from '../../shared/moodle-functions-v3/credentials';

const LoggedOut = ({
	loggedOut,
	cb,
}: {
	loggedOut: boolean;
	cb: (creds: {username: string; password: string}) => void;
}) => {
	const usernameRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);

	if (!loggedOut) {
		return null;
	}

	const handleLoginClick: JSX.GenericEventHandler<HTMLFormElement> = event => {
		event.preventDefault();

		const username = usernameRef.current?.value.trim();
		const password = passwordRef.current?.value;

		if (username !== undefined && password !== undefined) {
			cb({
				username,
				password,
			});
		}
	};

	return (
		<div class="login-popup">
			<form onSubmit={handleLoginClick}>
				<div class="card">
					<div class="card-body">
						<h5 class="card-title">Login</h5>
						<input
							ref={usernameRef}
							required
							placeholder="Username"
							class="input-group-text"
							defaultValue={getUsername()}
						/>
						<input
							ref={passwordRef}
							required
							placeholder="Password"
							class="input-group-text"
							type="password"
						/>
					</div>
					<button type="submit" class="btn btn-primary">
						Login
					</button>
				</div>
			</form>
		</div>
	);
};

export default LoggedOut;
