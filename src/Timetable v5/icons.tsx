import {h, type FunctionalComponent, type JSX} from 'preact';

type SvgAttributes = JSX.HTMLAttributes<SVGSVGElement>;

export const SvgIconX: FunctionalComponent<SvgAttributes> = props => (
	<svg {...props} viewBox='0 0 512 512'>
		<path
			stroke='currentColor'
			stroke-linecap='round'
			stroke-width='32'
			d='M368 368 144 144m224 0L144 368'
		/>
	</svg>
);
export const SvgIconCaretBack: FunctionalComponent<SvgAttributes> = props => (
	<svg {...props} viewBox='0 0 512 512'>
		<path
			fill='currentColor'
			d='M321.94 98 158.82 237.78a24 24 0 0 0 0 36.44L321.94 414c15.57 13.34 39.62 2.28 39.62-18.22v-279.6c0-20.5-24.05-31.56-39.62-18.18z'
		/>
	</svg>
);
export const SvgIconCaretForward: FunctionalComponent<
	SvgAttributes
> = props => (
	<svg {...props} viewBox='0 0 512 512'>
		<path
			fill='currentColor'
			d='m190.06 414 163.12-139.78a24 24 0 0 0 0-36.44L190.06 98c-15.57-13.34-39.62-2.28-39.62 18.22v279.6c0 20.5 24.05 31.56 39.62 18.18z'
		/>
	</svg>
);

export const SvgIconAdd: FunctionalComponent<SvgAttributes> = props => (
	<svg {...props} viewBox='0 0 512 512'>
		<path
			stroke='currentColor'
			stroke-linecap='round'
			stroke-width='32'
			d='M256 112v288m144-144H112'
		/>
	</svg>
);
