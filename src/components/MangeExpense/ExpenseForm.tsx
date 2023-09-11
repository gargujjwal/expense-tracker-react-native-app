import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Text, View } from "react-native";
import { useAppSelector } from "../../hooks/store";
import tw from "../../lib/tailwind";
import { Expense } from "../../types/types";
import Button from "../ui/Button";
import Input from "./Input";

import { z } from "zod";
const expenseSchema = z.object({
    amount: z.string().refine(value => !isNaN(+value), {
        message: "Unable to parse string as a number",
        path: [],
    }),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
    desc: z.string().min(3, "Description must be at least 3 characters long"),
});

type ExpenseSchema = z.infer<typeof expenseSchema>;

type Props = {
    onCancel: () => void;
    onConfirm: (expense: Omit<Expense, "id">) => void;
    isEditing: boolean;
    expenseId?: string;
};

const ExpenseForm = ({ onCancel, onConfirm, isEditing, expenseId: receivedExpenseId }: Props) => {
    const expenses = useAppSelector(state => state.expense);
    const haveExpense = expenses.find(expense => expense.id === receivedExpenseId);
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<ExpenseSchema>({
        resolver: zodResolver(expenseSchema),
        defaultValues: haveExpense
            ? { ...haveExpense, amount: haveExpense.amount.toFixed(2) }
            : { amount: "", date: new Date().toISOString().slice(0, 10), desc: "" },
    });

    const onSubmit: SubmitHandler<ExpenseSchema> = data => {
        console.log(data);
        const finalExpense = {
            ...data,
            amount: +data.amount,
        };

        onConfirm(finalExpense);
    };

    return (
        <View style={tw`mt-10`}>
            <Text style={tw`text-2xl font-bold text-center text-white my-6`}>Your Expense</Text>
            <View style={tw`flex-row justify-between`}>
                <Controller
                    control={control}
                    name="amount"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                            label="Amount"
                            containerStyle="flex-1"
                            isValid={!errors.amount}
                            textInputConfig={{
                                keyboardType: "decimal-pad",
                                placeholder: "",
                                autoFocus: true,
                                onChangeText: onChange,
                                onBlur,
                                value: value.toString(),
                            }}
                        />
                    )}
                />

                <Controller
                    control={control}
                    name="date"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                            label="Date"
                            containerStyle="flex-1"
                            isValid={!errors.date}
                            textInputConfig={{
                                placeholder: "YYYY-MM-DD",
                                keyboardType: "number-pad",
                                maxLength: 10,
                                onChangeText: onChange,
                                onBlur,
                                value,
                            }}
                        />
                    )}
                />
            </View>

            <Controller
                control={control}
                name="desc"
                render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                        label="Description"
                        isValid={!errors.desc}
                        textInputConfig={{
                            multiline: true,
                            autoCorrect: false,
                            autoCapitalize: "sentences",
                            onChangeText: onChange,
                            onBlur,
                            value,
                        }}
                    />
                )}
            />
            <View style={tw`gap-1 items-center mb-2`}>
                {errors.amount && (
                    <Text style={tw`text-error-500 font-semibold`}>{errors.amount.message}</Text>
                )}
                {errors.date && (
                    <Text style={tw`text-error-500 font-semibold`}>{errors.date.message}</Text>
                )}
                {errors.desc && (
                    <Text style={tw`text-error-500 font-semibold`}>{errors.desc.message}</Text>
                )}
            </View>

            <View style={tw`flex-row justify-center items-center`}>
                <Button variant="flat" outerViewStyle={tw`min-w-[120px] mx-2`} onPress={onCancel}>
                    Cancel
                </Button>
                <Button
                    variant="default"
                    outerViewStyle={tw`min-w-[120px] mx-2`}
                    onPress={handleSubmit(onSubmit)}
                >
                    {isEditing ? "Update" : "Add"}
                </Button>
            </View>
        </View>
    );
};

export default ExpenseForm;
