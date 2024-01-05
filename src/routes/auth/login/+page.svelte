<script>
	export let data;

	let { session } = data;
</script>

<div class="obj-content-container">
	<h1>Log in or sign up</h1>

	{#if session?.user?.email != null}
		<p>
			You are already logged in as <em>{session.user.email}</em>.
			<a href="/auth/sign-out">Sign out</a>
			to change accounts, or go back to your <a href="/overview">overview page</a>.
		</p>
	{:else}
		<p>
			We will send you an email with a one-time code that you can use to finish logging in. If you
			don't have an account already, one will be created automatically.
		</p>

		<form method="POST" class="cmp-form" aria-label="Request one-time code">
			<label for="email" class="cmp-form__label">Email</label>
			<input id="email" type="email" name="email" class="cmp-form__input" autocomplete="email" />
			<button type="submit" class="cmp-form__button">Request one-time code</button>
		</form>
	{/if}
</div>
