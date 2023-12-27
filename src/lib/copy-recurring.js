import { redirect } from '@sveltejs/kit';

const setToCurrentMonth = (year, month, day) => {
	let date = new Date(year, month, day);

	// not enough days in month, go back one or more days
	while (date.getMonth() > month) {
		date.setDate(date.getDate() - 1);
	}

	return date;
};

const addExpense = async (supabase, expense) => {
	const { error } = await supabase.from('expenses').insert(expense);

	if (error) {
		throw new Error(error);
	}
};

export const actions = {
	copyExpenses: async ({ request, url: { pathname }, locals: { supabase } }) => {
		const formData = await request.formData();
		const year = formData.get('year');
		const month = formData.get('month');

		const numericYear = Number(year);
		const numericMonth = Number(month);

		const currentMonth = new Date(numericYear, numericMonth, 1);
		const nextMonth = new Date(numericYear, numericMonth + 1, 1);

		const { data: recurringExpenses } = await supabase
			.from('recurring_expenses')
			.select('user_id,date,category,description,amount,frequency,days_of_month')
			.eq('active', true);

		const newExpenses = [];

		for (const expense of recurringExpenses) {
			const originalDate = new Date(expense.date);
			const originalDateMonth = originalDate.getUTCMonth();
			const originalDateDay = originalDate.getUTCDate();

			switch (expense.frequency) {
				case '1-month': {
					const newExpense = {
						...expense,
						date: setToCurrentMonth(numericYear, numericMonth, originalDateDay),
					};
					delete newExpense.frequency;
					delete newExpense.days_of_month;
					newExpenses.push(newExpense);
					break;
				}
				case '3-month': {
					if (Math.abs(numericMonth - originalDateMonth) % 3 === 0) {
						const newExpense = {
							...expense,
							date: setToCurrentMonth(numericYear, numericMonth, originalDateDay),
						};
						delete newExpense.frequency;
						delete newExpense.days_of_month;
						newExpenses.push(newExpense);
					}
					break;
				}
				case '6-month': {
					if (Math.abs(numericMonth - originalDateMonth) % 6 === 0) {
						const newExpense = {
							...expense,
							date: setToCurrentMonth(numericYear, numericMonth, originalDateDay),
						};
						delete newExpense.frequency;
						delete newExpense.days_of_month;
						newExpenses.push(newExpense);
					}
					break;
				}
				case '1-year': {
					if (numericMonth === originalDateMonth) {
						const newExpense = {
							...expense,
							date: setToCurrentMonth(numericYear, numericMonth, originalDateDay),
						};
						delete newExpense.frequency;
						delete newExpense.days_of_month;
						newExpenses.push(newExpense);
					}
					break;
				}
				case '1-week': {
					const gapInDays = Math.floor((currentMonth - originalDate) / 1000 / 3600 / 24);
					const offset = 7 - (gapInDays % 7);
					let newExpenseDate = new Date(numericYear, numericMonth, 1 + offset);

					while (newExpenseDate < nextMonth) {
						const newExpense = {
							...expense,
							date: new Date(newExpenseDate),
						};
						delete newExpense.frequency;
						delete newExpense.days_of_month;
						newExpenses.push(newExpense);
						newExpenseDate.setDate(newExpenseDate.getDate() + 7);
					}
					break;
				}
				case '2-week': {
					const gapInDays = Math.floor((currentMonth - originalDate) / 1000 / 3600 / 24);
					const offset = 14 - (gapInDays % 14);
					let newExpenseDate = new Date(numericYear, numericMonth, 1 + offset);

					while (newExpenseDate < nextMonth) {
						const newExpense = {
							...expense,
							date: new Date(newExpenseDate),
						};
						delete newExpense.frequency;
						delete newExpense.days_of_month;
						newExpenses.push(newExpense);
						newExpenseDate.setDate(newExpenseDate.getDate() + 14);
					}
					break;
				}
				case 'twice-per-month': {
					for (const day of expense.days_of_month) {
						const newExpense = {
							...expense,
							date: setToCurrentMonth(numericYear, numericMonth, day),
						};
						delete newExpense.frequency;
						delete newExpense.days_of_month;
						newExpenses.push(newExpense);
					}
					break;
				}
				default: {
					break;
				}
			}
		}

		await Promise.all(newExpenses.map((expense) => addExpense(supabase, expense)));

		throw redirect(303, pathname);
	},
};
