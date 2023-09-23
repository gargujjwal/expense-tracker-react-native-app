import { useEffect, useState } from "react";
import { firebaseExpensesToExpenses, getDateMinusDays } from "../utils";

import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { useGetExpensesQuery } from "../store/redux/expensesAPI";
import { Expense } from "../types/types";

const RecentExpensesScreen = () => {
    const { data, isLoading } = useGetExpensesQuery(undefined);

    const [recentExpenses, setRecentExpenses] = useState<Expense[]>([]);

    useEffect(() => {
        if (!data) return;

        setRecentExpenses(
            firebaseExpensesToExpenses(data).filter(expense => {
                const today = new Date();
                const date7DaysAgo = getDateMinusDays(today, 7);
                return new Date(expense.date) > date7DaysAgo;
            }),
        );
    }, [data]);

    if (isLoading) return <LoadingSpinner text="Loading your expenses" />;

    return (
        <ExpensesOutput
            expenses={recentExpenses}
            expensesPeriod="Last 7 Days..."
        />
    );
};

export default RecentExpensesScreen;
