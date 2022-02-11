// ==UserScript==
// @name      Moodle explore profiles rest
// @version   1.0.2
// @author    lusc
// @updateURL https://git.io/JXzjB
// @include   https://moodle.ksasz.ch/user/profile.php?id=*
// @grant     GM_addStyle
// @grant     GM.setValue
// @grant     GM.getValue
// @grant     GM.deleteValue
// @run-at    document-start
// ==/UserScript==

import dayjs from 'dayjs';
import dayjsPluginRelativeTime from 'dayjs/plugin/relativeTime.js';
import DOMPurify from 'dompurify';
import {render, Fragment, h} from 'preact';
import {useSnapshot, proxy} from 'valtio';
import domReady from '@wordpress/dom-ready';

import {
	logout,
	popupGetToken,
	popupGetUserId,
} from '../shared/moodle-functions-v2';

import {countries as COUNTRY_CODES} from './countries';
import {getContacts} from './get-contacts';
import {title} from './consts';

import style from './style.scss';

import type {UserDataResponse} from './explore-profiles.d';

dayjs.extend(dayjsPluginRelativeTime);

let CONTACTS: readonly number[];
let USER_ID: number;

// Typescript can't handle readonly arrays with Array.isArray
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isReadonlyArray = (arg0: any): arg0 is readonly any[] =>
	Array.isArray(arg0);

