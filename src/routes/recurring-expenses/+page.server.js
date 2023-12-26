export const load = async ({ locals: { supabase } }) => {
	const { data: recurringExpenses } = await supabase
		.from('recurring_expenses')
		.select('id,date,description,amount,frequency,active')
		.order('active', { ascending: false })
		.order('amount', { ascending: false });

	return {
		recurringExpenses,
	};
};
