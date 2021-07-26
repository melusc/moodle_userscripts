import {h, Fragment, JSX} from 'preact';
import {useEffect, useState} from 'preact/hooks';

import {SanitizedContentFile} from './open-folders-inline';
import {getSanitizedContents} from './page-content';

const folderSetStates: Record<string, () => void> = {};

export const refreshByFolderId = (folderId: string) => {
	folderSetStates[folderId]?.();
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

	useEffect(() => {
		const updateContents = async (noCache?: boolean) => {
			const contents = await getSanitizedContents(sectionId, folderId, noCache);
			if (contents) {
				setContents(contents);
			}
		};

		folderSetStates[folderId] = () => {
			setContents(undefined);
			void updateContents(true);
		};

		void updateContents();
	}, [folderId, sectionId]);

	return contents ? <FolderRoot isParent contents={contents} /> : null;
};
