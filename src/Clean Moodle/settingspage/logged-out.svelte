<script lang="ts">
	import {createEventDispatcher} from 'svelte';
	import {getUsername} from '../../shared/moodle-functions-v3/index.js';

	const dispatch = createEventDispatcher<{
		login: {
			username: string;
			password: string;
		};
	}>();

	let username: string = getUsername() ?? '';
	let password: string = '';

	function onSubmit() {
		if (username && password) {
			dispatch('login', {
				username,
				password,
			});
		}
	}
</script>

<form on:submit|preventDefault={onSubmit}>
	<div class="replace-flex-input">
		<h5>Login</h5>
		<input placeholder="Username" bind:value={username} />
		<input bind:value={password} placeholder="Password" type="password" />
		<button class="btn-save" type="submit"> Login </button>
	</div>
</form>
