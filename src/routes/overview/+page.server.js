import { getMonthlyOverview } from '$lib/monthly-overview.js';
import { getMontlyPagination } from '$lib/monthly-pagination.js';
import { gateDynamicPage } from '$lib/gate-dynamic-page.js';

export const load = async ({ locals: { supabase } }) => {
	await gateDynamicPage(supabase);
	const now = new Date();
	const year = now.getFullYear();
	const month = now.getMonth();
	const formattedDate = now.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'short',
	});
	const { previous, next } = getMontlyPagination(year, month);
	const monthlyOverview = await getMonthlyOverview(supabase, year, month);

	return {
		...monthlyOverview,
		formattedDate,
		previous,
		next,
	};
};
