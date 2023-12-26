import { fail, redirect } from '@sveltejs/kit';
import { formatAmount, formatDate } from '$lib/format-inputs.js';

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

export const actions = {
	default: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const amount = formatAmount(formData.get('amount'));

		const selectedCategory = formData.get('category');
		const newCategory = formData.get('new-category');
		const category = newCategory ?? selectedCategory;

		const description = formData.get('description') || category;

		const now = new Date();
		const year = formData.get('year') ?? now.getFullYear();
		const month = formData.get('month') ?? now.getMonth() + 1;
		const day = formData.get('day') ?? now.getDate();
		const date = formatDate(year, month, day);

		const frequency = formData.get('frequency');
		const days_of_month = formData.getAll('days-of-month') ?? [];
		const active = !!formData.get('active');

		const {
			data: { user },
		} = await supabase.auth.getUser();
		const { error } = await supabase.from('recurring_expenses').insert({
			user_id: user.id,
			date,
			category,
			description,
			amount,
			frequency,
			days_of_month,
			active,
		});

		if (error) {
			return fail(500, { message: 'Server error. Try again later.', success: false });
		}

		throw redirect(303, '/recurring-expenses');
	},
};
