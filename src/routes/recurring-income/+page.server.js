import { gateDynamicPage } from '$lib/gate-dynamic-page.js';

export const load = async ({ locals: { supabase } }) => {
	await gateDynamicPage(supabase);

	const { data: recurringIncome } = await supabase
		.from('recurring_income')
		.select('id,date,description,amount,frequency,active')
		.order('active', { ascending: false })
		.order('amount', { ascending: false });

	return {
		recurringIncome,
		title: 'Manage Recurring Income',
	};
};
