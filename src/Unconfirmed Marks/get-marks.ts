import {uniqueId} from '../shared/general-functions';

export type MarksRow = {
	key: string;
	course: string;
	name: string;
	date: string;
	mark: string;
};

type GetMarksSuccessful = {
	error: false;
	marks: MarksRow[] | undefined;
};

type GetMarksError = {
	error: true;
	shouldLogOut: false;
	errorMsg: string;
};

type GetMarksLoggedOut = {
	error: true;
	shouldLogOut: true;
	credentialsToRemove: Array<'username' | 'password' | 'page'>;
};

export type GetMarksResponse =
	| GetMarksError
	| GetMarksSuccessful
	| GetMarksLoggedOut;

export const getMarks = async ({
	username,
	password,
	page,
}: {
	username: string;
	password: string;
	page: string;
}): Promise<GetMarksResponse> => {
	let loginPageResponse: Tampermonkey.Response<string>;
	try {
		loginPageResponse = await new Promise<Tampermonkey.Response<string>>(
			(resolve, reject) => {
				GM_xmlhttpRequest<string>({
					method: 'GET',
					url: `https://www.schul-netz.com/${page}/loginto.php`,
					onload: resolve,
					timeout: 10_000,
					onerror: reject,
					onabort: reject,
					ontimeout: reject,
				});
			},
		);
	} catch (error: unknown) {
		console.error(error);

		return {
			error: true,
			shouldLogOut: false,
			errorMsg: `An error occurred fetching "/${page}/loginto.php"`,
		};
	}

	if (loginPageResponse.status === 404) {
		return {
			error: true,
			shouldLogOut: true,
			credentialsToRemove: ['page'],
		};
	}

	if (loginPageResponse.status !== 200) {
		return {
			error: true,
			shouldLogOut: false,
			errorMsg: `An error occurred fetching "/${page}/loginto.php": "${loginPageResponse.statusText}"`,
		};
	}

	const parsedLoginPage = new DOMParser().parseFromString(
		loginPageResponse.responseText,
		'text/html',
	);

	const loginHashElement = parsedLoginPage.querySelector<HTMLInputElement>(
		'input[name="loginhash"]',
	);

	if (!loginHashElement) {
		return {
			error: true,
			shouldLogOut: false,
			errorMsg: 'Could not get loginhash.',
		};
	}

	const loginRequestBody = new URLSearchParams({
		loginhash: loginHashElement.value,
		login: username,
		passwort: password,
	});

	let frontPageResponse: Tampermonkey.Response<string>;
	try {
		frontPageResponse = await new Promise<Tampermonkey.Response<string>>(
			(resolve, reject) => {
				GM_xmlhttpRequest<string>({
					method: 'POST',
					url: `https://www.schul-netz.com/${page}/index.php?pageid=`,
					data: loginRequestBody.toString(),
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
					},
					timeout: 10_000,
					onload: resolve,
					onerror: reject,
					onabort: reject,
					ontimeout: reject,
				});
			},
		);
	} catch (error: unknown) {
		console.error(error);

		/* If the creds are incorrect it won't throw
				 That scenario is handled below */
		return {
			error: true,
			shouldLogOut: false,
			errorMsg: 'An error occurred trying to log in.',
		};
	}

	if (/loginto\.php/i.test(frontPageResponse.finalUrl)) {
		return {
			error: true,
			shouldLogOut: true,
			credentialsToRemove: ['password'],
		};
	}

	const parsedFrontPage = new DOMParser().parseFromString(
		frontPageResponse.responseText,
		'text/html',
	);

	const table = parsedFrontPage.evaluate(
		'.//h3' // Find all h3
			+ '[contains(@class, "tabletitle")]' // That have the className "tabletitle"
			+ '[text() = "Ihre letzten Noten"]' // That have the text "Ihre letzten Noten"
			+ '/..' // Go to parent
			+ '/following-sibling::table', // And find all siblings of parent that are a table
		parsedFrontPage.body,
		null,
		XPathResult.FIRST_ORDERED_NODE_TYPE,
		null,
		// eslint-disable-next-line @typescript-eslint/ban-types
	).singleNodeValue as HTMLTableElement | null;

	if (!table) {
		return {
			error: true,
			shouldLogOut: false,
			errorMsg: 'Could not find table with marks.',
		};
	}

	const {rows} = table;
	const marks: MarksRow[] = [];
	let allConfirmed = false;

	for (const row of rows) {
		const [course, name, date, mark] = [...row.children].map(child =>
			child.textContent?.trim(),
		);

		if (/sie haben alle noten bestätigt./i.test(course ?? '')) {
			allConfirmed = true;
			break;
		}

		if (course && name && date && mark) {
			marks.push({
				course,
				name,
				date,
				mark,
				key: uniqueId(),
			});
		}
	}

	const anchor = parsedFrontPage.evaluate(
		'//a' // Find all anchors
			+ '[contains(@class, "mdl-menu__item")]' // That have class "mdl-menu__item"
			+ '[contains(text(), "Abmelden")]', // That have text "Abmelden"
		parsedFrontPage.body,
		null,
		XPathResult.FIRST_ORDERED_NODE_TYPE,
		null,
		// eslint-disable-next-line @typescript-eslint/ban-types
	).singleNodeValue as HTMLAnchorElement | null;

	const logoutPath = anchor?.getAttribute('href');

	if (logoutPath) {
		// No awaiting, no error handling, since it's not too important
		GM_xmlhttpRequest({
			method: 'GET',
			url: `https://www.schul-netz.com/${page}/${logoutPath}`,
		});
	}

	return {
		error: false,
		marks: allConfirmed || marks.length === 0 ? undefined : marks,
	};
};
