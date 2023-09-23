import {
    FirebaseResponseType,
    useGetExpensesQuery,
} from "../store/redux/expensesAPI";
import React, { useEffect, useState } from "react";
import { firebaseExpensesToExpenses, getDateMinusDays } from "../utils";

import { Expense } from "../types/types";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";

const RecentExpensesScreen = () => {
    const { data } = useGetExpensesQuery(undefined);

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

    return (
        <ExpensesOutput
            expenses={recentExpenses}
            expensesPeriod="Last 7 Days..."
        />
    );
};

export default RecentExpensesScreen;
