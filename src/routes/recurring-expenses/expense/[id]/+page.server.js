import { fail, redirect } from '@sveltejs/kit';
import { getRecurringEntryFormData, formatEntry } from '$lib/format-recurring.js';
import { gateDynamicPage } from '$lib/gate-dynamic-page.js';

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

	return formatEntry(expense[0]);
};

export const load = async ({ params: { id }, locals: { supabase } }) => {
	await gateDynamicPage(supabase);

	const [categories, expense] = await Promise.all([
		getCategories(supabase),
		getExpense(supabase, id),
	]);

	return {
		categories,
		expense,
		title: 'Edit Recurring Expense',
	};
};

export const actions = {
	edit: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const id = formData.get('id');

		const { amount, category, description, date, frequency, days_of_month, active } =
			getRecurringEntryFormData(formData);

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
