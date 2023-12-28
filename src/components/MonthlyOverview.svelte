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
		canCopyIncome,
		canCopySavings,
		canCopyDebt,
	} = data;
</script>

<h1 class="util-visually-hidden">{formattedDate}</h1>

<nav class="cmp-pagination" aria-label="Monthly overview navigation">
	<a href={previous.link} class="cmp-pagination__link" data-sveltekit-reload>{previous.text}</a>
	<a href="/overview/{year}/{month + 1}" class="cmp-pagination__link" aria-current="page"
		>{formattedDate}</a
	>
	<a href={next.link} class="cmp-pagination__link" data-sveltekit-reload>{next.text}</a>
</nav>

<div class="obj-overview-grid">
	<div class="obj-overview-grid__section">
		<div class="obj-overview-grid__section-heading">
			<h2>Expenses</h2>
		</div>
		<div class="obj-overview-grid__section-body">
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
					<form method="POST" action="?/copyExpenses" aria-label="Copy Recurring Expenses">
						<input type="hidden" name="year" value={year} />
						<input type="hidden" name="month" value={month} />
						<button type="submit">Copy Recurring Expenses</button>
					</form>
				{/if}
			{/if}
			<p>
				<a href="/recurring-expenses">Manage Recurring Expenses</a>
			</p>
		</div>
		<div class="obj-overview-grid__section-footer">
			<a href="/expense" class="obj-overview-grid__add-link">Add Expense</a>
		</div>
	</div>

	<div class="obj-overview-grid__section">
		<div class="obj-overview-grid__section-heading">
			<h2>Income</h2>
		</div>
		<div class="obj-overview-grid__section-body">
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
				{#if canCopyIncome}
					<form method="POST" action="?/copyIncome" aria-label="Copy Recurring Income">
						<input type="hidden" name="year" value={year} />
						<input type="hidden" name="month" value={month} />
						<button type="submit">Copy Recurring Income</button>
					</form>
				{/if}
			{/if}
			<p>
				<a href="/recurring-income">Manage Recurring Income</a>
			</p>
		</div>
		<div class="obj-overview-grid__section-footer">
			<a href="/income" class="obj-overview-grid__add-link">Add Income</a>
		</div>
	</div>

	<div class="obj-overview-grid__section">
		<div class="obj-overview-grid__section-heading">
			<h2>Savings</h2>
		</div>
		<div class="obj-overview-grid__section-body">
			{#if savings.length}
				<ul>
					{#each savings as savingsEntry}
						<li>
							<a href="/savings/{savingsEntry.id}"
								>{savingsEntry.description}: {savingsEntry.amount}</a
							>
						</li>
					{/each}
				</ul>
			{:else}
				<p>No savings found.</p>
				{#if canCopySavings}
					<form method="POST" action="?/copySavings" aria-label="Copy Last Month's Savings">
						<input type="hidden" name="year" value={year} />
						<input type="hidden" name="month" value={month} />
						<button type="submit">Copy Last Month's Savings</button>
					</form>
				{/if}
			{/if}
		</div>
		<div class="obj-overview-grid__section-footer">
			<a href="/savings" class="obj-overview-grid__add-link">Add Savings</a>
		</div>
	</div>

	<div class="obj-overview-grid__section">
		<div class="obj-overview-grid__section-heading">
			<h2>Debt</h2>
		</div>
		<div class="obj-overview-grid__section-body">
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
				{#if canCopyDebt}
					<form method="POST" action="?/copyDebt" aria-label="Copy Last Month's Debt">
						<input type="hidden" name="year" value={year} />
						<input type="hidden" name="month" value={month} />
						<button type="submit">Copy Last Month's Debt</button>
					</form>
				{/if}
			{/if}
		</div>
		<div class="obj-overview-grid__section-footer">
			<a href="/debt" class="obj-overview-grid__add-link">Add Debt</a>
		</div>
	</div>
</div>
