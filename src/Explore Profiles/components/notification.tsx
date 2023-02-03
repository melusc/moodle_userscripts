import type {FunctionalComponent, VNode} from 'preact';
// eslint-disable-next-line n/file-extension-in-import
import {createPortal} from 'preact/compat';
// eslint-disable-next-line n/file-extension-in-import
import {useEffect} from 'preact/hooks';

const notificationContainer = document.createElement('div');

const Portal: FunctionalComponent<{children: VNode}> = ({children}) => {
	useEffect(() => {
		document.body.append(notificationContainer);

		return () => {
			notificationContainer.remove();
		};
	}, []);

	return createPortal(children, notificationContainer);
};

export const Notification: FunctionalComponent<{
	from?: number;
	to?: number;
}> = ({from, to}) => {
	if (from === undefined) {
		return null;
	}

	if (to !== undefined && to < from) {
		[from, to] = [to, from];
	}

	return (
		<Portal>
			<div class='epr-notification'>
				<div class='epr-centered'>
					<div class='epr-spinner'>
						<div class='bounce1' />
						<div class='bounce2' />
						<div class='bounce3' />
					</div>
					<div class='epr-text-center'>
						{'Checking '}
						{from}
						{to !== undefined && to !== from && ` to ${to}`}
					</div>
				</div>
			</div>
		</Portal>
	);
};
