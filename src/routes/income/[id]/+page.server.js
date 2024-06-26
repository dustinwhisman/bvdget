import { fail, redirect } from '@sveltejs/kit';
import { formatAmount, formatDate } from '$lib/format-inputs.js';
import { gateDynamicPage } from '$lib/gate-dynamic-page.js';

const getCategories = async (supabase) => {
	const { data: categories } = await supabase
		.from('income_categories')
		.select('category')
		.order('category');

	return categories;
};

const getIncome = async (supabase, id) => {
	const { data: income } = await supabase
		.from('income')
		.select('id,date,category,description,amount')
		.eq('id', id);

	if (!income?.[0]) {
		throw new Error('Could not find the specified income.');
	}

	return income[0];
};

export const load = async ({ params: { id }, locals: { supabase } }) => {
	await gateDynamicPage(supabase);

	const [categories, income] = await Promise.all([
		getCategories(supabase),
		getIncome(supabase, id),
	]);

	return {
		categories,
		income,
		title: 'Edit Income',
	};
};

export const actions = {
	edit: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const id = formData.get('id');

		const amount = formatAmount(formData.get('amount'));

		const selectedCategory = formData.get('category');
		const newCategory = formData.get('new-category');
		const category = newCategory || selectedCategory || 'Unspecified';

		const description = formData.get('description') || category;

		const year = formData.get('year');
		const month = formData.get('month');
		const day = formData.get('day');
		const date = formatDate(year, month, day);

		const updated_at = new Date();

		const { error } = await supabase
			.from('income')
			.update({ date, category, description, amount, updated_at })
			.eq('id', id);

		if (error) {
			return fail(500, { message: 'Server error. Try again later.', success: false });
		}

		throw redirect(303, '/overview');
	},
	delete: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const id = formData.get('id');

		const { error } = await supabase.from('income').delete().eq('id', id);

		if (error) {
			return fail(500, { message: 'Server error. Try again later.', success: false });
		}

		throw redirect(303, '/overview');
	},
};
