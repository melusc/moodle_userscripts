import type {
	CourseContent,
	FolderContent,
	FolderModule,
} from '../shared/moodle-functions-v3/course-content.d.js';
import {getCourseContent} from '../shared/moodle-functions-v3/get-course-content.js';
import {Moodle} from '../shared/moodle-functions-v3/moodle.js';
import {popupLogin} from '../shared/moodle-functions-v3/popup-login-svelte.js';

import {getImageURL} from './image-urls.js';

export type SanitizedContentFile = FolderContent & {
	filePath: string[];
	fileUrl: string;
	imgPath: string;
};

Moodle.extend(popupLogin).extend(getCourseContent);
const moodle = new Moodle();

const getPageContent = async (
	useCache: boolean,
): Promise<false | CourseContent[]> => {
	const searchParameters = new URLSearchParams(location.search);
	const courseId = searchParameters.get('id');

	if (!courseId) {
		console.error('Could not extract courseId "%s"', searchParameters);

		return false;
	}

	try {
		return await moodle.getCourseContent(courseId, useCache);
	} catch {
		await moodle.popupLogin('Open folders inline', true);
		return moodle.getCourseContent(courseId, useCache);
	}
};

const sanitizedFilePath = (path: string): string[] =>
	path.trim().split(/\/+/).filter(Boolean);

export const getSanitizedContents = async (
	sectionId: string,
	folderId: string,
	allowCached: boolean,
): Promise<false | SanitizedContentFile[]> => {
	const pageContentJSON = await getPageContent(allowCached);

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

	const folderObject = modules.find(
		({id, modname}) => modname === 'folder' && id === Number(folderId),
	) as FolderModule | undefined;

	if (!folderObject) {
		console.error('Could not find folderObject.');

		return false;
	}

	const {contents} = folderObject;
	const sanitizedContents: SanitizedContentFile[] = [];

	for (const item of contents) {
		if (item.type === 'file') {
			const {filepath, mimetype} = item;

			const fileUrl = moodle.resolveUrl(item.fileurl);
			fileUrl.pathname = fileUrl.pathname.replace(/^\/webservice/, '');

			const imgPath = new URL(fileUrl.href);

			if (!mimetype?.startsWith('image')) {
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
