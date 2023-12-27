<script>
	export let interestRate = '';
</script>

<div>
	<label for="interest-rate">Interest Rate</label>
	<input
		id="interest-rate"
		type="text"
		name="interest-rate"
		inputmode="numeric"
		pattern={'^(\\s{1,})?\\d{1,2}(\\.\\d+)?(%)?(\\s{1,})?$'}
		required
		value={interestRate}
	/>
</div>
