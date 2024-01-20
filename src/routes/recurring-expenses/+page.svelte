<script>
	import { formatCurrency } from '$lib/format-currency';
	import { formatDate } from '$lib/format-date';
	import { formatFrequency } from '$lib/format-recurring';

	export let data;
</script>

<h1>Recurring Expenses</h1>

{#if data.recurringExpenses.length}
	<dl class="cmp-entry-summary__wrapper">
		{#each data.recurringExpenses as expense}
			<div class="cmp-entry-summary cmp-entry-summary--inverted">
				<dt class="cmp-entry-summary__description">
					<a href="/recurring-expenses/expense/{expense.id}"
						>{expense.description}{expense.active ? '' : ' (inactive)'}</a
					>
				</dt>
				<dd class="cmp-entry-summary__amount">
					{formatCurrency(expense.annualAmount)}/year
				</dd>
				<dd class="cmp-entry-summary__date">
					{#if expense.frequency !== '1-year'}
						{formatCurrency(expense.amount)}{formatFrequency(expense.frequency)}
					{:else}
						Yearly
					{/if}
					since {formatDate(expense.date)}
				</dd>
			</div>
		{/each}
	</dl>
{:else}
	<p>No recurring expenses found.</p>
{/if}
<p>
	<a href="/recurring-expenses/expense">Add Recurring Expense</a>
</p>
