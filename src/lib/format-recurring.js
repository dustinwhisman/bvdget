import { formatDate, formatAmount } from '$lib/format-inputs';

const customAnnualMultiplier = (frequency) => {
	const [interval, unitOfMeasurement] = frequency.split('-');
	switch (unitOfMeasurement) {
		case 'day':
			return 365 / Number.parseInt(interval, 10);
		case 'week':
			return 52 / Number.parseInt(interval, 10);
		case 'month':
			return 12 / Number.parseInt(interval, 10);
		default:
			return 1;
	}
};

export const annualAmount = ({ frequency, amount }) => {
	switch (frequency) {
		case '1-month':
			return amount * 12;
		case '3-month':
			return amount * 4;
		case '6-month':
			return amount * 2;
		case '1-year':
			return amount;
		case '1-week':
			return amount * 52;
		case '2-week':
			return amount * 26;
		case 'twice-per-month':
			return amount * 24;
		default:
			return amount * customAnnualMultiplier(frequency);
	}
};

const customFrequencyDescription = (frequency) => {
	const [interval, unitOfMeasurement] = frequency.split('-');
	return `/${interval} ${unitOfMeasurement}${unitOfMeasurement !== '1' ? 's' : ''}`;
};

export const formatFrequency = (frequency) => {
	switch (frequency) {
		case '1-month':
			return '/month';
		case '3-month':
			return '/3 months';
		case '6-month':
			return '/6 months';
		case '1-year':
			return '/year';
		case '1-week':
			return '/week';
		case '2-week':
			return '/2 weeks';
		case 'twice-per-month':
			return ' twice per month';
		default:
			return customFrequencyDescription(frequency);
	}
};

export const getRecurringEntryFormData = (formData) => {
	const amount = formatAmount(formData.get('amount'));

	const selectedCategory = formData.get('category');
	const newCategory = formData.get('new-category');
	const category = newCategory ?? selectedCategory;

	const description = formData.get('description') || category;

	const now = new Date();
	const year = formData.get('year') ?? now.getFullYear();
	const month = formData.get('month') ?? now.getMonth() + 1;
	const day = formData.get('day') ?? now.getDate();
	const date = formatDate(year, month, day);

	const frequency = formData.get('frequency');
	const interval = formData.get('interval');
	const unitOfMeasurement = formData.get('unitOfMeasurement');
	const days_of_month = formData.getAll('days-of-month') ?? [];
	const active = !!formData.get('active');

	return {
		amount,
		category,
		description,
		date,
		frequency: frequency === 'custom' ? `${interval}-${unitOfMeasurement}` : frequency,
		days_of_month,
		active,
	};
};

export const formatEntry = (entry) => {
	let { frequency } = entry;

	let interval = null;
	let unitOfMeasurement = null;

	switch (frequency) {
		case '1-month':
		case '3-month':
		case '6-month':
		case '1-year':
		case '1-week':
		case '2-week':
		case 'twice-per-month':
			break;
		default:
			[interval, unitOfMeasurement] = frequency.split('-');
			frequency = 'custom';
			break;
	}

	return {
		...entry,
		frequency,
		interval,
		unitOfMeasurement,
	};
};
