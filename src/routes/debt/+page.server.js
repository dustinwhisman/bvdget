import { fail, redirect } from '@sveltejs/kit';
import { formatAmount, formatDate } from '$lib/format-inputs.js';

export const load = async ({ locals: { supabase } }) => {
	try {
		const { data: categories } = await supabase
			.from('debt_categories')
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

		const {
			data: { user },
		} = await supabase.auth.getUser();
		const { error } = await supabase
			.from('debt')
			.insert({
				user_id: user.id,
				date,
				category,
				description,
				amount,
				minimum_payment,
				interest_rate,
			});

		if (error) {
			return fail(500, { message: 'Server error. Try again later.', success: false });
		}

		throw redirect(303, '/overview');
	},
};
