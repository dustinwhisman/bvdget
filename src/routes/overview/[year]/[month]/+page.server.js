import { getMonthlyOverview } from '$lib/monthly-overview.js';
import { getMontlyPagination } from '$lib/monthly-pagination.js';
import { gateDynamicPage } from '$lib/gate-dynamic-page.js';

export { actions } from '$lib/copy-recurring';

export const load = async ({ params: { year, month }, locals: { supabase } }) => {
	await gateDynamicPage(supabase);

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
		title: formattedDate,
	};
};
