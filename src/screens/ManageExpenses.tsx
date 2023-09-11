import React, { useEffect } from "react";
import { View } from "react-native";
import ExpenseForm from "../components/MangeExpense/ExpenseForm";
import IconButton from "../components/ui/IconButton";
import { useAppDispatch } from "../hooks/store";
import tw from "../lib/tailwind";
import { addExpense, deleteExpense, updateExpense } from "../store/redux/expenses";
import type { RootStackScreenProps } from "../types/navigation";
import { Expense } from "../types/types";

const ManageExpensesScreen = ({
    navigation,
    route: {
        params: { expenseId },
    },
}: RootStackScreenProps<"MangeExpense">) => {
    const dispatch = useAppDispatch();

    const isEditing = !!expenseId;

    useEffect(() => {
        // set title
        navigation.setOptions({
            title: isEditing ? "Edit Expense" : "Add Expense",
        });
    }, [navigation, isEditing]);

    const deleteExpenseHandler = () => {
        if (!expenseId) return;
        dispatch(deleteExpense({ id: expenseId }));
        navigation.goBack();
    };
    const cancelHandler = () => {
        navigation.goBack();
    };

    const confirmHandler = (expense: Omit<Expense, "id">) => {
        if (isEditing) dispatch(updateExpense({ id: expenseId, expense }));
        else {
            dispatch(addExpense(expense));
        }

        navigation.goBack();
    };

    return (
        <View style={tw`flex-1 p-6 bg-primary-800`}>
            <ExpenseForm
                isEditing={isEditing}
                onCancel={cancelHandler}
                onConfirm={confirmHandler}
                expenseId={expenseId}
            />

            {isEditing && (
                <View style={tw`mt-4 pt-2 border-t-2 border-t-primary-200 items-center`}>
                    <IconButton
                        iconName="trash"
                        color={tw.color("error-500")!}
                        size={36}
                        onPress={deleteExpenseHandler}
                    />
                </View>
            )}
        </View>
    );
};

export default ManageExpensesScreen;
