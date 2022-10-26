declare global {
	// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
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

export type UserDataResponse = {
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

export type LoadedState = {
	loaded: true;

	id: number;
	fullname: string;
	firstaccess: number;
	lastaccess: number;
	image: string;

	isContact: boolean;
	isUserProfile: boolean;
	userId: number;

	email?: string;
	city?: string;
	description?: string;
	url?: string;
	country?: string;
	courses?: Array<{
		id: number;
		coursename: string;
	}>;
	interests?: string[];
};
export type UnloadedState = {loaded: false};

export type State = UnloadedState | LoadedState;
