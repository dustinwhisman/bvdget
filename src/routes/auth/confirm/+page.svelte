<script>
	export let data;
</script>

<h1>Confirm Login</h1>
<p>Check your email for a one-time code that you can use to confirm your login.</p>

<form method="POST">
	<input type="hidden" name="email" value={data.email} />
	<label for="token">One-time code</label>
	<input id="token" type="text" name="token" inputmode="numeric" autocomplete="one-time-code" />
	<button type="submit">Finish logging in</button>
</form>
