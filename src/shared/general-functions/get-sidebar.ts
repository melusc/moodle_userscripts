export const getSidebar = () =>
	document.querySelector<HTMLUListElement>(
		'#page-content li.type_system.depth_2 > ul[role="group"]',
	);
