<script lang="ts">
	import Logo from '$lib/components/atoms/Logo/Logo.svelte';
	import type { LayoutData } from './[reference]/$types';
</script>

<main>
	<div class="header" aria-hidden="true">
		<a href="/">
			<Logo />
		</a>
	</div>

	<div>
		<slot />
	</div>
</main>

<style lang="scss">
	:global(body) {
		display: flex;
		justify-content: center;
		flex-direction: column;

		min-height: 100vh;
		min-height: 100svh;
		height: 100%;

		padding: 25px;
	}

	main {
		max-width: 600px;
		width: 100%;

		margin: 0 auto;

		border: 2px solid var(--grey);
		border-radius: 25px;

		padding: 25px;

		.header {
			display: flex;
			justify-content: center;
			margin: 0 0 50px;

			a {
				display: block;
			}
		}
	}
</style>
