import {h} from 'preact';
import {useRef} from 'preact/hooks';

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

	const handleLoginClick = () => {
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
			<div class="card">
				<div class="card-body">
					<h5 class="card-title">Login</h5>
					<input
						ref={usernameRef}
						required
						placeholder="Username"
						class="input-group-text"
					/>
					<input
						ref={passwordRef}
						required
						placeholder="Password"
						class="input-group-text"
						type="password"
					/>
				</div>
				<button
					type="button"
					class="btn btn-primary"
					onClick={handleLoginClick}
				>
					Login
				</button>
			</div>
		</div>
	);
};

export default LoggedOut;
