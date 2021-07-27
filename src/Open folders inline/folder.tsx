import {h, Fragment, JSX} from 'preact';
import {useEffect, useState} from 'preact/hooks';

import {SanitizedContentFile} from './open-folders-inline';
import {getSanitizedContents} from './page-content';

const folderRefreshSetStates: Record<string, () => void> = {};
export const refreshFolderById = (folderId: string) => {
	folderRefreshSetStates[folderId]?.();
};

const folderVisibilitySetStates: Record<string, () => void> = {};
export const toggleFolderVisibilityById = (folderId: string): boolean => {
	folderVisibilitySetStates[folderId]?.();

	return folderId in folderVisibilitySetStates;
};

const FolderRoot = ({
	contents,
	directoryDepth = 0,
	base,
	isParent = false,
}: {
	contents: SanitizedContentFile[];
	directoryDepth?: number;
	base?: string;
	isParent?: boolean;
}) => {
	const [isHidden, setHidden] = useState(!isParent);

	const filePaths: Record<string, SanitizedContentFile[]> = {};

	for (const item of contents) {
		if ('isexternalfile' in item) {
			const path = item.filePath[directoryDepth] ?? '/';

			const filePathArray = filePaths[path] ?? (filePaths[path] = []);

			filePathArray.push(item);
		}
	}

	const localeCompareOptions: Intl.CollatorOptions = {
		sensitivity: 'base',
		numeric: true,
	};
	const root = filePaths['/'];
	root?.sort((a, b) =>
		a.filename
			.trim()
			.localeCompare(b.filename.trim(), undefined, localeCompareOptions),
	);

	delete filePaths['/'];

	const entries = Object.entries(filePaths);
	entries.sort(([a], [b]) =>
		a.trim().localeCompare(b.trim(), undefined, localeCompareOptions),
	);

	const handleClick: JSX.MouseEventHandler<HTMLElement> = event_ => {
		event_.stopPropagation();

		setHidden(isHidden => !isHidden);
	};

	const shouldHide = isHidden && !isParent;

	return (
		<>
			{!isParent && (
				<div class="fp-filename-icon folders-inline-icon" onClick={handleClick}>
					<div class="folders-inline-icon-div">
						<i
							class={`icon fa ${
								isHidden ? 'fa-caret-right' : 'fa-caret-down'
							} fa-fw navicon folders-inline-caret`}
						/>
						<img
							alt=""
							class="iconlarge activityicon"
							role="presentation"
							title={base}
							aria-hidden="true"
							src="/theme/image.php/classic/core/1601902087/f/folder-128"
						/>
					</div>
					<span class="fp-filename">{base}</span>
				</div>
			)}
			{!shouldHide && (
				<ul style={{listStyle: 'none'}}>
					{entries.map(([key, value]) => (
						<li key={key}>
							<FolderRoot
								contents={value}
								base={key}
								directoryDepth={directoryDepth + 1}
							/>
						</li>
					))}
					{root?.map(({fileUrl, filename, imgPath}) => (
						<li key={filename}>
							<span class="fp-filename-icon">
								<a href={fileUrl}>
									<span class="fp-icon">
										<img alt="" title={filename} src={imgPath} />
									</span>
									<span class="fp-filename">{filename}</span>
								</a>
							</span>
						</li>
					))}
				</ul>
			)}
		</>
	);
};

export const Folder = ({
	folderId,
	sectionId,
}: {
	folderId: string;
	sectionId: string;
}) => {
	const [contents, setContents] = useState<undefined | SanitizedContentFile[]>(
		undefined,
	);

	const [isHidden, setIsHidden] = useState(false);

	useEffect(() => {
		const updateContents = async (noCache?: boolean) => {
			const contents = await getSanitizedContents(sectionId, folderId, noCache);
			if (contents) {
				setContents(contents);
				setIsHidden(false);
			}
		};

		folderRefreshSetStates[folderId] = () => {
			setContents(undefined);
			setIsHidden(false);
			void updateContents(true);
		};

		folderVisibilitySetStates[folderId] = () => {
			setIsHidden(isHidden => !isHidden);
		};

		void updateContents();
	}, [folderId, sectionId]);

	if (isHidden) {
		return null;
	}

	return contents ? (
		<FolderRoot isParent contents={contents} />
	) : (
		<div class="folder-loading">Loading</div>
	);
};
