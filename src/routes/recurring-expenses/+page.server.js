import { gateDynamicPage } from '$lib/gate-dynamic-page.js';
import { annualAmount } from '$lib/format-recurring.js';

export const load = async ({ locals: { supabase } }) => {
	await gateDynamicPage(supabase);

	const { data: recurringExpenses } = await supabase
		.from('recurring_expenses')
		.select('id,date,description,amount,frequency,active');

	const sortedRecurringExpenses = recurringExpenses
		.map((expense) => ({
			...expense,
			annualAmount: annualAmount(expense),
		}))
		.sort((a, b) => {
			if (a.active && !b.active) {
				return -1;
			}

			if (!a.active && b.active) {
				return 1;
			}

			return a.annualAmount < b.annualAmount ? 1 : -1;
		});

	return {
		recurringExpenses: sortedRecurringExpenses,
		title: 'Manage Recurring Expenses',
	};
};
