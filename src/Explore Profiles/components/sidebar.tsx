import {Fragment, h, type FunctionalComponent, type VNode} from 'preact';
// eslint-disable-next-line n/file-extension-in-import
import {createPortal} from 'preact/compat';
import {getSidebar} from '../../shared/general-functions/get-sidebar.js';

import type {LoadedState} from '../types.js';
import {clearNode} from '../utils.js';

// eslint-disable-next-line @typescript-eslint/ban-types
let li: HTMLLIElement | null | undefined;

const getLi = (): HTMLLIElement => {
	const foundLi = document.evaluate(
		'//li' // Get all li elements
			+ '[@class="type_system depth_2 contains_branch"]' // That have class "type_system depth_2 contains_branch"
			+ '[.//span[text()="Users"]]' // That have a span with text "Users"
			+ '[.//span[text()="Blogs"]]', // That have a span with text "Blogs"
		document.body,
		null,
		XPathResult.FIRST_ORDERED_NODE_TYPE,
		null,
		// eslint-disable-next-line @typescript-eslint/ban-types
	).singleNodeValue as HTMLLIElement | null;

	if (foundLi) {
		clearNode(foundLi);
		return foundLi;
	}

	const createdLi = document.createElement('li');

	createdLi.className = 'type_system depth_2 contains_branch';
	createdLi.setAttribute('aria-labelledby', 'label_2_34');
	createdLi.tabIndex = -1;
	createdLi.setAttribute('role', 'treeitem');
	createdLi.setAttribute('aria-expanded', 'true');

	const courseSidebar = getSidebar()?.parentElement?.parentElement;

	if (courseSidebar) {
		courseSidebar.append(createdLi);
	}

	return createdLi;
};

// eslint-disable-next-line @typescript-eslint/ban-types
const Portal: FunctionalComponent<{children: VNode[] | null}> = ({
	children,
}) => {
	li ??= getLi();

	// eslint-disable-next-line react/jsx-no-useless-fragment
	return createPortal(<>{children}</>, li);
};

export const Sidebar: FunctionalComponent<LoadedState> = ({
	isUserProfile,
	id,
	fullname,
	userId,
}) => {
	if (isUserProfile) {
		// Always clear the portal if it has never been rendered into
		return <Portal>{null}</Portal>;
	}

	return (
		<Portal>
			<p class='tree_item branch'>
				<span tabIndex={-1}>Users</span>
			</p>
			<ul role='group'>
				<li
					class='type_user depth_3 contains_branch current_branch'
					role='treeitem'
					aria-expanded='true'
					aria-owns='random8415_group'
					aria-labelledby='random4379_label_3_38'
				>
					<p class='tree_item branch active_tree_node'>
						<a
							tabIndex={-1}
							id='random4379_label_3_38'
							href={`/user/profile.php?id=${id}`}
						>
							{fullname}
						</a>
					</p>
					<ul id='random8415_group' role='group'>
						<li
							class='type_container depth_4 contains_branch'
							role='treeitem'
							aria-expanded='false'
							aria-owns='random1688_group'
							aria-labelledby='random2904_label_4_39'
						>
							<p class='tree_item branch'>
								<span tabIndex={-1} id='random2904_label_4_39'>
									Blogs
								</span>
							</p>
							<ul id='random1688_group' role='group' aria-hidden='true'>
								<li
									class='type_custom depth_5 item_with_icon'
									role='treeitem'
									aria-labelledby='random6359815fcb8b312_label_5_40'
								>
									<p class='tree_item hasicon'>
										<a
											tabIndex={-1}
											id='random6359815fcb8b312_label_5_40'
											href={`/blog/index.php?userid=${id}`}
										>
											<i
												class='icon fa fa-square fa-fw navicon'
												aria-hidden='true'
											/>
											<span class='item-content-wrap'>
												View all entries by {fullname}
											</span>
										</a>
									</p>
								</li>
							</ul>
						</li>
						<li
							class='type_setting depth_4 item_with_icon'
							role='treeitem'
							aria-labelledby='random2904_label_4_41'
						>
							<p class='tree_item hasicon'>
								<a
									tabIndex={-1}
									id='random2904_label_4_41'
									href={`/message/index.php?user1=${userId}&user2=${id}`}
								>
									<i
										class='icon fa fa-square fa-fw navicon'
										aria-hidden='true'
									/>
									<span class='item-content-wrap'>Messages</span>
								</a>
							</p>
						</li>
					</ul>
				</li>
			</ul>
		</Portal>
	);
};
