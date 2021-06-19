// ==UserScript==
// @name      Moodle open folders inline preact
// @version   2021.05.29a
// @author    lusc
// @include   https://moodle.ksasz.ch/course/view.php?id=*
// @updateURL https://git.io/Jqlt0
// @grant     GM_setValue
// @grant     GM_getValue
// @grant     GM_deleteValue
// @grant     GM_addStyle
// @run-at    document-start
// ==/UserScript==

import {render, Fragment, h} from 'preact';
import {login, logout, setLastValidatedToken} from '../shared/moodle-functions';

import type {
	GetContentsResponse,
	GetContentsResponseFailed,
	GetContentsModuleContentsIsFileSanitized
} from './open-folders-inline.d';

import style from './style.scss';

GM_addStyle(style);

const getPageContent = async (noCache = false) =>
	login(noCache).then(
		async (wstoken): Promise<false | GetContentsResponse[]> => {
			const courseId = new URLSearchParams(location.search).get('id');

			if (!courseId) {
				return false;
			}

			const requestParameters = new URLSearchParams({
				courseid: courseId,
				'options[0][name]': 'includestealthmodules',
				'options[0][value]': '1',
				moodlewsrestformat: 'json',
				wsfunction: 'core_course_get_contents',
				wstoken
			});

			return fetch('/webservice/rest/server.php', {
				method: 'POST',
				headers: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				body: requestParameters.toString()
			})
				.then(
					async (
						response
					): Promise<GetContentsResponse[] | GetContentsResponseFailed> =>
						response.json()
				)
				.then(responseJSON => {
					if (!Array.isArray(responseJSON) && 'exception' in responseJSON) {
						logout();
						return getPageContent(true);
					}

					setLastValidatedToken();
					return responseJSON;
				});
		}
	);

const generateImageURL = (() => {
	const imageURLs: Record<string, string> = {
		'application/pdf': 'pdf-256',
		'application/zip': 'archive-256',
		'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
			'document-256',
		'application/msword': 'document-256',
		'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
			'spreadsheet-256',
		'application/vnd.ms-excel': 'spreadsheet-256',
		'application/vnd.openxmlformats-officedocument.presentationml.presentation':
			'powerpoint-256',
		'application/vnd.ms-powerpoint': 'powerpoint-256',

		'text/plain': 'sourcecode-256',

		'audio/mp3': 'mp3-256',
		'audio/mp4': 'mp3-256',
		'video/quicktime': 'quicktime-256',
		'video/mp4': 'mpeg-256'

		/* I'm copying moodle by using these
			 urls for the various mimetypes,
			 I found all these in moodle and
			 got them from there */
	};

	return (mimetype: string, defaultValue: string) => {
		const icon = imageURLs[mimetype];
		if (icon) {
			return `/theme/image.php/classic/core/1601902087/f/${icon}`;
		}

		return defaultValue;
	};
})();

const sanitizedFilePath = (path: string) => {
	const split = path.trim().split('/');

	const sanitized: string[] = [];

	for (const item of split) {
		if (item) {
			sanitized.push(item);
		}
	}

	return sanitized;
};

const Folder = ({
	contents,
	base,
	directoryDepth = 0
}: {
	contents: GetContentsModuleContentsIsFileSanitized[];
	base?: string;
	directoryDepth?: number;
}) => {
	const filePaths: Record<string, GetContentsModuleContentsIsFileSanitized[]> =
		{
			'/': []
		};

	for (const item of contents) {
		if ('isexternalfile' in item) {
			const path = item.filepath[directoryDepth] ?? '/';

			const filePathArray = filePaths[path] ?? (filePaths[path] = []);

			filePathArray.push(item);
		}
	}

	const root = filePaths['/'];
	if (root) {
		root.sort((a, b) => {
			const aL = a.filename.toLowerCase();
			const bL = b.filename.toLowerCase();

			return aL < bL ? -1 : (aL > bL ? 1 : 0);
		});

		delete filePaths['/'];
	}

	const entries = Object.entries(filePaths).sort((a, b) => {
		const aL = a[0].toLowerCase();
		const bL = b[0].toLowerCase();

		return aL < bL ? -1 : (aL > bL ? 1 : 0);
	});

	return (
		<>
			{typeof base === 'string' && (
				<div class="fp-filename-icon folders-inline-icon">
					<div class="folders-inline-icon-div">
						<i class="icon fa fa-caret-right fa-fw navicon folders-inline-caret"/>
						<img
							class="iconlarge activityicon"
							alt={base}
							role="presentation"
							title={base}
							aria-hidden="true"
							src="/theme/image.php/classic/core/1601902087/f/folder-128"
						/>
					</div>
					<span class="fp-filename">{base}</span>
				</div>
			)}

			<ul style={{listStyle: 'none'}} hidden={Boolean(base)}>
				{entries.map(([key, value]) => (
					<li key={key}>
						<Folder
							contents={value}
							base={key}
							directoryDepth={directoryDepth + 1}
						/>
					</li>
				))}
				{root?.map(({fileurl, mimetype, filename}) => {
					const fileURL = new URL(fileurl, 'https://moodle.ksasz.ch');
					fileURL.pathname = fileURL.pathname.replace(/^\/webservice/, '');

					const imgPath = new URL(fileURL.href);

					if (!mimetype.startsWith('image')) {
						imgPath.searchParams.set('preview', '1');
					}

					return (
						<li key={filename}>
							<span class="fp-filename-icon">
								<a href={fileURL.href}>
									<span class="fp-icon">
										<img
											alt={filename}
											title={filename}
											src={generateImageURL(mimetype, imgPath.href)}
										/>
									</span>
									<span class="fp-filename">{filename}</span>
								</a>
							</span>
						</li>
					);
				})}
			</ul>
		</>
	);
};

