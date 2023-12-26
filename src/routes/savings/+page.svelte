<script>
	import AmountInput from '../../components/inputs/AmountInput.svelte';
	import CategoryInput from '../../components/inputs/CategoryInput.svelte';
	import DateInputs from '../../components/inputs/DateInputs.svelte';
	import DescriptionInput from '../../components/inputs/DescriptionInput.svelte';

	export let data;
</script>

<h1>Add Savings</h1>

<form method="POST">
	<AmountInput />
	<CategoryInput categories={data.categories} />
	<DescriptionInput />
	<DateInputs showDate={false} />
	<div>
		<button type="submit">Save Savings</button>
	</div>
</form>
