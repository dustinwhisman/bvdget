<script>
	export let date = new Date();
	export let showDate = true;
	export let legend = 'Date';

	let year;
	let month;
	let day;

	if (typeof date === 'string') {
		[year, month, day] = date.split('-');
	} else {
		year = date.getFullYear();
		month = date.getMonth() + 1;
		day = showDate ? date.getDate() : 1;
	}
</script>

<fieldset class="cmp-form__fieldset">
	<legend class="util-visually-hidden">{legend}</legend>
	<div class="cmp-form__date">
		<div>
			<label for="year" class="cmp-form__label">Year</label>
			<input
				id="year"
				type="text"
				name="year"
				class="cmp-form__input cmp-form__input--short"
				inputmode="numeric"
				pattern="^[1-2][0-9][0-9][0-9]$"
				required
				value={year}
			/>
		</div>
		<div>
			<label for="month" class="cmp-form__label">Month</label>
			<input
				id="month"
				type="text"
				name="month"
				class="cmp-form__input cmp-form__input--short"
				inputmode="numeric"
				pattern="^(0?[1-9]|1[012])$"
				required
				value={month}
			/>
		</div>
		{#if showDate}
			<div>
				<label for="day" class="cmp-form__label">Day</label>
				<input
					id="day"
					type="text"
					name="day"
					class="cmp-form__input cmp-form__input--short"
					inputmode="numeric"
					pattern="^(0?[1-9]|[12]\d|3[01])$"
					required
					value={day}
				/>
			</div>
		{:else}
			<input type="hidden" name="day" value="1" />
		{/if}
	</div>
</fieldset>
