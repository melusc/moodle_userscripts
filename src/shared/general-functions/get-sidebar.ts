export const getSidebar = () =>
	document.querySelector<HTMLUListElement>(
		'li[aria-labelledby$="label_2_4"] ul[role="group"]',
	);
