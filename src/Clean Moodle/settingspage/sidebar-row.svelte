<script lang="ts">
	import {createEventDispatcher} from 'svelte';

	import ArrowBack from '../icons/arrow-back.svelte';
	import Check from '../icons/check.svelte';
	import X from '../icons/x.svelte';

	import type {Course} from './course.js';
	import {getName} from './util.js';

	export let course: Course;
	$: ({courseName, value, courseId} = course);

	const dispatch = createEventDispatcher<{
		select: Course;
		toggle: number;
		reset: number;
	}>();

	function reset() {
		dispatch('reset', courseId);
	}

	function toggle() {
		dispatch('toggle', courseId);
	}

	function select() {
		dispatch('select', course);
	}
</script>

<div
	class={`row${value === false ? ' removed' : ''}`}
	title={courseName}
	on:click={select}
	on:keydown|stopPropagation={event => {
		if (event.key === 'Enter') {
			select();
		}
	}}
>
	<span
		on:click|stopPropagation={toggle}
		on:keydown|stopPropagation={event => {
			if (event.key === 'Enter') {
				toggle();
			}
		}}
	>
		{#if value === false}
			<X />
		{:else}
			<Check />
		{/if}
	</span>
	{getName(value, courseName)}
	{#if typeof value === 'string'}
		<span
			on:click|stopPropagation={reset}
			on:keydown|stopPropagation={event => {
				if (event.key === 'Enter') {
					reset();
				}
			}}
		>
			<ArrowBack />
		</span>
	{/if}
</div>
