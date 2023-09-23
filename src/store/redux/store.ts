import { configureStore } from "@reduxjs/toolkit";
import expensesAPI from "./expensesAPI";
export const store = configureStore({
    reducer: {
        [expensesAPI.reducerPath]: expensesAPI.reducer,
    },
    middleware(getDefaultMiddleware) {
        return getDefaultMiddleware().concat(expensesAPI.middleware);
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
