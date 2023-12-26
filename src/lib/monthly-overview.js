const getExpenses = async (supabase, currentMonth, nextMonth) => {
	const { data: expenses } = await supabase
		.from('expenses')
		.select('id,date,category,description,amount')
		.gte('date', currentMonth)
		.lt('date', nextMonth);

	return expenses;
};

const getIncome = async (supabase, currentMonth, nextMonth) => {
	const { data: income } = await supabase
		.from('income')
		.select('id,date,category,description,amount')
		.gte('date', currentMonth)
		.lt('date', nextMonth);

	return income;
};

const getSavings = async (supabase, currentMonth, nextMonth) => {
	const { data: savings } = await supabase
		.from('savings')
		.select('id,date,category,description,amount')
		.gte('date', currentMonth)
		.lt('date', nextMonth);

	return savings;
};

const getDebt = async (supabase, currentMonth, nextMonth) => {
	const { data: debt } = await supabase
		.from('debt')
		.select('id,date,category,description,amount,interest_rate,minimum_payment')
		.gte('date', currentMonth)
		.lt('date', nextMonth);

	return debt;
};

export const getMonthlyOverview = async (supabase, year, month) => {
	const currentMonth = new Date(year, month, 1).toDateString();
	const nextMonth = new Date(year, month + 1, 1).toDateString();
	const [expenses, income, savings, debt] = await Promise.all([
		getExpenses(supabase, currentMonth, nextMonth),
		getIncome(supabase, currentMonth, nextMonth),
		getSavings(supabase, currentMonth, nextMonth),
		getDebt(supabase, currentMonth, nextMonth),
	]);

	return {
		expenses,
		income,
		savings,
		debt,
	};
};
