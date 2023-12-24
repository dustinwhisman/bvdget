import { getMonthlyOverview } from '$lib/monthly-overview.js';
import { getMontlyPagination } from '$lib/monthly-pagination.js';
import { fail } from '@sveltejs/kit';

export const load = async ({ params: { year, month }, locals: { supabase } }) => {
	try {
		// convert string params to numbers, offset month by one so 10 equates to October
		const numericYear = Number(year);
		const numericMonth = Number(month) - 1;
		const formattedDate = new Date(numericYear, numericMonth, 1).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
		});
		const { previous, next } = getMontlyPagination(numericYear, numericMonth);
		const monthlyOverview = await getMonthlyOverview(supabase, numericYear, numericMonth);

		return {
			...monthlyOverview,
			formattedDate,
			previous,
			next,
		};
	} catch (error) {
		return fail(500, { message: 'Server error. Try again later.', success: false });
	}
};
