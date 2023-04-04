<script lang="ts">
	import {createEventDispatcher} from 'svelte';

	import type {Moodle} from './moodle.js';

	import {getUsername} from './credentials.js';

	export let title: string;
	export let moodle: Moodle;

	const dispatch = createEventDispatcher<{login: string}>();

	let isLoggedOut = true;
	let username: string = getUsername() ?? '';
	let password: string = '';

	async function handleLogin() {
		username = username.trim();
		if (username && password) {
			isLoggedOut = false;

			try {
				const token = await moodle.login({username, password});

				dispatch('login', token);
			} catch {
				isLoggedOut = true;
			}
		}
	}
</script>

{#if isLoggedOut}
	<div class="vertical-horizontal-center">
		<form on:submit|preventDefault|stopPropagation={handleLogin}>
			<div class="card shadow">
				<div class="card-body">
					<h5 class="card-title">Login - {title}</h5>
					<div class="mb-3">
						<label for="popup-username" class="form-label"> Username </label>
						<input
							required
							id="popup-username"
							placeholder="Username"
							class="form-control"
							class:is-invalid={username.trim() === ''}
						/>
					</div>

					<div class="mb-3">
						<label for="popup-password" class="form-label"> Password </label>
						<input
							required
							id="popup-password"
							placeholder="Password"
							class="form-control"
							class:is-invalid={password === ''}
							bind:value={password}
							type="password"
						/>
					</div>
				</div>
				<button class="btn btn-primary" type="submit"> Login </button>
			</div>
		</form>
	</div>
{/if}
