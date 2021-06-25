declare global {
	interface Window {
		M: {
			cfg: {
				sesskey: string;
				// ...
			};
			// ...
		};
	}
}

/* [
  'id', 'fullname',
  'firstaccess', 'lastaccess',
  'suspended', 'profileimageurlsmall',
  'profileimageurl', 'roles',
  'email', 'description',
  'descriptionformat', 'city',
  'country', 'enrolledcourses',
  'url', 'interests',
  'username', 'department',
  'auth', 'confirmed',
  'lang', 'theme',
  'timezone', 'mailformat',
  'preferences',
]; */

type UserDataResponse = {
	city?: string;
	country?: string;
	description?: string;
	descriptionformat?: 1;
	email?: string;
	enrolledcourses?: Array<{
		id: number;
		fullname: string;
		shortname: string;
	}>;
	firstaccess: number;
	fullname: string;
	id: number;
	lastaccess: number;
	profileimageurl: string;
	profileimageurlsmall: string;
	roles: Array<{
		name: string;
		roleid: number;
		shortname: string;
		sortorder: number;
	}>;
	suspended: boolean;
	url?: string;
	interests?: string;

	/* Only on own profile */
	preferences?: Array<{
		name: string;
		value: string | number;
	}>;
	timezone?: string;
	mailformat?: number;
	lang?: string;
	theme?: string;
	confirmed?: boolean;
	auth?: string;
	department?: string;
	username?: string;
};

export {UserDataResponse};
