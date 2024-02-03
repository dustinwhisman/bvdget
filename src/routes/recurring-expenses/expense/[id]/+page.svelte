<script>
	import AmountInput from '../../../../components/inputs/AmountInput.svelte';
	import CategoryInput from '../../../../components/inputs/CategoryInput.svelte';
	import DescriptionInput from '../../../../components/inputs/DescriptionInput.svelte';
	import FrequencyInput from '../../../../components/inputs/FrequencyInput.svelte';
	import IsActiveInput from '../../../../components/inputs/IsActiveInput.svelte';

	export let data;
</script>

<h1>Edit Recurring Expense</h1>

<form method="POST" action="?/edit" class="cmp-form" aria-label="Edit recurring expense">
	<input type="hidden" name="id" value={data.expense.id} />
	<CategoryInput categories={data.categories} selectedCategory={data.expense.category} />
	<DescriptionInput description={data.expense.description} />
	<AmountInput amount={data.expense.amount} />
	<FrequencyInput
		selectedFrequency={data.expense.frequency}
		interval={data.expense.interval}
		unitOfMeasurement={data.expense.unitOfMeasurement}
		daysOfMonth={data.expense.days_of_month}
		date={data.expense.date}
	/>
	<IsActiveInput isActive={data.expense.active} />
	<div class="cmp-form__button-group cmp-form__button-group--wide">
		<button type="submit" class="cmp-form__button">Save Recurring Expense</button>
		<button type="submit" formaction="?/delete" class="cmp-form__button cmp-form__button--danger"
			>Delete Recurring Expense</button
		>
	</div>
</form>
