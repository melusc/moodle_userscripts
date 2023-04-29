<script lang="ts">
	import {onMount} from 'svelte';

	import RefreshIcon from './refresh-icon.svelte';
	import {
		getSanitizedContents,
		type SanitizedContentFile,
	} from './page-content.js';
	import FolderRoot from './folder-root.svelte';

	export let folderId: string;
	export let sectionId: string;
	export let anchor: HTMLElement;

	let contents: undefined | SanitizedContentFile[];
	let isHidden = false;

	onMount(() => {
		void fetchContents(true);
	});

	let previousAnchor: HTMLElement | undefined = undefined;
	$: {
		if (previousAnchor !== anchor) {
			previousAnchor?.removeEventListener('click', anchorClickHandler);
		}

		previousAnchor = anchor;
		anchor.addEventListener('click', anchorClickHandler);
	}

	async function fetchContents(allowCached: boolean) {
		contents = undefined;
		const result = await getSanitizedContents(sectionId, folderId, allowCached);

		if (result) {
			contents = result;
		}
	}

	function anchorClickHandler(event: MouseEvent): void {
		if (event.ctrlKey) {
			return;
		}

		event.preventDefault();
		event.stopImmediatePropagation();

		isHidden = !isHidden;
	}
</script>

{#if !isHidden}
	{#if !contents}
		<div class="folder-loading">Loading</div>
	{:else if contents.length === 0}
		<div class="folder-empty">The folder was empty</div>
	{:else}
		<FolderRoot directoryDepth={0} isParent {contents} />
	{/if}

	<RefreshIcon
		target={anchor}
		on:click={() => {
			void fetchContents(false);
		}}
	/>
{/if}
