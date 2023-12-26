<script>
	import AmountInput from '../../../components/inputs/AmountInput.svelte';
	import CategoryInput from '../../../components/inputs/CategoryInput.svelte';
	import DateInputs from '../../../components/inputs/DateInputs.svelte';
	import DescriptionInput from '../../../components/inputs/DescriptionInput.svelte';
	import InterestRateInput from '../../../components/inputs/InterestRateInput.svelte';

	export let data;
</script>

<h1>Edit Debt</h1>

<form method="POST" action="?/edit">
	<input type="hidden" name="id" value={data.debt.id} />
	<DateInputs showDate={false} date={data.debt.date} />
	<CategoryInput categories={data.categories} selectedCategory={data.debt.category} />
	<DescriptionInput description={data.debt.description} />
	<AmountInput label="Balance" amount={data.debt.amount} />
	<AmountInput label="Minimum Payment" name="minimum-payment" amount={data.debt.minimum_payment} />
	<InterestRateInput interestRate={data.debt.interest_rate} />
	<div>
		<button type="submit">Save Debt</button>
		<button type="submit" formaction="?/delete">Delete Debt</button>
	</div>
</form>
