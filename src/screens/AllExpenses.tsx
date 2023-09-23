import { useEffect, useState } from "react";

import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { useGetExpensesQuery } from "../store/redux/expensesAPI";
import { Expense } from "../types/types";
import { firebaseExpensesToExpenses } from "../utils";

const AllExpensesScreen = () => {
    const { data, isLoading } = useGetExpensesQuery(undefined);
    const [expenses, setExpenses] = useState<Expense[]>([]);

    useEffect(() => {
        if (!data) return;
        setExpenses(firebaseExpensesToExpenses(data));
    }, [data]);

    if (isLoading) return <LoadingSpinner text="Loading your expenses" />;

    return <ExpensesOutput expenses={expenses} expensesPeriod="All" />;
};

export default AllExpensesScreen;
