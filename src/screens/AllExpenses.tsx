import React from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useAppSelector } from "../hooks/store";

const AllExpensesScreen = () => {
	const expenses = useAppSelector(state => state.expense);
	return <ExpensesOutput expenses={expenses} expensesPeriod="All" />;
};

export default AllExpensesScreen;
