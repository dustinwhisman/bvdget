import { getMonthlyOverview } from '$lib/monthly-overview.js';
import { fail } from '@sveltejs/kit';

export const load = async ({ locals: { supabase } }) => {
	try {
		const now = new Date();
		const year = now.getFullYear();
		const month = now.getMonth();
		const formattedDate = now.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
		});
		const monthlyOverview = await getMonthlyOverview(supabase, year, month);

		return {
			...monthlyOverview,
			formattedDate,
		};
	} catch (error) {
		return fail(500, { message: 'Server error. Try again later.', success: false });
	}
};
