import React from "react";
import { View, Text, FlatList } from "react-native";
import type { ListRenderItemInfo } from "react-native";
import type { Expense } from "../../types/types";
import ExpenseListItem from "./ExpenseListItem";
import tw from "../../lib/tailwind";

type Props = {
    expenses: Expense[];
};

const renderExpenseItem = ({ item }: ListRenderItemInfo<Expense>) => {
    return <ExpenseListItem {...item} />;
};

const ExpensesList = ({ expenses }: Props) => {
    return (
        <FlatList
            data={expenses}
            keyExtractor={expense => expense.id}
            renderItem={renderExpenseItem}
            ListEmptyComponent={
                <View>
                    <Text style={tw`text-white text-center`}>
                        No expenses found... Winning 🏆
                    </Text>
                </View>
            }
        />
    );
};

export default ExpensesList;
