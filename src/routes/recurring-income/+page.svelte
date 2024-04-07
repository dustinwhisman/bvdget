<script>
	import { formatCurrency } from '$lib/format-currency';
	import { formatDate } from '$lib/format-date';
	import { formatFrequency } from '$lib/format-recurring';

	export let data;
</script>

<h1>Recurring Income</h1>

<p>
	<a href="/recurring-income/income" class="cmp-cta-link">Add Recurring Income</a>
</p>
{#if data.recurringIncome.length}
	<dl class="cmp-entry-summary__wrapper">
		{#each data.recurringIncome as income}
			<div class="cmp-entry-summary cmp-entry-summary--inverted">
				<dt class="cmp-entry-summary__description">
					<a href="/recurring-income/income/{income.id}"
						>{income.description}{income.active ? '' : ' (inactive)'}</a
					>
				</dt>
				<dd class="cmp-entry-summary__amount">
					{formatCurrency(income.annualAmount)}/year
				</dd>
				<dd class="cmp-entry-summary__date">
					{#if income.frequency !== '1-year'}
						{formatCurrency(income.amount)}{formatFrequency(income.frequency)}
					{:else}
						Yearly
					{/if}
					since {formatDate(income.date)}
				</dd>
			</div>
		{/each}
	</dl>
{:else}
	<p>No recurring income found.</p>
{/if}
