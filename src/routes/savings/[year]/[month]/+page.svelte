<script>
	import { formatCurrency } from '$lib/format-currency';

	export let data;
</script>

<h1>Savings: {data.formattedDate}</h1>

{#if data.savings.length}
	<form class="cmp-form">
		{#each data.savings as category}
			<fieldset class="cmp-form__fieldset">
				<legend class="cmp-form__legend cmp-form__legend--large">{category.name}</legend>
				<div class="cmp-form__bulk-edit">
					{#each category.entries as entry}
						<div>
							<label for={entry.id} class="cmp-form__label">{entry.description}</label>
							<input
								id={entry.id}
								type="text"
								name={entry.id}
								class="cmp-form__input cmp-form__input--medium"
								inputmode="numeric"
								pattern={'^(\\s{1,})?\\$?\\d{1,3}(,?\\d{3})*(\\.\\d{1,2})?(\\s{1,})?$'}
								required
								value={formatCurrency(entry.amount)}
							/>
						</div>
					{/each}
				</div>
			</fieldset>
		{/each}
		<div>
			<button type="submit" class="cmp-form__button">Save Changes</button>
		</div>
	</form>
{:else}
	<p>No savings found.</p>
{/if}
