<script>
	import { formatCurrency } from '$lib/format-currency';
	export let amount = '';
	export let label = 'Amount';
	export let name = 'amount';

	if (amount !== '') {
		amount = formatCurrency(amount);
	}
</script>

<div>
	<label for={name} class="cmp-form__label">{label}</label>
	<input
		id={name}
		type="text"
		{name}
		class="cmp-form__input cmp-form__input--medium"
		inputmode="numeric"
		pattern={'^(\\s{1,})?\\$?\\d{1,3}(,?\\d{3})*(\\.\\d{1,2})?(\\s{1,})?$'}
		required
		value={amount}
	/>
</div>
