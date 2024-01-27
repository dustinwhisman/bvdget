import { getSavings } from '$lib/monthly-overview.js';
import { gateDynamicPage } from '$lib/gate-dynamic-page.js';

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
