<script>
	export let amount = '';
</script>

<div>
	<label for="amount">Amount</label>
	<input
		id="amount"
		type="text"
		name="amount"
		inputmode="numeric"
		pattern={'^(\\s{1,})?\\$?\\d{1,3}(,?\\d{3})*(\\.\\d+)?(\\s{1,})?$'}
		required
		aria-required="true"
		value={amount}
	/>
</div>
