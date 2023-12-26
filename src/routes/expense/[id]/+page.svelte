<script>
	import AmountInput from '../../../components/inputs/AmountInput.svelte';
	import CategoryInput from '../../../components/inputs/CategoryInput.svelte';
	import DateInputs from '../../../components/inputs/DateInputs.svelte';
	import DescriptionInput from '../../../components/inputs/DescriptionInput.svelte';

	export let data;
</script>

<h1>Edit Expense</h1>

<form method="POST" action="?/edit">
	<input type="hidden" name="id" value={data.expense.id} />
	<DateInputs date={data.expense.date} />
	<CategoryInput categories={data.categories} selectedCategory={data.expense.category} />
	<DescriptionInput description={data.expense.description} />
	<AmountInput amount={data.expense.amount} />
	<div>
		<button type="submit">Save Expense</button>
		<button type="submit" formaction="?/delete">Delete Expense</button>
	</div>
</form>
