<script lang="ts">
	import type {Course} from './course.js';
	import SidebarRow from './sidebar-row.svelte';

	export let courses: Course[];
	export let loadingCourses: boolean;
</script>

<div class="outer-sidebar">
	<div class="sidebar">
		{#if loadingCourses}
			<div>Loading courses...</div>{/if}

		{#each courses as course (course.courseId)}
			<SidebarRow {course} on:select on:toggle on:reset />
		{/each}
	</div>
</div>
