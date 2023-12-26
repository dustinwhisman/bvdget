<script>
	import AmountInput from '../../../components/inputs/AmountInput.svelte';
	import CategoryInput from '../../../components/inputs/CategoryInput.svelte';
	import DateInputs from '../../../components/inputs/DateInputs.svelte';
	import DescriptionInput from '../../../components/inputs/DescriptionInput.svelte';

	export let data;
</script>

<h1>Edit Savings</h1>

<form method="POST">
	<input type="hidden" name="id" value={data.savings.id} />
	<DateInputs showDate={false} date={data.savings.date} />
	<CategoryInput categories={data.categories} selectedCategory={data.savings.category} />
	<DescriptionInput description={data.savings.description} />
	<AmountInput label="Balance" amount={data.savings.amount} />
	<div>
		<button type="submit">Save Savings</button>
	</div>
</form>
