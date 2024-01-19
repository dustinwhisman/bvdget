<script>
	export let categories = [];
	export let selectedCategory;
</script>

<fieldset class="cmp-form__fieldset">
	<legend class="cmp-form__legend">Category</legend>
	<div class="cmp-form__radios">
		<div>
			<input
				id="category__new"
				type="radio"
				name="category"
				value="NEW_CATEGORY"
				class="cmp-form__radio-input"
				required
				bind:group={selectedCategory}
			/>
			<label for="category__new">New Category</label>
		</div>
		{#each categories as { category }, index}
			<div>
				<input
					id="category__{index}"
					type="radio"
					name="category"
					value={category}
					class="cmp-form__radio-input"
					required
					bind:group={selectedCategory}
				/>
				<label for="category__{index}">{category}</label>
			</div>
		{/each}
	</div>
</fieldset>
{#if selectedCategory === 'NEW_CATEGORY'}
	<div>
		<label for="new-category" class="cmp-form__label">New Category</label>
		<input
			id="new-category"
			type="text"
			name="new-category"
			class="cmp-form__input"
			required
			autocapitalize="on"
		/>
	</div>
{/if}
