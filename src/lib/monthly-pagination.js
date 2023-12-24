export const getMontlyPagination = (year, month) => {
	let previousYear = year;
	let nextYear = year;
	let previousMonth = month;
	let nextMonth = month + 2;

	if (previousMonth <= 0) {
		previousYear -= 1;
		previousMonth = 12;
	}

	if (nextMonth > 12) {
		nextYear += 1;
		nextMonth = 1;
	}

	return {
		previous: {
			link: `/overview/${previousYear}/${previousMonth}`,
			text: new Date(previousYear, previousMonth - 1, 1).toLocaleDateString('en-US', {
				year: 'numeric',
				month: 'short',
			}),
		},
		next: {
			link: `/overview/${nextYear}/${nextMonth}`,
			text: new Date(nextYear, nextMonth - 1, 1).toLocaleDateString('en-US', {
				year: 'numeric',
				month: 'short',
			}),
		},
	};
};
