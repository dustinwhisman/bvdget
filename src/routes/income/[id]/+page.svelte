<script>
	import AmountInput from '../../../components/inputs/AmountInput.svelte';
	import CategoryInput from '../../../components/inputs/CategoryInput.svelte';
	import DateInputs from '../../../components/inputs/DateInputs.svelte';
	import DescriptionInput from '../../../components/inputs/DescriptionInput.svelte';

	export let data;
</script>

<h1>Edit Income</h1>

<form method="POST" action="?/edit" aria-label="Edit income">
	<input type="hidden" name="id" value={data.income.id} />
	<DateInputs date={data.income.date} />
	<CategoryInput categories={data.categories} selectedCategory={data.income.category} />
	<DescriptionInput description={data.income.description} />
	<AmountInput amount={data.income.amount} />
	<div>
		<button type="submit">Save Income</button>
		<button type="submit" formaction="?/delete">Delete Income</button>
	</div>
</form>
