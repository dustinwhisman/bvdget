<script>
	export let categories = [];
	export let selectedCategory;
</script>

<fieldset>
	<legend>Category</legend>
	<div>
		<div>
			<input
				id="category__new"
				type="radio"
				name="category"
				value="NEW_CATEGORY"
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
		<label for="new-category">New Category</label>
		<input
			id="new-category"
			type="text"
			name="new-category"
			required
			aria-required="true"
			autocapitalize="on"
		/>
	</div>
{/if}
