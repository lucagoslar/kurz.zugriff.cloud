<script lang="ts">
	import { useForm, Hint, validators, url, required, pattern } from 'svelte-use-form';
	import { MetaTags } from 'svelte-meta-tags';

	import { client } from '$scripts/trpc';
	import Button from '$lib/components/atoms/Button/Button.svelte';
	import LL from '$i18n/i18n-svelte';

	let last_short_url_created: string | undefined = undefined;

	let created = false;
	let exists = false;
	let error = false;
	let loading = false;

	async function createReference() {
		if (!$form.valid) return;

		last_short_url_created = undefined;

		created = false;
		exists = false;
		error = false;
		loading = true;

		exists = (await client().short.exists.query($form.values.reference as string)).valueOf();
		if (exists) {
			loading = false;
			return;
		}

		try {
			await client().short.register.mutate({
				slug: $form.values.reference!,
				url: $form.values.url!
			});

			created = true;

			last_short_url_created = $form.values.reference;

			$form.reset();
		} catch (e) {
			console.log(e);
			error = true;
		}

		loading = false;
	}

	const form = useForm();
</script>

<MetaTags title={$LL.Locale.title()} />

<h1>{$LL.Locale.title()}</h1>
<form on:submit|preventDefault={createReference} use:form>
	<div class="input">
		<label for="reference">{$LL.Locale.form.short_url.label()}*</label>
		<input
			type="text"
			id="reference"
			name="reference"
			placeholder="zugriff-kurz-urls"
			use:validators={[pattern(/[a-zA-Z0-9-]+/), required]}
		/>
		<div class="hints">
			<Hint for="reference" on="pattern">
				{$LL.Locale.form.short_url.error()}
			</Hint>
		</div>
	</div>
	<div class="input">
		<label for="url">{$LL.Locale.form.url.label()}*</label>
		<input
			type="text"
			id="url"
			name="url"
			placeholder="https://kurz.zugriff.cloud"
			use:validators={[url, required]}
		/>
		<div class="hints">
			<Hint for="url" on="url">{$LL.Locale.form.url.error()}</Hint>
		</div>
	</div>

	<Button type="submit" disabled={loading}>{$LL.Locale.form.register()}</Button>

	<div class="result">
		{#if exists}
			<p class="error">{$LL.Locale.form.exists()}</p>
		{:else if created}
			<p class="success">
				{$LL.Locale.form.success({
					url: window.location.protocol + '//' + window.location.host + '/' + last_short_url_created
				})}
			</p>
		{:else if error}
			<p class="error">{$LL.Locale.form.error()}</p>
		{/if}
	</div>
</form>

<style lang="scss">
	form {
		display: grid;
		gap: 25px;

		label {
			margin: 0 25px 10px;
			color: rgba(0, 0, 0, 0.8);
		}
		.input {
			display: grid;
			input {
				border: none;
				outline: none;
				border-radius: 25px;

				background-color: var(--grey);

				height: 50px;

				font-size: 16px;

				padding: 0 25px;
			}
		}

		.hints {
			&:not(:empty) {
				margin: 15px 0 0;

				:global(*) {
					color: var(--error);
				}
			}
		}

		.result {
			p {
				margin: 0;
			}

			.error {
				color: var(--error);
			}
			.success {
				color: var(--success);
			}
		}
	}
</style>
