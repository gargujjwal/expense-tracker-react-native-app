import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { Expense } from "../../types/types";

export type FirebaseResponseType<T extends { id: any }> = {
    [id in T["id"]]: Omit<T, "id">;
};

const expensesAPI = createApi({
    reducerPath: "expenses",
    baseQuery: fetchBaseQuery({
        baseUrl:
            "https://expenses-react-native-7fd4c-default-rtdb.asia-southeast1.firebasedatabase.app/",
    }),
    tagTypes: ["Expenses"],
    endpoints: builder => ({
        getExpenses: builder.query<FirebaseResponseType<Expense>, undefined>({
            query: () => ({ url: "/expenses.json", method: "GET" }),
            providesTags: ["Expenses"],
        }),

        getExpenseById: builder.query<Omit<Expense, "id">, string>({
            query: id => ({ url: `/expenses/${id}.json`, method: "GET" }),
            providesTags: ["Expenses"],
        }),

        addExpense: builder.mutation<
            { name: string },
            Pick<Expense, "desc" | "amount" | "date">
        >({
            query: expense => ({
                url: `/expenses.json`,
                method: "POST",
                body: expense,
            }),
            invalidatesTags: ["Expenses"],
        }),

        updateExpense: builder.mutation<
            Partial<Omit<Expense, "id">>,
            { id: Expense["id"]; expense: Partial<Omit<Expense, "id">> }
        >({
            query: ({ id, expense }) => ({
                method: "PATCH",
                url: `/expenses/${id}.json`,
                body: expense,
            }),
            invalidatesTags: ["Expenses"],
        }),

        deleteExpenseById: builder.mutation<null, string>({
            query: id => ({
                url: `/expenses/${id}.json`,
                method: "DELETE",
            }),
            invalidatesTags: ["Expenses"],
        }),

        deleteAllExpenses: builder.mutation<null, undefined>({
            query: () => ({
                url: "/expenses.json",
                method: "DELETE",
            }),
            invalidatesTags: ["Expenses"],
        }),
    }),
});

export default expensesAPI;
export const {
    useGetExpensesQuery,
    useGetExpenseByIdQuery,
    useAddExpenseMutation,
    useUpdateExpenseMutation,
    useDeleteExpenseByIdMutation,
    useDeleteAllExpensesMutation,
} = expensesAPI;
