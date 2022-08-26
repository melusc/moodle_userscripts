import {
	getUserId,
	Moodle,
	popupLogin,
} from '../shared/moodle-functions-v3/index.js';

Moodle.extend(popupLogin).extend(getUserId);

export const title = 'Explore profiles';

export const moodle = new Moodle();
