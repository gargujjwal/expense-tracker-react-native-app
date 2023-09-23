import { FirebaseResponseType } from "./store/redux/expensesAPI";
import { Expense } from "./types/types";

export const getFormattedDate = (date: Date) => date.toISOString().slice(0, 10);

export const getDateMinusDays = (date: Date, days: number) => {
    return new Date(date.setDate(date.getDate() - days));
};

export const firebaseExpensesToExpenses = (
    firebaseExpenses: FirebaseResponseType<Expense>,
) => {
    const expenses: Expense[] = [];
    for (const key in firebaseExpenses)
        expenses.push({ ...firebaseExpenses[key], id: key });

    return expenses;
};
