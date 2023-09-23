import {
    useGetExpenseByIdQuery,
    useUpdateExpenseMutation,
} from "../../store/redux/expensesAPI";
import ExpenseForm, { ExpenseFormProps } from "./ExpenseForm";

import React from "react";
import { Expense } from "../../types/types";
import LoadingSpinner from "../ui/LoadingSpinner";

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

    if (isLoading)
        return <LoadingSpinner text="Editing your expense, hang on" />;

    return (
        <ExpenseForm
            expense={data}
            onCancel={onCancel}
            onConfirm={handleFormConfirm}
        />
    );
};

export default ExpenseEditForm;