type MainState = {
	loaded: boolean;

	id: number;
	fullname: string;
	firstaccess: number;
	lastaccess: number;
	image: string;

	isContact: boolean;
	isUserProfile: boolean;

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

const getHighest = async () => {
	let highest = await GM.getValue<number | undefined>('highest');

	if (highest === undefined) {
		highest = 2136;
		await GM.setValue('highest', highest);
	}

	return highest;
};

// State used by all
const mainState = proxy<MainState | (Partial<MainState> & {loaded: false})>({
	loaded: false,
});

const notificationState = proxy<{
	from?: number;
	to?: number;
}>({});

const Notification = () => {
	let {from, to} = useSnapshot(notificationState);

	if (from === undefined) {
		return null;
	}

	if (to !== undefined && to < from) {
		[from, to] = [to, from];
	}

	return (
		<div class="epr-notification">
			<div class="epr-centered">
				<div class="epr-spinner">
					<div class="bounce1" />
					<div class="bounce2" />
					<div class="bounce3" />
				</div>
				<div class="epr-text-center">
					{'Checking '}
					{from}
					{to !== undefined && to !== from && ` to ${to}`}
				</div>
			</div>
		</div>
	);
};

const Header = () => {
	const snap = useSnapshot(mainState);

	if (!snap.loaded) {
		return null;
	}

	const {
		id,
		image,
		fullname,
		firstaccess,
		lastaccess,
		isContact,
		isUserProfile,
	} = snap;

	return (
		<div class="col-12 pt-3 pb-3">
			<div class="card ">
				<div class="card-body ">
					<div class="d-flex align-items-center">
						<div class="mr-auto">
							<div class="page-context-header">
								<div class="page-header-image">
									<a
										href={`https://moodle.ksasz.ch/user/profile.php?id=${id}`}
										class="d-inline-block aabtn"
									>
										<img
											src={image}
											class="userpicture defaultuserpic"
											alt={`Picture of ${fullname}`}
											title={`Picture of ${fullname}`}
											width="100"
											height="100"
										/>
									</a>
								</div>
								<div class="page-header-headings">
									<h1>{fullname}</h1>
									<h5>
										{'First accessed Moodle: '}
										<span class="epr-coloured">
											{dayjs
												.unix(firstaccess)
												.format('ddd, D MMM YYYY HH:mm:ss')}
										</span>
									</h5>
									<h5>
										{'Last accessed Moodle '}
										<span class="epr-coloured">
											{dayjs.unix(lastaccess).fromNow(true)}
										</span>
										{' ago'}
									</h5>
								</div>
								<div class="btn-group header-button-group">
									<a
										id="message-user-button"
										role="button"
										data-conversationid="0"
										data-userid={id}
										class="btn"
										href={`https://moodle.ksasz.ch/message/index.php?id=${id}`}
									>
										<span>
											<i
												class="icon fa fa-comment fa-fw iconsmall"
												title="Message"
												aria-label="Message"
											/>
											<span class="header-button-title">Message</span>
										</span>
									</a>
									<span
										class="sr-only sr-only-focusable"
										data-region="jumpto"
										tabIndex={-1}
									/>

									{!isUserProfile && (
										<a
											data-userid={id}
											data-is-contact={isContact ? 1 : 0}
											id="toggle-contact-button"
											role="button"
											class="ajax-contact-button btn"
											href={`https://moodle.ksasz.ch/message/index.php?user1=${USER_ID}&user2=${id}&${
												isContact ? 'removecontact' : 'addcontact'
											}=${id}&sesskey=${unsafeWindow.M.cfg.sesskey}`}
										>
											<span>
												{isContact ? (
													<i
														class="icon fa fa-user-times fa-fw iconsmall"
														title="Remove from contacts"
														aria-label="Remove from contacts"
													/>
												) : (
													<i
														class="icon fa fa-address-card fa-fw iconsmall"
														title="Add to contacts"
														aria-label="Add to contacts"
													/>
												)}
												<span class="header-button-title">
													{isContact
														? 'Remove from contacts'
														: 'Add to contacts'}
												</span>
											</span>
											<span class="loading-icon icon-no-margin">
												<i
													class="icon fa fa-circle-o-notch fa-spin fa-fw "
													title="Loading"
													aria-label="Loading"
												/>
											</span>
										</a>
									)}
								</div>
							</div>
						</div>
						<div
							class="header-actions-container flex-shrink-0"
							data-region="header-actions-container"
						/>
					</div>
					<div class="d-flex flex-wrap">
						<div id="page-navbar">
							<nav aria-label="Navigation bar">
								<ol class="breadcrumb">
									<li class="breadcrumb-item">
										<a href="https://moodle.ksasz.ch/">Home</a>
									</li>

									<li class="breadcrumb-item">Users</li>

									<li class="breadcrumb-item">
										<a
											href={`https://moodle.ksasz.ch/user/profile.php?id=${id}`}
											aria-current="page"
										>
											{fullname}
										</a>
									</li>
								</ol>
							</nav>
						</div>
						<div class="ml-auto d-flex">
							{isUserProfile && (
								<>
									<div class="singlebutton">
										<form
											method="post"
											action="https://moodle.ksasz.ch/user/profile.php"
										>
											<input type="hidden" name="edit" value="1" />
											<input type="hidden" name="reset" value="1" />
											<input type="hidden" name="id" value={USER_ID} />
											<input
												type="hidden"
												name="sesskey"
												value={unsafeWindow.M.cfg.sesskey}
											/>
											<button
												type="submit"
												class="btn btn-secondary"
												id="single_button5fcba57352eb71"
												title=""
											>
												Reset page to default
											</button>
										</form>
									</div>
									<div class="singlebutton">
										<form
											method="post"
											action="https://moodle.ksasz.ch/user/profile.php"
										>
											<input type="hidden" name="edit" value="1" />
											<input type="hidden" name="id" value={USER_ID} />
											<input
												type="hidden"
												name="sesskey"
												value={unsafeWindow.M.cfg.sesskey}
											/>
											<button
												type="submit"
												class="btn btn-secondary"
												id="single_button5fcba57352eb72"
												title=""
											>
												Customise this page
											</button>
										</form>
									</div>
								</>
							)}
						</div>
						<div id="course-header" />
					</div>
				</div>
			</div>
		</div>
	);
};

const Main = () => {
	const snap = useSnapshot(mainState);
	if (!snap.loaded) {
		return null;
	}

	const {
		description,
		email,
		country,
		city,
		url,
		interests,
		courses,
		id,
		firstaccess,
		lastaccess,
		isUserProfile,
	} = snap;

	return (
		<section id="region-main" class="region-main-content" aria-label="Content">
			<span class="notifications" id="user-notifications" />
			<div role="main">
				<span id="maincontent" />
				<div class="userprofile">
					{typeof description !== 'undefined' && description !== '' && (
						<div
							// Disable it because it gets sanitised
							// and is trusted anyway
							// eslint-disable-next-line react/no-danger
							dangerouslySetInnerHTML={{
								__html: DOMPurify.sanitize(description),
							}}
							class="description"
						/>
					)}
					<aside
						id="block-region-content"
						class="block-region"
						data-blockregion="content"
						data-droptarget="1"
					/>
					<div class="profile_tree">
						{[email, country, city, url, interests].some(
							item => typeof item !== 'undefined',
						) && (
							<section class="node_category card d-inline-block w-100 mb-3">
								<div class="card-body">
									<h3 class="lead">User details</h3>
									<ul>
										{typeof email !== 'undefined' && (
											<li class="contentnode">
												<dl>
													<dt>Email address</dt>
													<dd>
														<a href={`mailto:${encodeURIComponent(email)}`}>
															{email}
														</a>
													</dd>
												</dl>
											</li>
										)}
										{typeof country !== 'undefined' && (
											<li class="contentnode">
												<dl>
													<dt>Country</dt>
													<dd>{country}</dd>
												</dl>
											</li>
										)}
										{typeof city !== 'undefined' && (
											<li class="contentnode">
												<dl>
													<dt>City/town</dt>
													<dd>{city}</dd>
												</dl>
											</li>
										)}
										{typeof url !== 'undefined' && (
											<li class="contentnode">
												<dl>
													<dt>Web page</dt>
													<dd>
														<a href={url} rel="noopener noreferrer">
															{url}
														</a>
													</dd>
												</dl>
											</li>
										)}
										{typeof interests !== 'undefined' && (
											<li class="contentnode">
												<dl>
													<dt>Interests</dt>
													<dd>
														<div class="tag_list hideoverlimit ">
															<ul class="inline-list">
																{interests.map(interest => (
																	<li key={interest}>
																		<a
																			href={`https://moodle.ksasz.ch/tag/index.php?tag=${encodeURIComponent(
																				interest,
																			)}`}
																			class="badge badge-info"
																		>
																			{interest}
																		</a>
																	</li>
																))}
															</ul>
														</div>
													</dd>
												</dl>
											</li>
										)}
									</ul>
								</div>
							</section>
						)}
						{isReadonlyArray(courses) && courses.length > 0 && (
							<section class="node_category card d-inline-block w-100 mb-3">
								<div class="card-body">
									<h3 class="lead">Course details</h3>
									<ul>
										<li class="contentnode">
											<dl>
												<dt>Course profiles</dt>
												<dd>
													<ul>
														{courses.map(item => (
															<li key={item.id}>
																<a
																	href={`/user/view.php?id=${id}&course=${item.id}`}
																>
																	{item.coursename}
																</a>
															</li>
														))}
													</ul>
												</dd>
											</dl>
										</li>
									</ul>
								</div>
							</section>
						)}
						<section class="node_category card d-inline-block w-100 mb-3">
							<div class="card-body">
								<h3 class="lead">Miscellaneous</h3>
								<ul>
									<li>
										<span>
											<a
												href={`https://moodle.ksasz.ch/blog/index.php?userid=${id}`}
											>
												View all blog entries
											</a>
										</span>
									</li>
									<li>
										<span>
											<a
												href={`https://moodle.ksasz.ch/mod/forum/user.php?id=${id}`}
											>
												Forum posts
											</a>
										</span>
									</li>
									<li>
										<span>
											<a
												href={`https://moodle.ksasz.ch/mod/forum/user.php?id=${id}&mode=discussions`}
											>
												Forum discussions
											</a>
										</span>
									</li>
								</ul>
							</div>
						</section>
						{isUserProfile && (
							<section class="node_category card d-inline-block w-100 mb-3">
								<div class="card-body">
									<h3 class="lead">Reports</h3>
									<ul>
										<li>
											<span>
												<a href="https://moodle.ksasz.ch/report/usersessions/user.php">
													Browser sessions
												</a>
											</span>
										</li>
										<li>
											<span>
												<a
													href={`https://moodle.ksasz.ch/grade/report/overview/index.php?userid=${USER_ID}&id=1`}
												>
													Grades overview
												</a>
											</span>
										</li>
									</ul>
								</div>
							</section>
						)}
						<section class="node_category card d-inline-block w-100 mb-3">
							<div class="card-body">
								<h3 class="lead">Login activity</h3>
								<ul>
									{typeof firstaccess !== 'undefined' && (
										<li class="contentnode">
											<dl>
												<dt>First access to site</dt>
												<dd>
													{dayjs
														.unix(firstaccess)
														.format('dddd, D MMMM YYYY, H:mm')}
													{' ('}
													{dayjs.unix(firstaccess).fromNow(false)})
												</dd>
											</dl>
										</li>
									)}
									{typeof lastaccess !== 'undefined' && (
										<li class="contentnode">
											<dl>
												<dt>Last access to site</dt>
												<dd>
													{dayjs
														.unix(lastaccess)
														.format('dddd, D MMMM YYYY, H:mm')}
													{' ('}
													{dayjs.unix(lastaccess).fromNow(false)})
												</dd>
											</dl>
										</li>
									)}
								</ul>
							</div>
						</section>
					</div>
				</div>
			</div>
		</section>
	);
};

