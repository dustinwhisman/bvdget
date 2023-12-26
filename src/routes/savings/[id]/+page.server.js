import { fail, redirect } from '@sveltejs/kit';
import { formatAmount, formatDate } from '$lib/format-inputs.js';

const getCategories = async (supabase) => {
	const { data: categories } = await supabase
		.from('savings_categories')
		.select('category')
		.order('category');

	return categories;
};

const getSavings = async (supabase, id) => {
	const { data: savings } = await supabase
		.from('savings')
		.select('id,date,category,description,amount')
		.eq('id', id);

	if (!savings?.[0]) {
		throw new Error('Could not find the specified savings.');
	}

	return {
		...savings[0],
		date: new Date(`${savings[0].date}T00:00:00.000`),
	};
};

export const load = async ({ params: { id }, locals: { supabase } }) => {
	try {
		const [categories, savings] = await Promise.all([
			getCategories(supabase),
			getSavings(supabase, id),
		]);

		return {
			categories,
			savings,
		};
	} catch (error) {
		return fail(500, { message: 'Server error. Try again later.', success: false });
	}
};

export const actions = {
	default: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const id = formData.get('id');

		const amount = formatAmount(formData.get('amount'));

		const selectedCategory = formData.get('category');
		const newCategory = formData.get('new-category');
		const category = newCategory ?? selectedCategory;

		const description = formData.get('description') || category;

		const year = formData.get('year');
		const month = formData.get('month');
		const day = formData.get('day');
		const date = formatDate(year, month, day);

		const updated_at = new Date();

		const { error } = await supabase
			.from('savings')
			.update({ date, category, description, amount, updated_at })
			.eq('id', id);

		if (error) {
			return fail(500, { message: 'Server error. Try again later.', success: false });
		}

		throw redirect(303, '/overview');
	},
};
