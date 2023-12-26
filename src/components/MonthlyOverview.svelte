<script>
	export let data;
</script>

<h1>{data.formattedDate}</h1>

<ul>
	<li>
		<a href={data.previous.link}>{data.previous.text}</a>
	</li>
	<li>
		<a href={data.next.link}>{data.next.text}</a>
	</li>
</ul>

<h2>Expenses</h2>
{#if data.expenses.length}
	<ul>
		{#each data.expenses as expense}
			<li>
				<a href="/expense/{expense.id}">{expense.description}: {expense.amount}</a>
			</li>
		{/each}
	</ul>
{:else}
	<p>No expenses found.</p>
{/if}
<a href="/expense">Add Expense</a>

<h2>Income</h2>
{#if data.income.length}
	<ul>
		{#each data.income as incomeEntry}
			<li>
				<a href="/income/{incomeEntry.id}">{incomeEntry.description}: {incomeEntry.amount}</a>
			</li>
		{/each}
	</ul>
{:else}
	<p>No income found.</p>
{/if}
<a href="/income">Add Income</a>

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
<a href="/savings">Add Savings</a>

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
<a href="/debt">Add Debt</a>
