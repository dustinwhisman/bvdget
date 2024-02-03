import { fail, redirect } from '@sveltejs/kit';
import { getRecurringEntryFormData } from '$lib/format-recurring.js';
import { gateDynamicPage } from '$lib/gate-dynamic-page.js';

export const load = async ({ locals: { supabase } }) => {
	await gateDynamicPage(supabase);

	const { data: categories } = await supabase
		.from('income_categories')
		.select('category')
		.order('category');

	return {
		categories,
		title: 'Add Recurring Income',
	};
};

export const actions = {
	default: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const { amount, category, description, date, frequency, days_of_month, active } =
			getRecurringEntryFormData(formData);

		const {
			data: { user },
		} = await supabase.auth.getUser();
		const { error } = await supabase.from('recurring_income').insert({
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

		throw redirect(303, '/recurring-income');
	},
};
