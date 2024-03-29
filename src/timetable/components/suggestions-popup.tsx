import type {FunctionalComponent} from 'preact';

import {numericBaseSensitiveCollator} from '../../shared/general-functions/intl-collator.js';
import type {Course, SettingsPageState} from '../settingspage.d.js';

const filterCourses = (array: Course[], inputText: string) => {
	const result = [];
	inputText = inputText.toLowerCase();

	for (const item of array) {
		if (item.name.toLowerCase().includes(inputText)) {
			result.push({
				...item,
				index: item.name.indexOf(inputText),
			});
		}
	}

	return result.sort(
		(a, b) =>
			a.index - b.index
			|| numericBaseSensitiveCollator.compare(a.name, b.name)
			|| Number(a.id) - Number(b.id),
	);
};

const SuggestionsPopup: FunctionalComponent<{
	courses: Course[];
	focusedElement: SettingsPageState['focusedElement'];
	onClick: (id: string) => void;
}> = ({courses, focusedElement, onClick}) => {
	if (focusedElement === undefined) {
		return null;
	}

	const {left, height, top} = focusedElement;
	const inputText = focusedElement.inputText.trim().toLowerCase();

	if (inputText === '') {
		return null;
	}

	return (
		<div
			class='suggestions'
			style={{transform: `translate(${left}px, ${top + height}px)`}}
		>
			{filterCourses(courses, inputText).map(({id, name}) => {
				const index = name.toLowerCase().indexOf(inputText);
				const before = name.slice(0, index);

				const after = name.slice(index + inputText.length);
				const emphasised = name.slice(index, index + inputText.length);

				return (
					<div
						key={id}
						class='suggestion'
						onMouseDown={() => {
							/* MouseDown because otherwise the event listener
								 in settingspage for `focusout` will fire first and
								 remove this before `onClick` even fires
								 MouseDown fires before focusout */
							onClick(id);
						}}
					>
						<div class='suggestion-name'>
							{before}
							<span class='emphasised'>{emphasised}</span>
							{after}
						</div>
						<div class='suggestion-id'>{id}</div>
					</div>
				);
			})}
		</div>
	);
};

export default SuggestionsPopup;
