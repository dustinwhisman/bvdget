export const load = async ({ locals: { supabase } }) => {
	const { data: recurringIncome } = await supabase
		.from('recurring_income')
		.select('id,date,description,amount,frequency,active')
		.order('active', { ascending: false })
		.order('amount', { ascending: false });

	return {
		recurringIncome,
	};
};
