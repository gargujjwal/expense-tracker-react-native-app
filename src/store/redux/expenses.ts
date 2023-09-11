import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DUMMY_EXPENSES } from "../../dummy";
import { Expense } from "../../types/types";

export const expenseSlice = createSlice({
    name: "expenses",
    initialState: DUMMY_EXPENSES,
    reducers: {
        addExpense(state, action: PayloadAction<Pick<Expense, "desc" | "amount" | "date">>) {
            state.push({
                id: Math.random().toString(),
                ...action.payload,
            });
        },
        deleteExpense(state, { payload }: PayloadAction<{ id: string }>) {
            state.splice(
                state.findIndex(expense => expense.id === payload.id),
                1
            );
        },
        updateExpense(
            state,
            {
                payload,
            }: PayloadAction<{
                id: string;
                expense: Partial<Omit<Expense, "id">>;
            }>
        ) {
            return state.map(expense =>
                expense.id === payload.id ? { ...expense, ...payload.expense } : expense
            );
        },
    },
});

export default expenseSlice.reducer;
export const { addExpense, deleteExpense, updateExpense } = expenseSlice.actions;
