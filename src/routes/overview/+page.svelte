<script>
	export let data;
</script>

<h1>Overview</h1>

<h2>Expenses</h2>
{#if data.expenses.length}
	<ul>
		{#each data.expenses as expense}
			<li>{expense.description}: {expense.amount}</li>
		{/each}
	</ul>
{:else}
	<p>No expenses found.</p>
{/if}

<h2>Income</h2>
{#if data.income.length}
	<ul>
		{#each data.income as incomeEntry}
			<li>{incomeEntry.description}: {incomeEntry.amount}</li>
		{/each}
	</ul>
{:else}
	<p>No income found.</p>
{/if}

<h2>Savings</h2>
{#if data.savings.length}
	<ul>
		{#each data.savings as savingsEntry}
			<li>{savingsEntry.description}: {savingsEntry.amount}</li>
		{/each}
	</ul>
{:else}
	<p>No savings found.</p>
{/if}

<h2>Debt</h2>
{#if data.debt.length}
	<ul>
		{#each data.debt as debtEntry}
			<li>{debtEntry.description}: {debtEntry.amount}</li>
		{/each}
	</ul>
{:else}
	<p>No debt found.</p>
{/if}
