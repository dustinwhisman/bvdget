const sortByAmount = (a, b) => {
	if (a.amount > b.amount) {
		return -1;
	}

	if (a.amount < b.amount) {
		return 1;
	}

	if (a.date > b.date) {
		return 1;
	}

	if (a.date < b.date) {
		return -1;
	}

	if (a.name > b.name) {
		return -1;
	}

	if (a.name < b.name) {
		return 1;
	}

	return 0;
};

export const groupByCategory = (entries) => {
	const groupedEntries = entries.reduce(
		(acc, entry) => ({
			...acc,
			[entry.category]: {
				amount: (acc[entry.category]?.amount ?? 0) + entry.amount,
				entries: [...(acc[entry.category]?.entries ?? []), entry],
			},
		}),
		{}
	);

	const sortedCategories = Object.entries(groupedEntries)
		.map(([key, value]) => ({
			name: key,
			amount: value.amount,
			entries: value.entries.sort(sortByAmount),
		}))
		.sort(sortByAmount);

	return sortedCategories;
};
