<script>
	export let data;

	let { session } = data;
</script>

<div class="obj-content-container">
	<h1>Confirm Login</h1>

	{#if session?.user?.email != null}
		<p>
			You are already logged in as <em>{session.user.email}</em>.
			<a href="/auth/sign-out">Sign out</a>
			to change accounts, or go back to your <a href="/overview">overview page</a>.
		</p>
	{:else}
		<p>Check your email for a one-time code that you can use to confirm your login.</p>

		<form method="POST" class="cmp-form" aria-label="Finish logging in">
			<input type="hidden" name="email" value={data.email} />
			<label for="token" class="cmp-form__label">One-time code</label>
			<input id="token" type="text" name="token" class="cmp-form__input" inputmode="numeric" autocomplete="one-time-code" />
			<button type="submit" class="cmp-form__button">Finish logging in</button>
		</form>
	{/if}
</div>
