<script>
	export let description = '';
</script>

<div>
	<label for="description" class="cmp-form__label">Description (optional)</label>
	<input
		id="description"
		type="text"
		name="description"
		class="cmp-form__input"
		value={description}
		autocapitalize="on"
	/>
</div>
