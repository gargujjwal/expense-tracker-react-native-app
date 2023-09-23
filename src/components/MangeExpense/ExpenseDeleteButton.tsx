import { View } from "react-native";
import tw from "../../lib/tailwind";
import { useDeleteExpenseByIdMutation } from "../../store/redux/expensesAPI";
import { Expense } from "../../types/types";
import IconButton from "../ui/IconButton";
import LoadingSpinner from "../ui/LoadingSpinner";

type Props = {
    expense: Pick<Expense, "id">;
};

const ExpenseDeleteButton = ({ expense }: Props) => {
    const [deleteExpense, { isLoading }] = useDeleteExpenseByIdMutation();
    const handleExpenseDelete = () => deleteExpense(expense.id);

    return (
        <View
            style={tw`mt-4 pt-2 border-t-2 border-t-primary-200 items-center`}
        >
            {isLoading ? (
                <LoadingSpinner text="Hang on, deleting expense" />
            ) : (
                <IconButton
                    iconName="trash"
                    color={tw.color("error-500")!}
                    size={36}
                    onPress={handleExpenseDelete}
                />
            )}
        </View>
    );
};

export default ExpenseDeleteButton;
