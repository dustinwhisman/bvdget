<script>
	export let data;

	let {
		year,
		month,
		formattedDate,
		previous,
		next,
		expenses,
		income,
		savings,
		debt,
		canCopyExpenses,
	} = data;
</script>

<h1>{formattedDate}</h1>

<ul>
	<li>
		<a href={previous.link} data-sveltekit-reload>{previous.text}</a>
	</li>
	<li>
		<a href={next.link} data-sveltekit-reload>{next.text}</a>
	</li>
</ul>

<h2>Expenses</h2>
{#if expenses.length}
	<ul>
		{#each expenses as expense}
			<li>
				<a href="/expense/{expense.id}">{expense.description}: {expense.amount}</a>
			</li>
		{/each}
	</ul>
{:else}
	<p>No expenses found.</p>
	{#if canCopyExpenses}
		<form method="POST" action="?/copyExpenses">
			<input type="hidden" name="year" value={year} />
			<input type="hidden" name="month" value={month} />
			<button type="submit">Copy Recurring Expenses</button>
		</form>
	{/if}
{/if}
<p>
	<a href="/recurring-expenses">Manage Recurring Expenses</a>
</p>
<p>
	<a href="/expense">Add Expense</a>
</p>

<h2>Income</h2>
{#if income.length}
	<ul>
		{#each income as incomeEntry}
			<li>
				<a href="/income/{incomeEntry.id}">{incomeEntry.description}: {incomeEntry.amount}</a>
			</li>
		{/each}
	</ul>
{:else}
	<p>No income found.</p>
{/if}
<p>
	<a href="/recurring-income">Manage Recurring Income</a>
</p>
<p>
	<a href="/income">Add Income</a>
</p>

<h2>Savings</h2>
{#if savings.length}
	<ul>
		{#each savings as savingsEntry}
			<li>
				<a href="/savings/{savingsEntry.id}">{savingsEntry.description}: {savingsEntry.amount}</a>
			</li>
		{/each}
	</ul>
{:else}
	<p>No savings found.</p>
{/if}
<p>
	<a href="/savings">Add Savings</a>
</p>

<h2>Debt</h2>
{#if debt.length}
	<ul>
		{#each debt as debtEntry}
			<li>
				<a href="/debt/{debtEntry.id}">{debtEntry.description}: {debtEntry.amount}</a>
			</li>
		{/each}
	</ul>
{:else}
	<p>No debt found.</p>
{/if}
<p>
	<a href="/debt">Add Debt</a>
</p>
