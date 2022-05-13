import {
	Moodle,
	popupLogin,
	getUserId,
} from '../shared/moodle-functions-v3/index';

Moodle.extend(popupLogin).extend(getUserId);

export const title = 'Explore profiles';

export const moodle = new Moodle();
