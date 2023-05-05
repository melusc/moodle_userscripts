<script lang="ts">
	import {
		getCourses as getCoursesMoodle,
		type Courses,
	} from '../../shared/moodle-functions-v3/get-courses.js';
	import {Moodle} from '../../shared/moodle-functions-v3/moodle.js';
	import {getValue, removeElementFromStorage, setValue} from '../shared.js';

	import type {Course} from './course.js';
	import LoggedOut from './logged-out.svelte';
	import Main from './main.svelte';
	import Sidebar from './sidebar.svelte';
	import {sortCoursesArray} from './util.js';

	let courses: Course[] = [];
	let loadingCourses = true;
	let selected: undefined | Course;
	let loggedOut = false;

	Moodle.extend(getCoursesMoodle);

	const moodle = new Moodle();

	async function getCourses() {
		let ajaxCourses: Courses;
		try {
			ajaxCourses = await moodle.getCourses();
		} catch {
			logout();

			return;
		}

		const coursesExtended: Course[] = [];

		for (const {id, name} of ajaxCourses) {
			coursesExtended.push({
				courseName: name,
				courseId: id,
				value: getValue(id),
			});
		}

		sortCoursesArray(coursesExtended);

		courses = coursesExtended;
		loadingCourses = false;
	}

	function logout() {
		moodle.logout();

		loggedOut = true;
	}

	async function handleLogin(
		event: CustomEvent<{
			username: string;
			password: string;
		}>,
	) {
		const username = event.detail.username.trim();
		const {password} = event.detail;

		if (username && password) {
			try {
				await moodle.login({username, password});

				loggedOut = false;

				void getCourses();
			} catch {
				logout();
			}
		}
	}

	function modifyCourse(id: number, cb: (course: Course) => Course) {
		courses = courses.map(course =>
			course.courseId === id ? cb(course) : course,
		);
		courses = sortCoursesArray(courses);
	}

	function handleReplace(event: CustomEvent<string>) {
		const id = selected!.courseId;
		const newValue = event.detail.trim();

		modifyCourse(id, course => {
			if (course.courseName === newValue || newValue === '') {
				removeElementFromStorage(id);
				return {...course, value: undefined};
			}

			setValue(id, newValue);
			return {
				...course,
				value: newValue,
			};
		});

		selected = undefined;
	}

	function handleToggle(event: CustomEvent<number>) {
		const id = event.detail;
		if (selected?.courseId === id) {
			selected = undefined;
		}

		modifyCourse(id, course => {
			if (course.value === false) {
				removeElementFromStorage(id);
			} else {
				setValue(id, false);
			}

			return {
				...course,
				value: course.value === false ? undefined : false,
			};
		});
	}

	function handleSelect(event: CustomEvent<Course>) {
		selected = event.detail;
	}

	function handleReset(event: CustomEvent<number>) {
		modifyCourse(event.detail, course => ({
			...course,
			value: undefined,
		}));

		removeElementFromStorage(event.detail);
	}

	// eslint-disable-next-line unicorn/prefer-top-level-await
	moodle.login().then(getCourses, logout);
</script>

<svelte:head>
	<link
		rel="shortcut icon"
		href="/theme/image.php/classic/theme/1588340020/favicon"
	/>
	<title>Clean Moodle Setup</title>
</svelte:head>

<div class="container">
	<Sidebar
		{courses}
		{loadingCourses}
		on:toggle={handleToggle}
		on:select={handleSelect}
		on:reset={handleReset}
	/>
	{#if loggedOut}
		<LoggedOut on:login={handleLogin} />
	{:else}
		<Main {selected} on:input={handleReplace} />
	{/if}
</div>
