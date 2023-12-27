<script>
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';

	export let data;

	let { supabase, session } = data;
	$: ({ supabase, session } = data);

	onMount(() => {
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => subscription.unsubscribe();
	});
</script>

<header>
	<nav>
		{#if session != null}
			<a href="/overview">Overview</a>
			<a href="/auth/sign-out">Sign out</a>
		{:else}
			<a href="/">Home</a>
			<a href="/auth/login">Log in/sign up</a>
		{/if}
	</nav>
</header>
<main>
<slot />
</main>
