import ExpenseForm, { ExpenseFormProps } from "./ExpenseForm";

import React from "react";
import { useAddExpenseMutation } from "../../store/redux/expensesAPI";

type Props = {
    onCancel: () => void;
    onConfirm: () => void;
};

const ExpenseNewForm = ({ onCancel, onConfirm }: Props) => {
    const [addExpense] = useAddExpenseMutation();
    const handleFormConfirm: ExpenseFormProps["onConfirm"] = updatedExpense => {
        addExpense(updatedExpense);
        onConfirm();
    };

    return <ExpenseForm onCancel={onCancel} onConfirm={handleFormConfirm} />;
};

export default ExpenseNewForm;
