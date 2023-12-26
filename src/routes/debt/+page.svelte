<script>
	import AmountInput from '../../components/inputs/AmountInput.svelte';
	import CategoryInput from '../../components/inputs/CategoryInput.svelte';
	import DateInputs from '../../components/inputs/DateInputs.svelte';
	import DescriptionInput from '../../components/inputs/DescriptionInput.svelte';
	import InterestRateInput from '../../components/inputs/InterestRateInput.svelte';

	export let data;
</script>

<h1>Add Debt</h1>

<form method="POST">
	<AmountInput label="Balance" />
	<AmountInput label="Minimum Payment" name="minimum-payment" />
	<InterestRateInput />
	<CategoryInput categories={data.categories} />
	<DescriptionInput />
	<DateInputs showDate={false} />
	<div>
		<button type="submit">Save Debt</button>
	</div>
</form>
