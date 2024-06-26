import { fail, redirect } from '@sveltejs/kit';
import { formatAmount, formatDate } from '$lib/format-inputs.js';
import { gateDynamicPage } from '$lib/gate-dynamic-page.js';

export const load = async ({ locals: { supabase } }) => {
	await gateDynamicPage(supabase);

	const { data: categories } = await supabase
		.from('savings_categories')
		.select('category')
		.order('category');

	return {
		categories,
		title: 'Add Savings',
	};
};

export const actions = {
	default: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const amount = formatAmount(formData.get('amount'));

		const selectedCategory = formData.get('category');
		const newCategory = formData.get('new-category');
		const category = newCategory || selectedCategory || 'Unspecified';

		const description = formData.get('description') || category;

		const year = formData.get('year');
		const month = formData.get('month');
		const day = formData.get('day');
		const date = formatDate(year, month, day);

		const {
			data: { user },
		} = await supabase.auth.getUser();
		const { error } = await supabase
			.from('savings')
			.insert({ user_id: user.id, date, category, description, amount });

		if (error) {
			return fail(500, { message: 'Server error. Try again later.', success: false });
		}

		throw redirect(303, '/overview');
	},
};
