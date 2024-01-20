<script>
	export let isActive = false;
</script>

<div>
	<input
		id="is-active"
		type="checkbox"
		name="active"
		checked={isActive}
		class="cmp-form__checkbox-input"
	/>
	<label for="is-active">This is currently active</label>
</div>
