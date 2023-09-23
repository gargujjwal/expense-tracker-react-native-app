import {
    useGetExpenseByIdQuery,
    useUpdateExpenseMutation,
} from "../../store/redux/expensesAPI";
import ExpenseForm, { ExpenseFormProps } from "./ExpenseForm";

import React from "react";
import { Text } from "react-native";
import { Expense } from "../../types/types";

type Props = {
    expense: Pick<Expense, "id">;
    onCancel: () => void;
    onConfirm: () => void;
};

const ExpenseEditForm = ({ expense, onCancel, onConfirm }: Props) => {
    const [updateExpense] = useUpdateExpenseMutation();
    const { data, isLoading } = useGetExpenseByIdQuery(expense.id);
    const handleFormConfirm: ExpenseFormProps["onConfirm"] = updatedExpense => {
        updateExpense({ id: expense.id, expense: updatedExpense });
        onConfirm();
    };

    if (isLoading) return <Text>Loading ...</Text>;
    return (
        <ExpenseForm
            expense={data}
            onCancel={onCancel}
            onConfirm={handleFormConfirm}
        />
    );
};

export default ExpenseEditForm;
