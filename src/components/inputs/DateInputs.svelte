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

<fieldset>
	<legend>{legend}</legend>
	<div>
		<div>
			<label for="year">Year</label>
			<input
				id="year"
				type="text"
				name="year"
				inputmode="numeric"
				pattern="^[1-2][0-9][0-9][0-9]$"
				required
				value={year}
			/>
		</div>
		<div>
			<label for="month">Month</label>
			<input
				id="month"
				type="text"
				name="month"
				inputmode="numeric"
				pattern="^(0?[1-9]|1[012])$"
				required
				value={month}
			/>
		</div>
		{#if showDate}
			<div>
				<label for="day">Day</label>
				<input
					id="day"
					type="text"
					name="day"
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
