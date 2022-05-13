import {Except} from 'type-fest';

import {
	CourseContent,
	ModuleFileContent,
	Moodle,
	popupLogin,
	getCourseContent,
} from '../shared/moodle-functions-v3/index';

import {getImageURL} from './image-urls';

export type SanitizedContentFile = Except<
	ModuleFileContent,
	'filepath' | 'fileurl'
> & {
	filePath: string[]; // Different case than ContentIsFile, to indicate that it gets modified
	fileUrl: string; // ^
	imgPath: string;
};

Moodle.extend(popupLogin).extend(getCourseContent);
const moodle = new Moodle();

const getPageContent = async (
	noCache?: boolean,
): Promise<false | CourseContent[]> => {
	const searchParameters = new URLSearchParams(location.search);
	const courseId = searchParameters.get('id');

	if (!courseId) {
		console.error('Could not extract courseId "%s"', searchParameters);

		return false;
	}

	try {
		return await moodle.getCourseContent(courseId, noCache);
	} catch {
		await moodle.popupLogin('Open folders inline');
		return moodle.getCourseContent(courseId, noCache);
	}
};

const sanitizedFilePath = (path: string): string[] =>
	path.trim().split(/\/+/).filter(Boolean);

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
		if (item.type === 'file') {
			const {filepath, mimetype} = item;

			const fileUrl = new URL(item.fileurl, 'https://moodle.ksasz.ch');
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
