import { configureStore } from "@reduxjs/toolkit";
import expensesReducer from "./expenses";

export const store = configureStore({
	reducer: {
		expense: expensesReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
