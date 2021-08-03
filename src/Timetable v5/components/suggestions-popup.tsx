import {h} from 'preact';
import {numericBaseSensitiveCollator} from '../../shared/general-functions';

import {Course, SettingsPageState} from '../settingspage.d';

const filterCourses = (array: Course[], inputText: string) => {
	const result = [];
	const regex = new RegExp(inputText, 'i');

	for (const item of array) {
		if (regex.test(item.name)) {
			result.push({
				...item,
				index: item.name.search(regex),
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

const SuggestionsPopup = ({
	courses,
	focusedElement,
	onClick,
}: {
	courses: Course[];
	focusedElement: SettingsPageState['focusedElement'];
	onClick: (id: string) => void;
}) => {
	if (focusedElement === undefined) {
		return null;
	}

	const {left, height, top} = focusedElement;
	const inputText = focusedElement.inputText.trim().toLowerCase();

	return (
		<div
			class="suggestions"
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
						class="suggestion"
						onClick={() => {
							onClick(id);
						}}
					>
						<div class="suggestion-name">
							{before}
							<span class="emphasised">{emphasised}</span>
							{after}
						</div>
						<div class="suggestion-id">{id}</div>
					</div>
				);
			})}
		</div>
	);
};

export default SuggestionsPopup;
