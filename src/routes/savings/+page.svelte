<script>
	import AmountInput from '../../components/inputs/AmountInput.svelte';
	import CategoryInput from '../../components/inputs/CategoryInput.svelte';
	import DateInputs from '../../components/inputs/DateInputs.svelte';
	import DescriptionInput from '../../components/inputs/DescriptionInput.svelte';

	export let data;
</script>

<h1>Add Savings</h1>

<form method="POST">
	<DateInputs showDate={false} />
	<CategoryInput categories={data.categories} />
	<DescriptionInput />
	<AmountInput label="Balance" />
	<div>
		<button type="submit">Save Savings</button>
	</div>
</form>
