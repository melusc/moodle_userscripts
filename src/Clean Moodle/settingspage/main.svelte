<script lang="ts">
	import {afterUpdate, createEventDispatcher} from 'svelte';

	import type {Course} from './course.js';

	export let selected: Course | undefined;

	const dispatch = createEventDispatcher<{
		input: string;
	}>();

	// Selected?.value can be false, in which case it should use courseName
	// This value is reactive, when `selected` changes it should change
	// put on input, it should also change.
	// Eslint is complaining because you should not assign to reactive variables
	// however I am unaware of a better way to handle this
	// eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
	$: value = (selected?.value || selected?.courseName) ?? '';

	let replaceInput: HTMLInputElement;

	let lastSelected: undefined | Course = undefined;

	afterUpdate(() => {
		if (replaceInput && lastSelected !== selected) {
			lastSelected = selected;

			replaceInput.focus();
			replaceInput.scrollIntoView({
				behavior: 'smooth',
				block: 'center',
				inline: 'center',
			});
		}
	});

	function handleSave() {
		if (selected !== undefined) {
			dispatch('input', value);
		}
	}
</script>

<div class="outer-main">
	<div class="main">
		<div class="section-title">Rename course</div>
		<form class="replace-flex-inputs" on:submit|preventDefault={handleSave}>
			<div>
				{selected === undefined
					? 'Select course to the left'
					: `Selected: ${selected.courseName}`}
			</div>
			<input
				class="replace-input"
				placeholder={selected === undefined
					? 'Select course to the left'
					: `Leave empty to reset to ${selected.courseName}`}
				disabled={selected === undefined}
				bind:this={replaceInput}
				{value}
				on:input={event => {
					// eslint-disable-next-line svelte/no-reactive-reassign
					value = event.currentTarget.value;
				}}
			/>
			<button class="btn-save" disabled={selected === undefined} type="submit">
				Save
			</button>
		</form>
	</div>
</div>
