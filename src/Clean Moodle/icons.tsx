import type {FunctionalComponent} from 'preact';

export const SvgCheck: FunctionalComponent = () => (
	<svg
		fill='none'
		stroke='currentColor'
		stroke-linecap='round'
		stroke-linejoin='round'
		stroke-width='2'
		class='icon svg-icon-check'
		viewBox='0 0 24 24'
	>
		<path d='m5 12 5 5L20 7' />
	</svg>
);
export const SvgX: FunctionalComponent = () => (
	<svg
		fill='none'
		stroke='currentColor'
		stroke-linecap='round'
		stroke-linejoin='round'
		stroke-width='2'
		class='icon svg-icon-x'
		viewBox='0 0 24 24'
	>
		<path d='M18 6 6 18M6 6l12 12' />
	</svg>
);
export const SvgArrowBack: FunctionalComponent = () => (
	<svg
		fill='none'
		stroke='currentColor'
		stroke-linecap='round'
		stroke-linejoin='round'
		stroke-width='2'
		class='icon svg-icon-arrow-back'
		viewBox='0 0 24 24'
	>
		<path d='m9 11-4 4 4 4m-4-4h11a4 4 0 0 0 0-8h-1' />
	</svg>
);
