<script>
	import AmountInput from '../../../components/inputs/AmountInput.svelte';
	import CategoryInput from '../../../components/inputs/CategoryInput.svelte';
	import DescriptionInput from '../../../components/inputs/DescriptionInput.svelte';
	import FrequencyInput from '../../../components/inputs/FrequencyInput.svelte';
	import IsActiveInput from '../../../components/inputs/IsActiveInput.svelte';

	export let data;
</script>

<h1>Add Recurring Expense</h1>

<form method="POST" aria-label="Add recurring expense">
	<CategoryInput categories={data.categories} />
	<DescriptionInput />
	<AmountInput />
	<FrequencyInput />
	<IsActiveInput />
	<div>
		<button type="submit">Save Recurring Expense</button>
	</div>
</form>
