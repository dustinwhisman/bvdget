<script>
	export let amount = '';
	export let label = 'Amount';
	export let name = 'amount';
</script>

<div>
	<label for={name}>{label}</label>
	<input
		id={name}
		type="text"
		{name}
		inputmode="numeric"
		pattern={'^(\\s{1,})?\\$?\\d{1,3}(,?\\d{3})*(\\.\\d{1,2})?(\\s{1,})?$'}
		required
		value={amount}
	/>
</div>
