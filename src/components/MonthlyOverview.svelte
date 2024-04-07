<script>
	import { formatCurrency } from '$lib/format-currency';
	import { formatDate } from '$lib/format-date';
	import { sumAmounts } from '$lib/sum-amounts';

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

	let expensesTotal = sumAmounts(expenses);
	let incomeTotal = sumAmounts(income);
	let savingsTotal = sumAmounts(savings);
	let debtTotal = sumAmounts(debt);
</script>

<h1 class="util-visually-hidden">{formattedDate}</h1>

<nav aria-label="Skip links">
	<a href="#expenses" class="util-visually-hidden">Skip to expenses</a>
	<a href="#income" class="util-visually-hidden">Skip to income</a>
	<a href="#savings" class="util-visually-hidden">Skip to savings</a>
	<a href="#debt" class="util-visually-hidden">Skip to debt</a>
</nav>

<nav class="cmp-pagination" aria-label="Monthly overview navigation">
	<a href={previous.link} class="cmp-pagination__link" data-sveltekit-reload>{previous.text}</a>
	<a href="/overview/{year}/{month + 1}" class="cmp-pagination__link" aria-current="page"
		>{formattedDate}</a
	>
	<a href={next.link} class="cmp-pagination__link" data-sveltekit-reload>{next.text}</a>
</nav>

