import {logout, popupGetToken} from '../shared/moodle-functions-v2';

import {getImageURL} from './image-urls';

import type {
	SanitizedContentFile,
	ContentsResponse,
	GetContentsResponseFailed,
} from './open-folders-inline';

let cachedPageContent: ContentsResponse[] | undefined;
const getPageContent = async (
	noCache = false,
): Promise<false | ContentsResponse[]> => {
	if (!noCache && cachedPageContent !== undefined) {
		return cachedPageContent;
	}

	const wstoken = await popupGetToken('Open folders inline');

	const searchParameters = new URLSearchParams(location.search);
	const courseId = searchParameters.get('id');

	if (!courseId) {
		console.error('CourseId was falsy:', searchParameters);

		return false;
	}

	const requestParameters = new URLSearchParams({
		courseid: courseId,
		'options[0][name]': 'includestealthmodules',
		'options[0][value]': '1',
		moodlewsrestformat: 'json',
		wsfunction: 'core_course_get_contents',
		wstoken,
	});

	const response = await fetch('/webservice/rest/server.php', {
		method: 'POST',
		headers: {
			'content-type': 'application/x-www-form-urlencoded',
		},
		body: requestParameters.toString(),
	});

	const responseJSON = (await response.json()) as
		| ContentsResponse[]
		| GetContentsResponseFailed;

	if (!Array.isArray(responseJSON) && 'exception' in responseJSON) {
		logout();
		return getPageContent();
	}

	cachedPageContent = responseJSON;
	return responseJSON;
};

const sanitizedFilePath = (path: string): string[] => {
	const split = path.trim().split(/\/+/);

	const result: string[] = [];

	for (const subPath of split) {
		if (subPath) {
			result.push(subPath);
		}
	}

	return result;
};

export const getSanitizedContents = async (
	sectionId: string,
	folderId: string,
	noCache?: boolean,
): Promise<false | SanitizedContentFile[]> => {
	const pageContentJSON = await getPageContent(noCache);

	if (pageContentJSON === false) {
		return false;
	}

	const sectionObject = pageContentJSON.find(
		({id}) => id === Number(sectionId),
	);

	if (!sectionObject) {
		console.error('Could not find sectionObject.');

		return false;
	}

	const {modules} = sectionObject;

	const folderObject = modules.find(({id}) => id === Number(folderId));

	if (!folderObject) {
		console.error('Could not find folderObject.');

		return false;
	}

	if (!('contents' in folderObject)) {
		console.warn('folderObject was a description.');

		return false;
	}

	const {contents} = folderObject;
	const sanitizedContents: SanitizedContentFile[] = [];

	for (const item of contents) {
		if ('isexternalfile' in item) {
			const {filepath, mimetype} = item;

			const fileUrl = new URL(item.fileurl, 'https://moodle.ksasz.ch');
			fileUrl.pathname = fileUrl.pathname.replace(/^\/webservice/, '');

			const imgPath = new URL(fileUrl.href);

			if (!mimetype.startsWith('image')) {
				imgPath.searchParams.set('preview', '1');
			}

			sanitizedContents.push({
				...item,
				filePath: sanitizedFilePath(filepath),
				imgPath: getImageURL(mimetype, imgPath.href),
				fileUrl: fileUrl.href,
			});
		}
	}

	return sanitizedContents;
};
