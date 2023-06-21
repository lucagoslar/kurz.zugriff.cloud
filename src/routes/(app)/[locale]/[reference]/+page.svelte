<script lang="ts">
	import LL from '$i18n/i18n-svelte';
	import Button from '$lib/components/atoms/Button/Button.svelte';
	import { MetaTags } from 'svelte-meta-tags';
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import { client } from '$scripts/trpc';

	export let data: PageData;

	let loaded: boolean = false;
	let error: boolean = false;
	let url: string;

	let min_delay = 800; // 800ms

	onMount(() => {
		let initiated = new Date();

		client()
			.short.find.query(data.slug)
			.then((data) => {
				if (!data) throw '404';

				url = data?.url;

				if (initiated.valueOf() + min_delay > new Date().valueOf()) {
					setTimeout(() => {
						loaded = true;
					}, initiated.valueOf() + min_delay - new Date().valueOf());
				} else {
					loaded = true;
				}
			})
			.catch(() => {
				error = true;
			});
	});
</script>

<MetaTags title={$LL.Locale.Reference.title()} nofollow noindex />

<h1>{$LL.Locale.Reference.title()}</h1>

{#if error}
	<span>{$LL.Locale.Reference.Error.not_found()}</span>
{:else if loaded}
	<a href={url}>
		{url}
	</a>
{:else}
	<div class="loading" />
{/if}

{#if loaded}
	<div class="follow">
		<Button on:click={() => window.location.replace(url)} disabled={!loaded}>
			{$LL.Locale.Reference.follow_link()}
		</Button>
	</div>
{/if}

<style lang="scss">
	a {
		display: block;
		word-break: break-all;
	}

	.follow {
		display: flex;
		justify-content: center;

		margin: 25px 0 0;
	}

	.loading {
		width: 100%;
		height: 24px;
		border-radius: 7px;

		background-image: linear-gradient(
			90deg,
			#bababa 0%,
			#d9d9d9 25%,
			#bababa 50%,
			#d9d9d9 75%,
			#bababa 100%
		);

		background-size: 200% 100%;

		animation: loading 1.5s linear infinite;
	}

	@keyframes loading {
		from {
			background-position: -50% 0;
		}
		to {
			background-position: 150% 0;
		}
	}
</style>
