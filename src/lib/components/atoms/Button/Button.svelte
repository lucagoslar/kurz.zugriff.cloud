<script lang="ts">
	export let autogrow: boolean = false;
	export let type: 'button' | 'submit' | 'reset' | null | undefined = 'button';
</script>

<button on:click {type} class:autogrow><slot /></button>

<style lang="scss">
	@use '$styles/a11y.scss' as a11y;

	button {
		cursor: pointer;

		min-height: 50px;
		padding: 0 25px;

		outline: 0;
		border: 0;

		@include a11y.outline(var(--primary));

		border-radius: 25px;

		background-color: var(--primary);
		color: white;

		&.autogrow {
			width: 100%;
		}
	}
</style>
