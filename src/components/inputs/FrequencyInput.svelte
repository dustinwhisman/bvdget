<script>
	import DateInputs from './DateInputs.svelte';

	export let selectedFrequency = '1-month';
	export let interval = null;
	export let unitOfMeasurement = null;
	export let daysOfMonth = [];
	export let date;
</script>

<fieldset class="cmp-form__fieldset cmp-form__fieldset--frequency">
	<legend class="cmp-form__legend">Frequency</legend>
	<div class="cmp-form__radios">
		<div class="cmp-form__radio-wrapper">
			<input
				id="frequency__1-month"
				type="radio"
				name="frequency"
				value="1-month"
				bind:group={selectedFrequency}
				class="cmp-form__radio-input"
			/>
			<label for="frequency__1-month">Every Month</label>
		</div>
		<div class="cmp-form__radio-wrapper">
			<input
				id="frequency__3-month"
				type="radio"
				name="frequency"
				value="3-month"
				bind:group={selectedFrequency}
				class="cmp-form__radio-input"
			/>
			<label for="frequency__3-month">Every 3 Months</label>
		</div>
		<div class="cmp-form__radio-wrapper">
			<input
				id="frequency__6-month"
				type="radio"
				name="frequency"
				value="6-month"
				bind:group={selectedFrequency}
				class="cmp-form__radio-input"
			/>
			<label for="frequency__6-month">Every 6 Months</label>
		</div>
		<div class="cmp-form__radio-wrapper">
			<input
				id="frequency__1-year"
				type="radio"
				name="frequency"
				value="1-year"
				bind:group={selectedFrequency}
				class="cmp-form__radio-input"
			/>
			<label for="frequency__1-year">Every Year</label>
		</div>
		<div class="cmp-form__radio-wrapper">
			<input
				id="frequency__1-week"
				type="radio"
				name="frequency"
				value="1-week"
				bind:group={selectedFrequency}
				class="cmp-form__radio-input"
			/>
			<label for="frequency__1-week">Every Week</label>
		</div>
		<div class="cmp-form__radio-wrapper">
			<input
				id="frequency__2-week"
				type="radio"
				name="frequency"
				value="2-week"
				bind:group={selectedFrequency}
				class="cmp-form__radio-input"
			/>
			<label for="frequency__2-week">Every 2 Weeks</label>
		</div>
		<div class="cmp-form__radio-wrapper">
			<input
				id="frequency__twice-per-month"
				type="radio"
				name="frequency"
				value="twice-per-month"
				bind:group={selectedFrequency}
				class="cmp-form__radio-input"
			/>
			<label for="frequency__twice-per-month">Twice per Month</label>
		</div>
		<div class="cmp-form__radio-wrapper">
			<input
				id="frequency__custom"
				type="radio"
				name="frequency"
				value="custom"
				bind:group={selectedFrequency}
				class="cmp-form__radio-input"
			/>
			<label for="frequency__custom">Custom</label>
		</div>
	</div>
</fieldset>
<div class="cmp-form__twice-per-month">
	<fieldset class="cmp-form__fieldset">
		<legend class="cmp-form__legend"
			>Choose which days of the month this expense typically occurs on</legend
		>
		<div class="cmp-form__date-grid">
			<!-- eslint-disable-next-line no-unused-vars -->
			{#each Array(31) as day, index}
				<div>
					<input
						id="day__{index + 1}"
						type="checkbox"
						name="days-of-month"
						value={index + 1}
						bind:group={daysOfMonth}
						class="cmp-form__checkbox-input"
					/>
					<label for="day__{index + 1}">{index + 1}</label>
				</div>
			{/each}
		</div>
	</fieldset>
</div>
<div class="cmp-form cmp-form__custom-frequency">
	<div>
		<label for="interval" class="cmp-form__label">Interval</label>
		<input
			id="interval"
			type="text"
			name="interval"
			value={interval}
			class="cmp-form__input cmp-form__input--short"
			inputmode="numeric"
			pattern="^(0|[1-9]\d*)$"
		/>
	</div>
	<fieldset class="cmp-form__fieldset">
		<legend class="cmp-form__legend">Unit of measurement</legend>
		<div class="cmp-form__radios">
			<div>
				<input
					id="interval__days"
					type="radio"
					name="unitOfMeasurement"
					value="day"
					bind:group={unitOfMeasurement}
					class="cmp-form__radio-input"
				/>
				<label for="interval__days">Days</label>
			</div>
			<div>
				<input
					id="interval__weeks"
					type="radio"
					name="unitOfMeasurement"
					value="week"
					bind:group={unitOfMeasurement}
					class="cmp-form__radio-input"
				/>
				<label for="interval__weeks">Weeks</label>
			</div>
			<div>
				<input
					id="interval__months"
					type="radio"
					name="unitOfMeasurement"
					value="month"
					bind:group={unitOfMeasurement}
					class="cmp-form__radio-input"
				/>
				<label for="interval__months">Months</label>
			</div>
		</div>
	</fieldset>
</div>
<div class="cmp-form__default-frequency">
	<DateInputs legend="Choose the most recent date when this expense occurred" {date} />
</div>
