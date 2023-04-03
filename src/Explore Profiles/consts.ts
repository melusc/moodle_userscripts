import {getUserId, Moodle} from '../shared/moodle-functions-v3/index.js';
import {popupLogin} from '../shared/moodle-functions-v3/popup-login.js';

Moodle.extend(popupLogin).extend(getUserId);

export const title = 'Explore profiles';

export const moodle = new Moodle();
