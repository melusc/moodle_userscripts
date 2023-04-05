<script lang="ts">
	import {createEventDispatcher} from 'svelte';

	export let isHidden: boolean;
	export let base: string | undefined;

	const dispatch = createEventDispatcher<{click: void}>();

	function handleClick() {
		dispatch('click');
	}
</script>

<div
	class="fp-filename-icon folders-inline-icon"
	on:click|preventDefault|stopPropagation={handleClick}
	on:keydown={event => {
		if (event.key === 'Enter') {
			event.preventDefault();
			event.stopPropagation();
			handleClick();
		}
	}}
>
	<div class="folders-inline-icon-div">
		<i
			class="icon fa fa-fw navicon folders-inline-caret"
			class:fa-caret-right={isHidden}
			class:fa-caret-down={!isHidden}
		/>
		<img
			alt=""
			class="iconlarge activityicon"
			role="presentation"
			title={base}
			aria-hidden="true"
			src="/theme/image.php/classic/core/1601902087/f/folder-128"
		/>
	</div>
	<span class="fp-filename">{base}</span>
</div>
