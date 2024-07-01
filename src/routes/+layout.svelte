<script>
	import { page } from '$app/stores';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';

	export let data;

	let { supabase, session } = data;
	$: ({ supabase, session } = data);

	onMount(() => {
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((event, newSession) => {
			if (newSession?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => subscription.unsubscribe();
	});
</script>

<svelte:head>
	<title>{$page.data.title ?? 'bvdget'} | bvdget</title>
	<meta
		name="description"
		content={$page.data.description ??
			'A money tracking app to make it easy to keep a handle on your money habits.'}
	/>
</svelte:head>
<header>
	<div class="obj-container">
		<a href="#main" class="util-visually-hidden">Skip to main content</a>
		<nav class="cmp-navigation" aria-label="Primary navigation">
			{#if session != null}
				<a href="/overview" class="cmp-navigation__link">Overview</a>
				<a href="/auth/sign-out" class="cmp-navigation__link">Sign out</a>
			{:else}
				<a href="/" class="cmp-navigation__link">Home</a>
				<a href="/auth/login" class="cmp-navigation__link">Log in/sign up</a>
			{/if}
		</nav>
	</div>
</header>
<main id="main" tabindex="-1">
	<div class="obj-container">
		<slot />
	</div>
</main>
