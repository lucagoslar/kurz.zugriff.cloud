<script lang="ts">
	import LL from '$i18n/i18n-svelte';
	import Button from '$lib/components/atoms/Button/Button.svelte';
	import { MetaTags } from 'svelte-meta-tags';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<MetaTags title={$LL.Locale.Reference.title()} nofollow noindex />

<h1>{$LL.Locale.Reference.title()}</h1>
<a href={data.reference.url}>
	{data.reference.url}
</a>
<div class="follow">
	<Button on:click={() => window.location.replace(data.reference.url)}>
		{$LL.Locale.Reference.follow_link()}
	</Button>
</div>

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
</style>
