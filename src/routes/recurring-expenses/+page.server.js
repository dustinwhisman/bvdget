import { gateDynamicPage } from '$lib/gate-dynamic-page.js';

export const load = async ({ locals: { supabase } }) => {
	await gateDynamicPage(supabase);

	const { data: recurringExpenses } = await supabase
		.from('recurring_expenses')
		.select('id,date,description,amount,frequency,active')
		.order('active', { ascending: false })
		.order('amount', { ascending: false });

	return {
		recurringExpenses,
		title: 'Manage Recurring Expenses',
	};
};
