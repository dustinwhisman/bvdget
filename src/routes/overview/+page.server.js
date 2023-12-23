import { fail } from '@sveltejs/kit';

export const load = async ({ locals: { supabase } }) => {
	try {
		const now = new Date();
		const year = now.getFullYear();
		const month = now.getMonth();
		const { data: expenses } = await supabase
			.from('expenses')
			.select('id,date,category,description,amount')
			.gte('date', new Date(year, month, 1).toDateString());

		const { data: income } = await supabase
			.from('income')
			.select('id,date,category,description,amount')
			.gte('date', new Date(year, month, 1).toDateString());

		const { data: savings } = await supabase
			.from('savings')
			.select('id,date,category,description,amount')
			.gte('date', new Date(year, month, 1).toDateString());

		const { data: debt } = await supabase
			.from('debt')
			.select('id,date,category,description,amount,interest_rate,minimum_payment')
			.gte('date', new Date(year, month, 1).toDateString());

		return {
			expenses,
			income,
			savings,
			debt,
		};
	} catch (error) {
		return fail(500, { message: 'Server error. Try again later.', success: false });
	}
};
