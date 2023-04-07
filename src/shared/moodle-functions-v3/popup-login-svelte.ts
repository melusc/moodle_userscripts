import type {Moodle, RegisterFunction} from './moodle.js';
import genericPopupSCSS from './popup-login.scss';
import PopupLogin from './popup-login.svelte';

async function popupLogin(this: Moodle, title: string): Promise<string> {
	return new Promise<string>(resolve => {
		const style = GM_addStyle(genericPopupSCSS);

		const div = document.createElement('div');
		div.className = 'login-popup-userscript';

		document.body.append(div);

		const app = new PopupLogin({
			target: div,
			props: {
				title,
				moodle: this,
			},
		});

		app.$on('login', ({detail: token}) => {
			app.$destroy();
			style.remove();
			div.remove();
			resolve(token);
		});
	});
}

const register: RegisterFunction = Moodle => {
	Moodle.prototype.popupLogin = popupLogin;
};

export {register as popupLogin};
