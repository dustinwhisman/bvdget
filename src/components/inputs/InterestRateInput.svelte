<script>
	export let interestRate = '';
</script>

<div>
	<label for="interest-rate" class="cmp-form__label">Interest Rate</label>
	<input
		id="interest-rate"
		type="text"
		name="interest-rate"
		class="cmp-form__input cmp-form__input--short"
		inputmode="numeric"
		pattern={'^(\\s{1,})?\\d{1,2}(\\.\\d+)?(%)?(\\s{1,})?$'}
		required
		value={interestRate}
	/>
</div>
