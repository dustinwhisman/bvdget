<script>
	export let date = new Date();
	export let showDate = true;

	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = showDate ? date.getDate() : 1;
</script>

<fieldset>
	<legend>Date</legend>
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
				aria-required="true"
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
				aria-required="true"
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
					aria-required="true"
					value={day}
				/>
			</div>
		{:else}
			<input type="hidden" name="day" value="1" />
		{/if}
	</div>
</fieldset>
