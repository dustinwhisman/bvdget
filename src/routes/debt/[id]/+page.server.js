import { fail, redirect } from '@sveltejs/kit';
import { formatAmount, formatDate } from '$lib/format-inputs.js';
import { gateDynamicPage } from '$lib/gate-dynamic-page.js';

const getCategories = async (supabase) => {
	const { data: categories } = await supabase
		.from('debt_categories')
		.select('category')
		.order('category');

	return categories;
};

const getDebt = async (supabase, id) => {
	const { data: debt } = await supabase
		.from('debt')
		.select('id,date,category,description,amount,minimum_payment,interest_rate')
		.eq('id', id);

	if (!debt?.[0]) {
		throw new Error('Could not find the specified debt.');
	}

	return debt[0];
};

export const load = async ({ params: { id }, locals: { supabase } }) => {
	await gateDynamicPage(supabase);

	const [categories, debt] = await Promise.all([getCategories(supabase), getDebt(supabase, id)]);

	return {
		categories,
		debt,
		title: 'Edit Debt',
	};
};

export const actions = {
	edit: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const id = formData.get('id');

		const amount = formatAmount(formData.get('amount'));
		const minimum_payment = formatAmount(formData.get('minimum-payment'));
		const interest_rate = formatAmount(formData.get('interest-rate'));

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
			.from('debt')
			.update({ date, category, description, amount, minimum_payment, interest_rate, updated_at })
			.eq('id', id);

		if (error) {
			return fail(500, { message: 'Server error. Try again later.', success: false });
		}

		throw redirect(303, '/overview');
	},
	delete: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const id = formData.get('id');

		const { error } = await supabase.from('debt').delete().eq('id', id);

		if (error) {
			return fail(500, { message: 'Server error. Try again later.', success: false });
		}

		throw redirect(303, '/overview');
	},
};
