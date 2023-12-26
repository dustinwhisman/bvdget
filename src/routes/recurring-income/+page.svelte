<script>
	export let data;
</script>

<h1>Recurring Income</h1>

{#if data.recurringIncome.length}
	<ul>
		{#each data.recurringIncome as income}
			<li>
				<a href="/recurring-income/income/{income.id}">{income.description}: {income.amount}</a>
			</li>
		{/each}
	</ul>
{:else}
	<p>No recurring income found.</p>
{/if}
<p>
	<a href="/recurring-income/income">Add Recurring Income</a>
</p>
