import ExpenseForm, { ExpenseFormProps } from ".";

import { useAddExpenseMutation } from "../../../store/redux/expensesAPI";
import LoadingSpinner from "../../ui/LoadingSpinner";

type Props = {
    onCancel: () => void;
    onConfirm: () => void;
};

const ExpenseNewForm = ({ onCancel, onConfirm }: Props) => {
    const [addExpense, { isLoading }] = useAddExpenseMutation();
    const handleFormConfirm: ExpenseFormProps["onConfirm"] = updatedExpense => {
        addExpense(updatedExpense);
        onConfirm();
    };

    if (isLoading) return <LoadingSpinner text="Adding your expense" />;

    return <ExpenseForm onCancel={onCancel} onConfirm={handleFormConfirm} />;
};

export default ExpenseNewForm;
