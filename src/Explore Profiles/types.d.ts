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

export type UserData = {
	firstaccess: number;
	fullname: string;
	id: number;
	lastaccess: number;
	profileimageurl: string;
	profileimageurlsmall: string;
	roles: Role[];
	suspended: boolean;
	city?: string;
	country?: string;
	description?: string;
	descriptionformat?: number;
	email?: string;
	enrolledcourses?: Enrolledcourse[];
	customfields?: CustomField[];
	interests?: string;
};

export type Role = {
	name: string;
	roleid: number;
	shortname: string;
	sortorder: number;
};

export type Enrolledcourse = {
	fullname: string;
	id: number;
	shortname: string;
};

export type CustomField = {
	name: string;
	shortname: string;
	type: string;
	value: string;
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
	country?: string;
	courses?: Array<{
		id: number;
		coursename: string;
	}>;
	interests?: string[];
	customfields?: CustomField[];
};
export type UnloadedState = {loaded: false};

export type State = UnloadedState | LoadedState;