const Sidebar = () => {
	const snap = useSnapshot(mainState);

	if (!snap.loaded || snap.isUserProfile) {
		return null;
	}

	const {id, fullname} = snap;

	return (
		<>
			<p
				class="tree_item branch"
				role="treeitem"
				aria-expanded="true"
				aria-owns="random5fcb9ae3999e64_group"
				tabIndex={-1}
				aria-selected="false"
			>
				<span tabIndex={-1} id="label_2_34">
					Users
				</span>
			</p>
			<ul role="group" tabIndex={-1}>
				<li
					class="type_user depth_3 contains_branch current_branch"
					aria-labelledby="label_3_35"
					tabIndex={-1}
				>
					<p
						class="tree_item branch active_tree_node"
						role="treeitem"
						aria-expanded="true"
						aria-owns="random5fcb9ae3999e65_group"
						tabIndex={-1}
						aria-selected="false"
					>
						<a
							tabIndex={-1}
							id="label_3_35"
							href={`https://moodle.ksasz.ch/user/profile.php?id=${id}`}
						>
							{fullname}
						</a>
					</p>
					<ul role="group" tabIndex={-1}>
						<li
							class="type_container depth_4 contains_branch"
							aria-labelledby="label_4_36"
							tabIndex={-1}
						>
							<p
								class="tree_item branch"
								role="treeitem"
								aria-expanded="false"
								aria-owns="random5fcb9ae3999e66_group"
								tabIndex={-1}
								aria-selected="false"
							>
								<span tabIndex={-1} id="label_4_36">
									Blogs
								</span>
							</p>
							<ul role="group" aria-hidden="true" tabIndex={-1}>
								<li
									class="type_custom depth_5 item_with_icon"
									aria-labelledby="label_5_37"
									tabIndex={-1}
								>
									<p
										class="tree_item hasicon"
										role="treeitem"
										tabIndex={-1}
										aria-selected="false"
									>
										<a
											tabIndex={-1}
											id="label_5_37"
											href={`https://moodle.ksasz.ch/blog/index.php?userid=${id}`}
										>
											<i
												class="icon fa fa-square fa-fw navicon"
												aria-hidden="true"
												tabIndex={-1}
											/>
											<span class="item-content-wrap" tabIndex={-1}>
												View all entries by {fullname}
											</span>
										</a>
									</p>
								</li>
							</ul>
						</li>
						<li
							class="type_setting depth_4 item_with_icon"
							aria-labelledby="label_4_38"
							tabIndex={-1}
						>
							<p
								class="tree_item hasicon"
								role="treeitem"
								tabIndex={-1}
								aria-selected="false"
							>
								<a
									tabIndex={-1}
									id="label_4_38"
									href={`https://moodle.ksasz.ch/message/index.php?user1=${USER_ID}&user2=${id}`}
								>
									<i
										class="icon fa fa-square fa-fw navicon"
										aria-hidden="true"
										tabIndex={-1}
									/>
									<span class="item-content-wrap" tabIndex={-1}>
										Messages
									</span>
								</a>
							</p>
						</li>
					</ul>
				</li>
			</ul>
		</>
	);
};

