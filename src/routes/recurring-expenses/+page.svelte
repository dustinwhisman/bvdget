<script>
	export let data;
</script>

<h1>Recurring Expenses</h1>

{#if data.recurringExpenses.length}
	<ul>
		{#each data.recurringExpenses as expense}
			<li>
				{expense.description}: {expense.amount}
			</li>
		{/each}
	</ul>
{:else}
	<p>No recurring expenses found.</p>
{/if}
