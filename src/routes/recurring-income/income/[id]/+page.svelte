<script>
	import AmountInput from '../../../../components/inputs/AmountInput.svelte';
	import CategoryInput from '../../../../components/inputs/CategoryInput.svelte';
	import DescriptionInput from '../../../../components/inputs/DescriptionInput.svelte';
	import FrequencyInput from '../../../../components/inputs/FrequencyInput.svelte';
	import IsActiveInput from '../../../../components/inputs/IsActiveInput.svelte';

	export let data;
</script>

<h1>Edit Recurring Income</h1>

<form method="POST" action="?/edit" class="cmp-form" aria-label="Edit recurring income">
	<input type="hidden" name="id" value={data.income.id} />
	<CategoryInput categories={data.categories} selectedCategory={data.income.category} />
	<DescriptionInput description={data.income.description} />
	<AmountInput amount={data.income.amount} />
	<FrequencyInput
		selectedFrequency={data.income.frequency}
		interval={data.income.interval}
		unitOfMeasurement={data.income.unitOfMeasurement}
		daysOfMonth={data.income.days_of_month}
		date={data.income.date}
	/>
	<IsActiveInput isActive={data.income.active} />
	<div class="cmp-form__button-group cmp-form__button-group--wide">
		<button type="submit" class="cmp-form__button">Save Recurring Income</button>
		<button type="submit" formaction="?/delete" class="cmp-form__button cmp-form__button--danger"
			>Delete Recurring Income</button
		>
	</div>
</form>
