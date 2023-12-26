import { fail } from '@sveltejs/kit';

export const load = async ({ locals: { supabase } }) => {
	try {
		const { data: categories } = await supabase
			.from('expense_categories')
			.select('category')
			.order('category');

		return {
			categories,
		};
	} catch (error) {
		return fail(500, { message: 'Server error. Try again later.', success: false });
	}
};
