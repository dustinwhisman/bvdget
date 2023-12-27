import { fail, redirect } from '@sveltejs/kit';
import { formatAmount, formatDate } from '$lib/format-inputs.js';

const getCategories = async (supabase) => {
	const { data: categories } = await supabase
		.from('expense_categories')
		.select('category')
		.order('category');

	return categories;
};

const getExpense = async (supabase, id) => {
	const { data: expense } = await supabase
		.from('recurring_expenses')
		.select('id,date,category,description,amount,frequency,days_of_month,active')
		.eq('id', id);

	if (!expense?.[0]) {
		throw new Error('Could not find the specified expense.');
	}

	return expense[0];
};

export const load = async ({ params: { id }, locals: { supabase } }) => {
	try {
		const [categories, expense] = await Promise.all([
			getCategories(supabase),
			getExpense(supabase, id),
		]);

		return {
			categories,
			expense,
		};
	} catch (error) {
		return fail(500, { message: 'Server error. Try again later.', success: false });
	}
};

export const actions = {
	edit: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const id = formData.get('id');

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

		const updated_at = new Date();

		const { error } = await supabase
			.from('recurring_expenses')
			.update({
				date,
				category,
				description,
				amount,
				frequency,
				days_of_month,
				active,
				updated_at,
			})
			.eq('id', id);

		if (error) {
			return fail(500, { message: 'Server error. Try again later.', success: false });
		}

		throw redirect(303, '/recurring-expenses');
	},
	delete: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const id = formData.get('id');

		const { error } = await supabase.from('recurring_expenses').delete().eq('id', id);

		if (error) {
			return fail(500, { message: 'Server error. Try again later.', success: false });
		}

		throw redirect(303, '/recurring-expenses');
	},
};