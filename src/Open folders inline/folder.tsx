import {h, Fragment, JSX, FunctionalComponent} from 'preact';
import {createPortal} from 'preact/compat';
import {useEffect, useState} from 'preact/hooks';

import {numericBaseSensitiveCollator} from '../shared/general-functions';

import {SanitizedContentFile} from './open-folders-inline';
import {getSanitizedContents} from './page-content';
import {RefreshIcon} from './refresh-icon';

const FolderIcon: FunctionalComponent<{
	isHidden: boolean;
	base: string | undefined;
	handleClick: JSX.MouseEventHandler<HTMLDivElement>;
}> = ({isHidden, base, handleClick}) => (
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
);

const FolderRoot: FunctionalComponent<{
	contents: SanitizedContentFile[];
	directoryDepth?: number;
	base?: string;
	isParent?: boolean;
}> = ({contents, directoryDepth = 0, base, isParent = false}) => {
	const [isHidden, setHidden] = useState(!isParent);

	const filePaths: Record<string, SanitizedContentFile[]> = {};

	for (const item of contents) {
		if ('isexternalfile' in item) {
			const path = item.filePath[directoryDepth] ?? '/';

			const filePathArray = filePaths[path] ?? (filePaths[path] = []);

			filePathArray.push(item);
		}
	}

	const root = filePaths['/'];
	root?.sort((a, b) =>
		numericBaseSensitiveCollator.compare(a.filename.trim(), b.filename.trim()),
	);

	delete filePaths['/'];

	const entries = Object.entries(filePaths);
	entries.sort(([keyA], [keyB]) =>
		numericBaseSensitiveCollator.compare(keyA.trim(), keyB.trim()),
	);

	const handleClick: JSX.MouseEventHandler<HTMLDivElement> = event_ => {
		event_.stopPropagation();

		setHidden(isHidden => !isHidden);
	};

	const shouldHide = isHidden && !isParent;

	return (
		<>
			{!isParent && (
				<FolderIcon isHidden={isHidden} base={base} handleClick={handleClick} />
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

export const Folder: FunctionalComponent<{
	folderId: string;
	sectionId: string;
	anchor: HTMLElement;
}> = ({folderId, sectionId, anchor}) => {
	const [contents, setContents] = useState<undefined | SanitizedContentFile[]>(
		undefined,
	);

	const [isHidden, setIsHidden] = useState(false);

	useEffect(() => {
		const handler = (event: MouseEvent): void => {
			event.preventDefault();
			event.stopImmediatePropagation();

			setIsHidden(h => !h);
		};

		anchor.addEventListener('click', handler);

		return () => {
			anchor.removeEventListener('click', handler);
		};
	}, [anchor]);

	const fetchContents = async (
		folderId: string,
		sectionId: string,
		noCache?: boolean,
	) => {
		const contents = await getSanitizedContents(sectionId, folderId, noCache);

		if (contents) {
			setContents(contents);
			setIsHidden(false);
		}
	};

	useEffect(() => {
		void fetchContents(folderId, sectionId);
	}, [folderId, sectionId]);

	if (isHidden) {
		return null;
	}

	if (!contents) {
		return <div class="folder-loading">Loading</div>;
	}

	return (
		<>
			{contents.length === 0 ? (
				<div class="folder-empty">The folder was empty</div>
			) : (
				<FolderRoot isParent contents={contents} />
			)}
			{contents !== undefined
				&& createPortal(
					<RefreshIcon
						onClick={() => {
							setContents(undefined);
							setIsHidden(false);
							void fetchContents(folderId, sectionId, true);
						}}
					/>,
					anchor,
				)}
		</>
	);
};
