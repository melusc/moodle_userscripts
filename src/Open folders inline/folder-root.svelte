<script lang="ts">
	import FolderIcon from './folder-icon.svelte';
	import type {SanitizedContentFile} from './page-content.js';
	import {cleanHref, getEntries} from './util.js';

	export let contents: SanitizedContentFile[];
	export let directoryDepth: number;
	export let base: string | undefined = undefined;
	export let isParent: boolean;

	let isHidden = !isParent;
	$: shouldHide = isHidden && !isParent;

	$: ({root, entries} = getEntries(contents, directoryDepth));

	function toggle() {
		isHidden = !isHidden;
	}
</script>

{#if !isParent}
	<FolderIcon {isHidden} {base} on:click={toggle} />
{/if}

{#if !shouldHide}
	<ul style:list-style="none">
		{#each entries as [key, value] (key)}
			<li>
				<svelte:self
					contents={value}
					base={key}
					directoryDepth={directoryDepth + 1}
				/>
			</li>
		{/each}
		{#each root ?? [] as {fileUrl, filename, imgPath} (filename)}
			<li>
				<span class="fp-filename-icon">
					<a href={cleanHref(fileUrl)}>
						<span class="fp-icon">
							<img alt="" title={filename} src={imgPath} />
						</span>
						<span class="fp-filename">{filename}</span>
					</a>
				</span>
			</li>
		{/each}
	</ul>
{/if}
