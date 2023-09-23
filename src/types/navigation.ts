import type {
    CompositeScreenProps,
    NavigatorScreenParams,
} from "@react-navigation/native";
import type {
    NativeStackScreenProps,
    NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

export type RootStackParamList = {
    MangeExpense: { expenseId?: string };
    ExpenseOverview: NavigatorScreenParams<ExpenseOverviewParamList>;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
    NativeStackScreenProps<RootStackParamList, T>;

export type RootStackNavigationProps<T extends keyof RootStackParamList> =
    NativeStackNavigationProp<RootStackParamList, T>;

export type ExpenseOverviewParamList = {
    RecentExpenses: undefined;
    AllExpenses: undefined;
};

export type ExpenseOverviewScreenProps<
    T extends keyof ExpenseOverviewParamList,
> = CompositeScreenProps<
    BottomTabScreenProps<ExpenseOverviewParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
>;
