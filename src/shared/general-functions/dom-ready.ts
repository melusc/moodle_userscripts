export const domReady = (cb: () => void) => {
	if (
		document.readyState === 'interactive'
		|| document.readyState === 'complete'
	) {
		cb();
		return;
	}

	document.addEventListener('DOMContentLoaded', cb, {once: true});
};