const clearNode = (node: Element) => {
	while (node.lastChild !== null) {
		node.lastChild.remove();
	}
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
): Promise<UserDataResponse[]> => {
	const wstoken = await popupGetToken(title);

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
		'https://moodle.ksasz.ch/webservice/rest/server.php',
		{
			method: 'POST',
			body,
			headers: {
				'content-type': 'application/x-www-form-urlencoded',
			},
		},
	);
	const responseJSON = (await response.json()) as UserDataResponse[];

	if ('errorcode' in responseJSON) {
		await logout();
		return getProfilesInRange(start, range);
	}

	return responseJSON;
};

const unescapeHTML = (html: string) =>
	`${html}`
		.replace(/&amp;/g, '&')
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&quot;/g, '"')
		.replace(
			/&#039;|&apos;/g /* Second one just in case because I don't know how moodle escapes apostrophies */,
			"'",
		);

const getRandomProfile = async (): Promise<UserDataResponse> => {
	const highest = await getHighest();
	const randProfile = Math.floor(Math.random() * (highest + 1)) + 1;

	notificationState.from = randProfile;
	notificationState.to = undefined;

	const [profile] = await getProfilesInRange(randProfile, 0);

	if (profile) {
		return profile;
	}

	return getRandomProfile();
};

const getProfile = async (
	currentId: number,
	action: number,
): Promise<UserDataResponse> => {
	const actionSign = Math.sign(action);

	let newId = currentId + action;

	const currentHighest = await getHighest();
	if (newId < 1) {
		newId = currentHighest;
	} else if (newId > currentHighest) {
		newId = 1;
	}

	notificationState.from = newId;

	// prettier-ignore
	notificationState.to = newId + (9 * actionSign);

	const increment = 9 * actionSign || 9; // If actionSign === 0 it should still check the next 9

	const profiles = await getProfilesInRange(newId, increment);

	const highest = profiles[profiles.length - 1];

	if (highest && highest.id > currentHighest - 10) {
		await GM.setValue('highest', highest.id + 10);
	}

	const profile = actionSign < 0 ? profiles[profiles.length - 1] : profiles[0];

	if (profile) {
		return profile;
	}

	// Action is ±10 because if it couldn't find any with ±1
	// It should not increment by 1 anymore
	return getProfile(newId, 10 * actionSign || 1);
};

