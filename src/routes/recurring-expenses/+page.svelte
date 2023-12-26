<script>
	export let data;
</script>

<h1>Recurring Expenses</h1>

{#if data.recurringExpenses.length}
	<ul>
		{#each data.recurringExpenses as expense}
			<li>
				<a href="/recurring-expenses/expense/{expense.id}"
					>{expense.description}: {expense.amount}</a
				>
			</li>
		{/each}
	</ul>
{:else}
	<p>No recurring expenses found.</p>
{/if}
<p>
	<a href="/recurring-expenses/expense">Add Recurring Expense</a>
</p>
