import React from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useAppSelector } from "../hooks/store";
import { getDateMinusDays } from "../utils";

const RecentExpensesScreen = () => {
	const expenses = useAppSelector(state => state.expense);
	const recentExpenses = expenses.filter(expense => {
		const today = new Date();
		const date7DaysAgo = getDateMinusDays(today, 7);
		return new Date(expense.date) > date7DaysAgo;
	});

	return (
		<ExpensesOutput
			expenses={recentExpenses}
			expensesPeriod="Last 7 Days..."
		/>
	);
};

export default RecentExpensesScreen;
