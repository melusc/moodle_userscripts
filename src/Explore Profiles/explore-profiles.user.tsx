// ==UserScript==
// @name      Moodle explore profiles rest
// @version   4.0.0
// @author    lusc
// @updateURL https://git.io/JXzjB
// @match     *://moodle.*/user/profile.php?id=*
// @match     *://moodle*.*/user/profile.php?id=*
// @grant     GM_addStyle
// @grant     GM_setValue
// @grant     GM_getValue
// @grant     GM_deleteValue
// @run-at    document-start
// ==/UserScript==

import dayjs from 'dayjs';
import dayjsPluginRelativeTime from 'dayjs/plugin/relativeTime.js';
import {Fragment, h, render, type FunctionalComponent} from 'preact';
// eslint-disable-next-line n/file-extension-in-import
import {useEffect, useState} from 'preact/hooks';

import {
	cleanAuthStorage,
	domReady,
	migrate,
} from '../shared/general-functions/index.js';

import {Header} from './components/header.js';
import {Main} from './components/main.js';
import {Navigate} from './components/navigate.js';
import {Notification} from './components/notification.js';
import {Sidebar} from './components/sidebar.js';

import {moodle, title} from './consts.js';
import {countries as COUNTRY_CODES} from './countries.js';
import {getContacts, getUserId} from './utils.js';

import type {State, UserData} from './types.js';

import style from './style.scss';

type SetFromTo = (arg0: {from?: number; to?: number}) => void;

dayjs.extend(dayjsPluginRelativeTime);

migrate({
	'1.2.0': cleanAuthStorage,
});

const getHighest = () => {
	let highest = GM_getValue<number | undefined>('highest');

	if (highest === undefined) {
		highest = 2136;
		GM_setValue('highest', highest);
	}

	return highest;
};

/**
 *
 * @param {number} start Start value
 * @param {number} range range to find more profiles in
 * @example start = 1940, range = -9, will return profiles 1931 up to and including 1940
 */
const getProfilesInRange = async (
	start: number,
	range: number,
): Promise<UserData[]> => {
	let wstoken: string;
	try {
		wstoken = await moodle.login();
	} catch {
		wstoken = await moodle.popupLogin(title);
	}

	let lower = start;
	let upper = start + range;

	if (lower > upper) {
		[lower, upper] = [upper, lower];
	}

	const body = new URLSearchParams({
		wsfunction: 'core_user_get_course_user_profiles',
		wstoken,
		moodlewsrestformat: 'json',
	});

	for (let index = 0; index <= upper - lower; ++index) {
		body.set(`userlist[${index}][userid]`, `${lower + index}`);
		body.set(
			`userlist[${index}][courseid]`,
			'32', // Allgemeine informationen
		);
	}

	const response = await fetch(
		moodle.resolveUrl('/webservice/rest/server.php'),
		{
			method: 'POST',
			body,
			headers: {
				'content-type': 'application/x-www-form-urlencoded',
			},
		},
	);
	const responseJSON = (await response.json()) as UserData[];

	if ('errorcode' in responseJSON) {
		moodle.logout();
		return getProfilesInRange(start, range);
	}

	return responseJSON;
};

// Replace "&amp;" last
// otherwise "&amp;lt;" would become "<"
const unescapeHTML = (html: string) =>
	`${html}`
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&quot;/g, '"')
		.replace(
			/&#039;|&apos;/g /* Second one just in case because I don't know how moodle escapes apostrophies */,
			"'",
		)
		.replace(/&amp;/g, '&');

const getRandomProfile = async (setFromTo: SetFromTo): Promise<UserData> => {
	const highest = getHighest();
	const randProfile = Math.floor(Math.random() * (highest + 1)) + 1;

	setFromTo({from: randProfile, to: undefined});

	const [profile] = await getProfilesInRange(randProfile, 0);

	if (profile) {
		return profile;
	}

	return getRandomProfile(setFromTo);
};

const getProfile = async (
	currentId: number,
	action: number,
	setFromTo: SetFromTo,
): Promise<UserData> => {
	const actionSign = Math.sign(action);

	let newId = currentId + action;

	const currentHighest = getHighest();
	if (newId < 1) {
		newId = currentHighest;
	} else if (newId > currentHighest) {
		newId = 1;
	}

	setFromTo({
		from: newId,
		// prettier-ignore
		to: newId + (9 * actionSign),
	});

	const increment = 9 * actionSign || 9; // If actionSign === 0 it should still check the next 9

	const profiles = await getProfilesInRange(newId, increment);

	const highest = profiles[profiles.length - 1];

	if (highest && highest.id > currentHighest - 10) {
		GM_setValue('highest', highest.id + 10);
	}

	const profile = actionSign < 0 ? profiles[profiles.length - 1] : profiles[0];

	if (profile) {
		return profile;
	}

	// Action is ±10 because if it couldn't find any with ±1
	// It should not increment by 1 anymore
	return getProfile(newId, 10 * actionSign || 1, setFromTo);
};

const fetchProfile = async (
	action: number | 'rand',
	setFromTo: SetFromTo,
): Promise<State> => {
	const id = Number(new URL(location.href).searchParams.get('id'));

	const profile
		= action === 'rand'
			? await getRandomProfile(setFromTo)
			: await getProfile(id, action, setFromTo);

	if (id !== profile.id) {
		const url = new URL(location.href);

		url.searchParams.set('id', `${profile.id}`);
		history.pushState({}, '', url.href);
	}

	const userId = await getUserId();
	const contacts = await getContacts(userId);

	document.title = `${profile.fullname}: Public profile`;

	setFromTo({from: undefined, to: undefined});

	return {
		loaded: true,
		isUserProfile: 'preferences' in profile,
		isContact: contacts.includes(profile.id),
		email: profile.email,
		city: profile.city,
		id: profile.id,
		firstaccess: profile.firstaccess,
		lastaccess: profile.lastaccess,
		description: profile.description,
		customfields: profile.customfields,
		country: COUNTRY_CODES[profile.country ?? ''],
		courses: profile.enrolledcourses?.map(({id, fullname}) => ({
			id,
			coursename: unescapeHTML(fullname.trim()),
		})),
		fullname: profile.fullname?.trim(),
		interests: profile.interests?.split(',')?.map(interest => interest.trim()),
		image: profile.profileimageurl,
		userId,
	};
};

const ExploreProfiles: FunctionalComponent = () => {
	const [state, setState] = useState<State>({
		loaded: false,
	});

	const [{from, to}, setFromTo] = useState<{from?: number; to?: number}>({});

	const navigate = async (action: number | 'rand') => {
		setState(await fetchProfile(action, setFromTo));
	};

	useEffect(() => {
		const cb = () => {
			void navigate(0);
		};

		addEventListener('popstate', cb);

		return () => {
			removeEventListener('popstate', cb);
		};
	}, []);

	return (
		<>
			<Navigate navigate={navigate} />
			<Notification from={from} to={to} />

			{state.loaded && (
				<>
					<Header {...state} />
					<Sidebar {...state} />
					<Main {...state} />
				</>
			)}
		</>
	);
};

const runOnce = () => {
	GM_addStyle(style);

	render(<ExploreProfiles />, document.body);
};

domReady(runOnce);
