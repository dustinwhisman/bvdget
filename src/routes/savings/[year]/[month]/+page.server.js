import { fail, redirect } from '@sveltejs/kit';
import { getSavings } from '$lib/monthly-overview.js';
import { gateDynamicPage } from '$lib/gate-dynamic-page.js';
import { formatAmount } from '$lib/format-inputs.js';

export const load = async ({ params: { year, month }, locals: { supabase } }) => {
	await gateDynamicPage(supabase);

	// convert string params to numbers, offset month by one so 10 equates to October
	const numericYear = Number(year);
	const numericMonth = Number(month) - 1;
	const formattedDate = new Date(numericYear, numericMonth, 1).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'short',
	});
	const currentMonth = new Date(numericYear, numericMonth, 1).toDateString();
	const nextMonth = new Date(numericYear, numericMonth + 1, 1).toDateString();
	const savings = await getSavings(supabase, currentMonth, nextMonth);

	return {
		savings,
		formattedDate,
		title: `Savings: ${formattedDate}`,
	};
};

export const actions = {
	default: async ({ request, locals: { supabase } }) => {
		try {
			const formData = await request.formData();
			const savePromises = Array.from(formData.entries()).map(async ([key, value]) => {
				const amount = formatAmount(value);
				const { error } = await supabase.from('savings').update({ amount }).eq('id', key).select();

				if (error) {
					throw new Error(error.message);
				}
			});

			await Promise.all(savePromises);
		} catch {
			return fail(500, { message: 'Server error. Try again later.', success: false });
		}

		throw redirect(303, '/overview');
	},
};