const handleClick = (() => {
	let pageContent: ReturnType<typeof getPageContent> | undefined;

	return (event_: MouseEvent) => {
		if (!(event_.target instanceof Element)) {
			return;
		}

		const anchor = event_.target.closest('a');
		const icon = anchor?.querySelector<SVGSVGElement>('svg.svg-refresh')
			?.parentNode as HTMLSpanElement | null;
		const folder = anchor?.closest<HTMLLIElement>('li.activity.folder');
		const subFolder = event_.target.closest<HTMLDivElement>(
			'div.fp-filename-icon'
		);

		if (subFolder) {
			const subFolderContent = subFolder.nextElementSibling as HTMLUListElement;

			subFolderContent.hidden = !subFolderContent.hidden;
			const caretIcon = subFolder.querySelector<HTMLElement>(
				'.folders-inline-caret'
			);
			if (caretIcon) {
				caretIcon.classList.toggle('fa-caret-right');
				caretIcon.classList.toggle('fa-caret-down');
			}

			event_.preventDefault();
			event_.stopPropagation();
			return;
		}

		if (event_.target.closest('span') === icon) {
			event_.preventDefault();
			event_.stopPropagation();
			folder?.lastElementChild?.remove();
			pageContent = undefined;
			anchor?.click();
			return;
		}

		if (anchor?.pathname === '/mod/folder/view.php' && folder) {
			if (event_.ctrlKey) {
				return;
			}

			event_.preventDefault();
			event_.stopPropagation();

			if (folder.childElementCount > 1) {
				folder.lastElementChild?.remove();
				icon?.remove();
				return;
			}

			if (!icon) {
				const refresh = document.createElement('span');
				render(
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="currentColor"
						aria-hidden="true"
						class="icon navicon svg-refresh"
						style={{marginLeft: 5}}
						viewBox="0 0 512 512"
					>
						<path d="M370.72 133.28C339.458 104.008 298.888 87.962 255.848 88c-77.458.068-144.328 53.178-162.791 126.85-1.344 5.363-6.122 9.15-11.651 9.15H24.103c-7.498 0-13.194-6.807-11.807-14.176C33.933 94.924 134.813 8 256 8c66.448 0 126.791 26.136 171.315 68.685L463.03 40.97C478.149 25.851 504 36.559 504 57.941V192c0 13.255-10.745 24-24 24H345.941c-21.382 0-32.09-25.851-16.971-40.971l41.75-41.749zM32 296h134.059c21.382 0 32.09 25.851 16.971 40.971l-41.75 41.75c31.262 29.273 71.835 45.319 114.876 45.28 77.418-.07 144.315-53.144 162.787-126.849 1.344-5.363 6.122-9.15 11.651-9.15h57.304c7.498 0 13.194 6.807 11.807 14.176C478.067 417.076 377.187 504 256 504c-66.448 0-126.791-26.136-171.315-68.685L48.97 471.03C33.851 486.149 8 475.441 8 454.059V320c0-13.255 10.745-24 24-24z"/>
					</svg>,
					refresh
				);
				anchor.append(refresh);
			}

			if (!pageContent) {
				pageContent = getPageContent();
			}

			void pageContent.then(pageContentJSON => {
				if (pageContentJSON === false) {
					console.error('pageContentJSON was false.');

					return;
				}

				const section = anchor.closest('li.section.main');
				const sectionId = section
					?.getAttribute('aria-labelledby')
					?.match(/(?<=-)\d+(?=-)/)?.[0];

				if (!sectionId) {
					console.error('sectionId was undefined.');

					return;
				}

				const sectionObject = pageContentJSON.find(
					({id}) => id === Number(sectionId)
				);

				if (!sectionObject) {
					console.error('Could not find sectionObject.');

					return;
				}

				const {modules} = sectionObject;

				const folderId = /\d+$/.exec(folder.id)?.[0];

				if (!folderId) {
					console.error('Could not get folderId.');

					return;
				}

				const folderObject = modules.find(({id}) => id === Number(folderId));

				if (!folderObject) {
					console.error('Could not find folderObject.');

					return;
				}

				if (!('contents' in folderObject)) {
					console.info('folderObject was a description.');

					return;
				}

				const {contents} = folderObject;

				const sanitizedContents: GetContentsModuleContentsIsFileSanitized[] =
					[];

				for (const item of contents) {
					if ('isexternalfile' in item) {
						sanitizedContents.push({
							...item,
							filepath: sanitizedFilePath(item.filepath)
						});
					}
				}

				const frag = document.createDocumentFragment();

				render(<Folder contents={sanitizedContents}/>, frag);

				folder.append(frag);
			});
		}
	};
})();

const init = () => {
	document
		.querySelector<HTMLUListElement>('div.course-content > ul.topics')
		?.addEventListener('click', handleClick);
};

if (document.readyState === 'complete') {
	init();
} else {
	addEventListener('DOMContentLoaded', init, {once: true});
}
