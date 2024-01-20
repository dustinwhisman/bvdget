<script>
	import AmountInput from '../../../components/inputs/AmountInput.svelte';
	import CategoryInput from '../../../components/inputs/CategoryInput.svelte';
	import DescriptionInput from '../../../components/inputs/DescriptionInput.svelte';
	import FrequencyInput from '../../../components/inputs/FrequencyInput.svelte';
	import IsActiveInput from '../../../components/inputs/IsActiveInput.svelte';

	export let data;
</script>

<h1>Add Recurring Income</h1>

<form method="POST" class="cmp-form" aria-label="Add recurring income">
	<CategoryInput categories={data.categories} />
	<DescriptionInput />
	<AmountInput />
	<FrequencyInput />
	<IsActiveInput />
	<div>
		<button type="submit" class="cmp-form__button">Save Recurring Income</button>
	</div>
</form>
