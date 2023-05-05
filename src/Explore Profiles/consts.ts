import {getUserId} from '../shared/moodle-functions-v3/get-user-id.js';
import {Moodle} from '../shared/moodle-functions-v3/moodle.js';
import {popupLogin} from '../shared/moodle-functions-v3/popup-login.js';

Moodle.extend(popupLogin).extend(getUserId);

export const title = 'Explore profiles';

export const moodle = new Moodle();
