export const formatAmount = (value) => Number(value.toString().replace(/[^0-9|.]/g, ''));

export const formatDate = (year, month, day) => {
	const numericYear = Number(year);
	const numericMonth = Number(month) - 1;
	const numericDay = Number(day);

	return new Date(numericYear, numericMonth, numericDay);
};
