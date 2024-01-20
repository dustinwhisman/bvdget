<script>
	import AmountInput from '../../../components/inputs/AmountInput.svelte';
	import CategoryInput from '../../../components/inputs/CategoryInput.svelte';
	import DateInputs from '../../../components/inputs/DateInputs.svelte';
	import DescriptionInput from '../../../components/inputs/DescriptionInput.svelte';

	export let data;
</script>

<h1>Edit Savings</h1>

<form method="POST" action="?/edit" class="cmp-form" aria-label="Edit savings">
	<input type="hidden" name="id" value={data.savings.id} />
	<DateInputs showDate={false} date={data.savings.date} />
	<CategoryInput categories={data.categories} selectedCategory={data.savings.category} />
	<DescriptionInput description={data.savings.description} />
	<AmountInput label="Balance" amount={data.savings.amount} />
	<div class="cmp-form__button-group">
		<button type="submit" class="cmp-form__button">Save Savings</button>
		<button type="submit" formaction="?/delete" class="cmp-form__button cmp-form__button--danger"
			>Delete Savings</button
		>
	</div>
</form>
