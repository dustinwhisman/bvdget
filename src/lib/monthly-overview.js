import { groupByCategory } from './group-by-category';

export const getExpenses = async (supabase, currentMonth, nextMonth) => {
	const { data: expenses } = await supabase
		.from('expenses')
		.select('id,date,category,description,amount')
		.gte('date', currentMonth)
		.lt('date', nextMonth);

	return groupByCategory(expenses);
};

export const getIncome = async (supabase, currentMonth, nextMonth) => {
	const { data: income } = await supabase
		.from('income')
		.select('id,date,category,description,amount')
		.gte('date', currentMonth)
		.lt('date', nextMonth);

	return groupByCategory(income);
};

export const getSavings = async (supabase, currentMonth, nextMonth) => {
	const { data: savings } = await supabase
		.from('savings')
		.select('id,date,category,description,amount')
		.gte('date', currentMonth)
		.lt('date', nextMonth);

	return groupByCategory(savings);
};

export const getDebt = async (supabase, currentMonth, nextMonth) => {
	const { data: debt } = await supabase
		.from('debt')
		.select('id,date,category,description,amount,interest_rate,minimum_payment')
		.gte('date', currentMonth)
		.lt('date', nextMonth);

	return groupByCategory(debt);
};

const hasRecurringExpenses = async (supabase) => {
	const { count } = await supabase
		.from('recurring_expenses')
		.select('*', { count: 'exact', head: true })
		.eq('active', true);

	return count > 0;
};

const hasRecurringIncome = async (supabase) => {
	const { count } = await supabase
		.from('recurring_income')
		.select('*', { count: 'exact', head: true })
		.eq('active', true);

	return count > 0;
};

const hasSavingsLastMonth = async (supabase, previousMonth, currentMonth) => {
	const { count } = await supabase
		.from('savings')
		.select('*', { count: 'exact', head: true })
		.gte('date', previousMonth)
		.lt('date', currentMonth);

	return count > 0;
};

const hasDebtLastMonth = async (supabase, previousMonth, currentMonth) => {
	const { count } = await supabase
		.from('debt')
		.select('*', { count: 'exact', head: true })
		.gte('date', previousMonth)
		.lt('date', currentMonth);

	return count > 0;
};

export const getMonthlyOverview = async (supabase, year, month) => {
	const previousMonth = new Date(year, month - 1, 1).toDateString();
	const currentMonth = new Date(year, month, 1).toDateString();
	const nextMonth = new Date(year, month + 1, 1).toDateString();
	const [
		expenses,
		income,
		savings,
		debt,
		canCopyExpenses,
		canCopyIncome,
		canCopySavings,
		canCopyDebt,
	] = await Promise.all([
		getExpenses(supabase, currentMonth, nextMonth),
		getIncome(supabase, currentMonth, nextMonth),
		getSavings(supabase, currentMonth, nextMonth),
		getDebt(supabase, currentMonth, nextMonth),
		hasRecurringExpenses(supabase),
		hasRecurringIncome(supabase),
		hasSavingsLastMonth(supabase, previousMonth, currentMonth),
		hasDebtLastMonth(supabase, previousMonth, currentMonth),
	]);

	return {
		year,
		month,
		expenses,
		income,
		savings,
		debt,
		canCopyExpenses,
		canCopyIncome,
		canCopySavings,
		canCopyDebt,
	};
};
