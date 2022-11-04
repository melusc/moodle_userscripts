import {Fragment, h, type FunctionalComponent, type VNode} from 'preact';
// eslint-disable-next-line n/file-extension-in-import
import {createPortal} from 'preact/compat';
// eslint-disable-next-line n/file-extension-in-import
import {useEffect} from 'preact/hooks';

const buttons = [
	['Previous profile', -1],
	['Next profile', 1],
	['Random profile', 'rand'],
	['-10 profiles', -10],
	['+10 profiles', 10],
] as const;

const buttonsParent = document.createElement('div');
buttonsParent.classList.add('btn-group');

const Portal: FunctionalComponent<{children: VNode[]}> = ({children}) => {
	const navbar = document.querySelector<HTMLUListElement>(
		'ul.navbar-nav.d-none.d-md-flex',
	);

	useEffect(() => {
		navbar?.after(buttonsParent);

		return () => {
			buttonsParent.remove();
		};
	}, [navbar]);

	if (!navbar) {
		return null;
	}

	// eslint-disable-next-line react/jsx-no-useless-fragment
	return createPortal(<>{children}</>, buttonsParent);
};

export const Navigate: FunctionalComponent<{
	navigate: (action: 'rand' | number) => void;
}> = ({navigate}) => (
	<Portal>
		{buttons.map(([text, action]) => (
			<button
				key={action}
				class='btn btn-secondary'
				type='button'
				onClick={() => {
					navigate(action);
				}}
			>
				{text}
			</button>
		))}
	</Portal>
);
