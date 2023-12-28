export const formatCurrency = (value) =>
	Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
