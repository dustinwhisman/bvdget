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
			return 0;
	}
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
			return '';
	}
};