<div class="obj-overview-grid">
	<section class="obj-overview-grid__section" aria-labelledby="expenses">
		<h2 id="expenses" tabindex="-1" class="obj-overview-grid__section-heading cmp-split-heading">
			<span>Expenses</span>
			<span>{formatCurrency(expensesTotal)}</span>
		</h2>
		<div>
			<a href="/expense" class="cmp-cta-link">Add Expense</a>
		</div>
		<p>
			<a href="/recurring-expenses">Manage Recurring Expenses</a>
		</p>
		<a href="#income" class="util-visually-hidden">Skip to income</a>
		{#if expenses.length}
			{#each expenses as category}
				<h3 class="obj-overview-grid__section-subheading cmp-split-heading">
					<span>{category.name}</span>
					<span>{formatCurrency(category.amount)}</span>
				</h3>
				<dl>
					{#each category.entries as expense}
						<div class="cmp-entry-summary">
							<dt class="cmp-entry-summary__description">
								<a href="/expense/{expense.id}">{expense.description}</a>
							</dt>
							<dd class="cmp-entry-summary__date">{formatDate(expense.date)}</dd>
							<dd class="cmp-entry-summary__amount">{formatCurrency(expense.amount)}</dd>
						</div>
					{/each}
				</dl>
			{/each}
		{:else}
			<p>No expenses found.</p>
			{#if canCopyExpenses}
				<form method="POST" action="?/copyExpenses" aria-label="Copy Recurring Expenses">
					<input type="hidden" name="year" value={year} />
					<input type="hidden" name="month" value={month} />
					<button type="submit" class="cmp-form__button">Copy Recurring Expenses</button>
				</form>
			{/if}
		{/if}
	</section>

	<section class="obj-overview-grid__section" aria-labelledby="income">
		<h2 id="income" tabindex="-1" class="obj-overview-grid__section-heading cmp-split-heading">
			<span>Income</span>
			<span>{formatCurrency(incomeTotal)}</span>
		</h2>
		<div>
			<a href="/income" class="cmp-cta-link">Add Income</a>
		</div>
		<p>
			<a href="/recurring-income">Manage Recurring Income</a>
		</p>
		<a href="#savings" class="util-visually-hidden">Skip to savings</a>
		{#if income.length}
			{#each income as category}
				<h3 class="obj-overview-grid__section-subheading cmp-split-heading">
					<span>{category.name}</span>
					<span>{formatCurrency(category.amount)}</span>
				</h3>
				<dl>
					{#each category.entries as incomeEntry}
						<div class="cmp-entry-summary">
							<dt class="cmp-entry-summary__description">
								<a href="/income/{incomeEntry.id}">{incomeEntry.description}</a>
							</dt>
							<dd class="cmp-entry-summary__date">{formatDate(incomeEntry.date)}</dd>
							<dd class="cmp-entry-summary__amount">{formatCurrency(incomeEntry.amount)}</dd>
						</div>
					{/each}
				</dl>
			{/each}
		{:else}
			<p>No income found.</p>
			{#if canCopyIncome}
				<form method="POST" action="?/copyIncome" aria-label="Copy Recurring Income">
					<input type="hidden" name="year" value={year} />
					<input type="hidden" name="month" value={month} />
					<button type="submit" class="cmp-form__button">Copy Recurring Income</button>
				</form>
			{/if}
		{/if}
	</section>

	<section class="obj-overview-grid__section" aria-labelledby="savings">
		<h2 id="savings" tabindex="-1" class="obj-overview-grid__section-heading cmp-split-heading">
			<span>Savings</span>
			<span>{formatCurrency(savingsTotal)}</span>
		</h2>
		<div>
			<a href="/savings" class="cmp-cta-link">Add Savings</a>
		</div>
		{#if savings.length}
			<p>
				<a href="/savings/{year}/{month + 1}">Bulk Edit Savings</a>
			</p>
		{/if}
		<a href="#debt" class="util-visually-hidden">Skip to debt</a>
		{#if savings.length}
			{#each savings as category}
				<h3 class="obj-overview-grid__section-subheading cmp-split-heading">
					<span>{category.name}</span>
					<span>{formatCurrency(category.amount)}</span>
				</h3>
				<dl>
					{#each category.entries as savingsEntry}
						<div class="cmp-entry-summary">
							<dt class="cmp-entry-summary__description">
								<a href="/savings/{savingsEntry.id}">{savingsEntry.description}</a>
							</dt>
							<dd class="cmp-entry-summary__amount">{formatCurrency(savingsEntry.amount)}</dd>
						</div>
					{/each}
				</dl>
			{/each}
		{:else}
			<p>No savings found.</p>
			{#if canCopySavings}
				<form method="POST" action="?/copySavings" aria-label="Copy Last Month's Savings">
					<input type="hidden" name="year" value={year} />
					<input type="hidden" name="month" value={month} />
					<button type="submit" class="cmp-form__button">Copy Last Month's Savings</button>
				</form>
			{/if}
		{/if}
	</section>

	<section class="obj-overview-grid__section" aria-labelledby="debt">
		<h2 id="debt" tabindex="-1" class="obj-overview-grid__section-heading cmp-split-heading">
			<span>Debt</span>
			<span>{formatCurrency(debtTotal)}</span>
		</h2>
		<div>
			<a href="/debt" class="cmp-cta-link">Add Debt</a>
		</div>
		<a href="#expenses" class="util-visually-hidden">Go to expenses</a>
		{#if debt.length}
			{#each debt as category}
				<h3 class="obj-overview-grid__section-subheading cmp-split-heading">
					<span>{category.name}</span>
					<span>{formatCurrency(category.amount)}</span>
				</h3>
				<dl>
					{#each category.entries as debtEntry}
						<div class="cmp-entry-summary">
							<dt class="cmp-entry-summary__description">
								<a href="/debt/{debtEntry.id}">{debtEntry.description}</a>
							</dt>
							<dd class="cmp-entry-summary__amount">{formatCurrency(debtEntry.amount)}</dd>
						</div>
					{/each}
				</dl>
			{/each}
		{:else}
			<p>No debt found.</p>
			{#if canCopyDebt}
				<form method="POST" action="?/copyDebt" aria-label="Copy Last Month's Debt">
					<input type="hidden" name="year" value={year} />
					<input type="hidden" name="month" value={month} />
					<button type="submit" class="cmp-form__button">Copy Last Month's Debt</button>
				</form>
			{/if}
		{/if}
	</section>
</div>
