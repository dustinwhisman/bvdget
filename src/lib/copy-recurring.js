import { redirect } from '@sveltejs/kit';

const setToCurrentMonth = (year, month, day) => {
	let date = new Date(year, month, day);

	// not enough days in month, go back one or more days
	while (date.getMonth() > month) {
		date.setDate(date.getDate() - 1);
	}

	return date;
};

const addEntry = async (supabase, entry, type) => {
	const { error } = await supabase.from(type).insert(entry);

	if (error) {
		throw new Error(error);
	}
};

const copyRecurring =
	(type) =>
	async ({ request, url: { pathname }, locals: { supabase } }) => {
		const formData = await request.formData();
		const year = formData.get('year');
		const month = formData.get('month');

		const numericYear = Number(year);
		const numericMonth = Number(month);

		const currentMonth = new Date(numericYear, numericMonth, 1);
		const nextMonth = new Date(numericYear, numericMonth + 1, 1);

		const { data: recurringEntries } = await supabase
			.from(`recurring_${type}`)
			.select('user_id,date,category,description,amount,frequency,days_of_month')
			.eq('active', true);

		const newEntries = [];

		for (const entry of recurringEntries) {
			const originalDate = new Date(entry.date);
			const originalDateMonth = originalDate.getUTCMonth();
			const originalDateDay = originalDate.getUTCDate();

			switch (entry.frequency) {
				case '1-month': {
					const newEntry = {
						...entry,
						date: setToCurrentMonth(numericYear, numericMonth, originalDateDay),
					};
					delete newEntry.frequency;
					delete newEntry.days_of_month;
					newEntries.push(newEntry);
					break;
				}
				case '3-month': {
					if (Math.abs(numericMonth - originalDateMonth) % 3 === 0) {
						const newEntry = {
							...entry,
							date: setToCurrentMonth(numericYear, numericMonth, originalDateDay),
						};
						delete newEntry.frequency;
						delete newEntry.days_of_month;
						newEntries.push(newEntry);
					}
					break;
				}
				case '6-month': {
					if (Math.abs(numericMonth - originalDateMonth) % 6 === 0) {
						const newEntry = {
							...entry,
							date: setToCurrentMonth(numericYear, numericMonth, originalDateDay),
						};
						delete newEntry.frequency;
						delete newEntry.days_of_month;
						newEntries.push(newEntry);
					}
					break;
				}
				case '1-year': {
					if (numericMonth === originalDateMonth) {
						const newEntry = {
							...entry,
							date: setToCurrentMonth(numericYear, numericMonth, originalDateDay),
						};
						delete newEntry.frequency;
						delete newEntry.days_of_month;
						newEntries.push(newEntry);
					}
					break;
				}
				case '1-week': {
					const gapInDays = Math.floor((currentMonth - originalDate) / 1000 / 3600 / 24);
					const offset = 7 - (gapInDays % 7);
					let newEntryDate = new Date(numericYear, numericMonth, 1 + offset);

					while (newEntryDate < nextMonth) {
						const newEntry = {
							...entry,
							date: new Date(newEntryDate),
						};
						delete newEntry.frequency;
						delete newEntry.days_of_month;
						newEntries.push(newEntry);
						newEntryDate.setDate(newEntryDate.getDate() + 7);
					}
					break;
				}
				case '2-week': {
					const gapInDays = Math.floor((currentMonth - originalDate) / 1000 / 3600 / 24);
					const offset = 14 - (gapInDays % 14);
					let newEntryDate = new Date(numericYear, numericMonth, 1 + offset);

					while (newEntryDate < nextMonth) {
						const newEntry = {
							...entry,
							date: new Date(newEntryDate),
						};
						delete newEntry.frequency;
						delete newEntry.days_of_month;
						newEntries.push(newEntry);
						newEntryDate.setDate(newEntryDate.getDate() + 14);
					}
					break;
				}
				case 'twice-per-month': {
					for (const day of entry.days_of_month) {
						const newEntry = {
							...entry,
							date: setToCurrentMonth(numericYear, numericMonth, day),
						};
						delete newEntry.frequency;
						delete newEntry.days_of_month;
						newEntries.push(newEntry);
					}
					break;
				}
				default: {
					const gapInDays = Math.floor((currentMonth - originalDate) / 1000 / 3600 / 24);
					const [interval, unitOfMeasurement] = entry.frequency.split('-');
					let numberOfDays = 0;
					let numberOfMonths = 0;
					switch (unitOfMeasurement) {
						case 'day':
							numberOfDays = Number.parseInt(interval, 10);
							break;
						case 'week':
							numberOfDays = Number.parseInt(interval, 10) * 7;
							break;
						case 'month':
							numberOfMonths = Number.parseInt(interval, 10);
							break;
						default:
							break;
					}
					if (numberOfDays === 0 && numberOfMonths === 0) {
						break;
					}

					let newEntryDate = new Date(numericYear, numericMonth, originalDateDay);
					if (numberOfDays > 0) {
						const offset = numberOfDays - (gapInDays % numberOfDays);
						newEntryDate = new Date(numericYear, numericMonth, 1 + offset);
					} else if (numberOfMonths > 0) {
						newEntryDate = new Date(
							numericYear,
							originalDateMonth + numberOfMonths,
							originalDateDay
						);
					}

					while (newEntryDate < nextMonth) {
						const newEntry = {
							...entry,
							date: new Date(newEntryDate),
						};
						delete newEntry.frequency;
						delete newEntry.days_of_month;
						newEntries.push(newEntry);
						if (numberOfDays > 0) {
							newEntryDate.setDate(newEntryDate.getDate() + numberOfDays);
						} else {
							newEntryDate.setDate(newEntryDate.getDate() + numberOfMonths * 31);
						}
					}
					break;
				}
			}
		}

		await Promise.all(newEntries.map((entry) => addEntry(supabase, entry, type)));

		throw redirect(303, pathname);
	};

const copyPrevious =
	(type) =>
	async ({ request, url: { pathname }, locals: { supabase } }) => {
		const formData = await request.formData();
		const year = formData.get('year');
		const month = formData.get('month');

		const numericYear = Number(year);
		const numericMonth = Number(month);

		const previousMonth = new Date(numericYear, numericMonth - 1, 1);
		const currentMonth = new Date(numericYear, numericMonth, 1);

		const { data: previousEntries } = await supabase
			.from(type)
			.select()
			.gte('date', previousMonth.toDateString())
			.lt('date', currentMonth.toDateString());

		const newEntries = [];

		for (const entry of previousEntries) {
			const newEntry = {
				...entry,
				date: new Date(numericYear, numericMonth, 1),
			};
			delete newEntry.id;
			delete newEntry.created_at;
			delete newEntry.updated_at;
			newEntries.push(newEntry);
		}

		await Promise.all(newEntries.map((entry) => addEntry(supabase, entry, type)));

		throw redirect(303, pathname);
	};

export const actions = {
	copyExpenses: copyRecurring('expenses'),
	copyIncome: copyRecurring('income'),
	copySavings: copyPrevious('savings'),
	copyDebt: copyPrevious('debt'),
};
