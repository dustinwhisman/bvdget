<script>
	import DateInputs from './DateInputs.svelte';

	export let selectedFrequency = '1-month';
	export let daysOfMonth = [];
</script>

<fieldset>
	<legend>Frequency</legend>
	<div>
		<div>
			<input
				id="frequency__1-month"
				type="radio"
				name="frequency"
				value="1-month"
				bind:group={selectedFrequency}
			/>
			<label for="frequency__1-month">Every Month</label>
		</div>
		<div>
			<input
				id="frequency__3-month"
				type="radio"
				name="frequency"
				value="3-month"
				bind:group={selectedFrequency}
			/>
			<label for="frequency__3-month">Every 3 Months</label>
		</div>
		<div>
			<input
				id="frequency__6-month"
				type="radio"
				name="frequency"
				value="6-month"
				bind:group={selectedFrequency}
			/>
			<label for="frequency__6-month">Every 6 Months</label>
		</div>
		<div>
			<input
				id="frequency__1-year"
				type="radio"
				name="frequency"
				value="1-year"
				bind:group={selectedFrequency}
			/>
			<label for="frequency__1-year">Every Year</label>
		</div>
		<div>
			<input
				id="frequency__1-week"
				type="radio"
				name="frequency"
				value="1-week"
				bind:group={selectedFrequency}
			/>
			<label for="frequency__1-week">Every Week</label>
		</div>
		<div>
			<input
				id="frequency__2-week"
				type="radio"
				name="frequency"
				value="2-week"
				bind:group={selectedFrequency}
			/>
			<label for="frequency__2-week">Every 2 Weeks</label>
		</div>
		<div>
			<input
				id="frequency__twice-per-month"
				type="radio"
				name="frequency"
				value="twice-per-month"
				bind:group={selectedFrequency}
			/>
			<label for="frequency__twice-per-month">Twice per Month</label>
		</div>
	</div>
</fieldset>

{#if selectedFrequency === 'twice-per-month'}
	<fieldset>
		<legend>Choose which days of the month this expense typically occurs on</legend>
		<div>
			{#each Array(31) as day, index}
				<div>
					<input
						id="day__{index + 1}"
						type="checkbox"
						name="days-of-month"
						value={index + 1}
						bind:group={daysOfMonth}
					/>
					<label for="day__{index + 1}">{index + 1}</label>
				</div>
			{/each}
		</div>
	</fieldset>
{:else}
	<DateInputs legend="Choose the most recent date when this expense occurred" />
{/if}
