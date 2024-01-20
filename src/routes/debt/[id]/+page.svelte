<script>
	import AmountInput from '../../../components/inputs/AmountInput.svelte';
	import CategoryInput from '../../../components/inputs/CategoryInput.svelte';
	import DateInputs from '../../../components/inputs/DateInputs.svelte';
	import DescriptionInput from '../../../components/inputs/DescriptionInput.svelte';
	import InterestRateInput from '../../../components/inputs/InterestRateInput.svelte';

	export let data;
</script>

<h1>Edit Debt</h1>

<form method="POST" action="?/edit" class="cmp-form" aria-label="Edit debt">
	<input type="hidden" name="id" value={data.debt.id} />
	<DateInputs showDate={false} date={data.debt.date} />
	<CategoryInput categories={data.categories} selectedCategory={data.debt.category} />
	<DescriptionInput description={data.debt.description} />
	<AmountInput label="Balance" amount={data.debt.amount} />
	<AmountInput label="Minimum Payment" name="minimum-payment" amount={data.debt.minimum_payment} />
	<InterestRateInput interestRate={data.debt.interest_rate} />
	<div class="cmp-form__button-group">
		<button type="submit" class="cmp-form__button">Save Debt</button>
		<button type="submit" formaction="?/delete" class="cmp-form__button cmp-form__button--danger"
			>Delete Debt</button
		>
	</div>
</form>