/**
 * Listens to click on buttons
 * @param {EventListenerObject} event_ Event obj
 * @listens click
 */
const fetchNewProfile = async (action: number | 'rand') => {
	const id = Number(new URL(location.href).searchParams.get('id'));

	const profile
		= action === 'rand' ? await getRandomProfile() : await getProfile(id, action);

	if (id !== profile.id) {
		const url = new URL(location.href);

		url.searchParams.set('id', `${profile.id}`);
		history.pushState({}, '', url.href);
	}

	if (USER_ID === undefined) {
		USER_ID = await popupGetUserId(title);
	}

	notificationState.from = undefined;
	notificationState.to = undefined;

	document.title = `${profile.fullname}: Public profile`;

	if (!isReadonlyArray(CONTACTS)) {
		CONTACTS = await getContacts(USER_ID);
	}

	/* {
			email,
			country,
			city,
			id,
			cours,
			firstaccess,
			lastaccess,
			fullname,
			description,
			interests,
			url,
			image,
		} */

	Object.assign(mainState, {
		isUserProfile: 'preferences' in profile,
		isContact: CONTACTS.includes(profile.id),
		email: profile.email,
		city: profile.city,
		id: profile.id,
		firstaccess: profile.firstaccess,
		lastaccess: profile.lastaccess,
		description: profile.description,
		url: profile.url,
		country: COUNTRY_CODES[profile.country ?? ''],
		courses: profile.enrolledcourses?.map(({id, fullname}) => ({
			id,
			coursename: unescapeHTML(fullname.trim()),
		})),
		fullname: profile.fullname?.trim(),
		interests: profile.interests?.split(',')?.map(interest => interest.trim()),
		image: profile.profileimageurl,
	} as MainState);

	if (!mainState.loaded) {
		mainState.loaded = true;

		const regionMainBox = document.querySelector('#region-main-box');
		const pageHeader = document.querySelector('#page-header');

		if (pageHeader) {
			clearNode(pageHeader);
			render(<Header />, pageHeader);
		}

		if (regionMainBox) {
			clearNode(regionMainBox);
			render(<Main />, regionMainBox);
		}

		let li = document.evaluate(
			'//li' // Get all li elements
				+ '[@class="type_system depth_2 contains_branch"]' // That have class "type_system depth_2 contains_branch"
				+ '[.//span[text()="Users"]]' // That have a span with text "Users"
				+ '[.//span[text()="Blogs"]]', // That have a span with text "Blogs"
			document.body,
			null,
			XPathResult.FIRST_ORDERED_NODE_TYPE,
			null,
			// eslint-disable-next-line @typescript-eslint/ban-types
		).singleNodeValue as HTMLLIElement | null;

		if (li) {
			clearNode(li);
		} else {
			li = document.createElement('li');

			li.className = 'type_system depth_2 contains_branch';
			li.setAttribute('aria-labelledby', 'label_2_34');
			li.tabIndex = -1;

			const courseSidebar = document.querySelector<HTMLLIElement>(
				'li[aria-labelledby="label_2_4"]',
			);

			if (courseSidebar) {
				courseSidebar.after(li);
			}
		}

		render(<Sidebar />, li);
	}
};

const runOnce = () => {
	const notification = document.createElement('div');

	render(<Notification />, notification);
	document.body.append(notification);

	GM_addStyle(style);

	const navbar = document.querySelector<HTMLUListElement>(
		'ul.navbar-nav.d-none.d-md-flex',
	);

	if (navbar) {
		const buttons = document.createElement('div');
		buttons.classList.add('btn-group');

		const BUTTONS = [
			['Previous profile', -1],
			['Next profile', 1],
			['Random profile', 'rand'],
			['-10 profiles', -10],
			['+10 profiles', 10],
		] as const;

		render(
			<>
				{BUTTONS.map(([text, action]) => (
					<button
						key={action}
						class="btn btn-secondary"
						type="button"
						onClick={() => {
							void fetchNewProfile(action);
						}}
					>
						{text}
					</button>
				))}
			</>,
			buttons,
		);

		navbar.after(buttons);
		addEventListener('popstate', () => {
			void fetchNewProfile(0);
		});
	}
};

domReady(runOnce);
