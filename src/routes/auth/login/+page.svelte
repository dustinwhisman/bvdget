<script>
	export let data;

	let { session } = data;
</script>

<h1>Log in or sign up</h1>

{#if session?.user?.email != null}
	<p>
		You are already logged in as <em>{session.user.email}</em>.
		<a href="/auth/sign-out">Sign out</a>
		to change accounts, or go back to your <a href="/overview">overview page</a>.
	</p>
{:else}
	<p>
		We will send you an email with a link that you can use to finish logging in. If you don't have
		an account already, one will be created automatically.
	</p>

	<form method="POST">
		<label for="email">Email</label>
		<input id="email" type="email" name="email" autocomplete="email" />
		<button type="submit">Request link</button>
	</form>
{/if}
