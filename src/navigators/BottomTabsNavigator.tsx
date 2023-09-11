import { Ionicons } from "@expo/vector-icons";
import {
	BottomTabNavigationOptions,
	createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import IconButton from "../components/ui/IconButton";
import tw from "../lib/tailwind";
import AllExpensesScreen from "../screens/AllExpenses";
import RecentExpensesScreen from "../screens/RecentExpenses";
import {
	ExpenseOverviewParamList,
	RootStackNavigationProps,
} from "../types/navigation";

const BottomTab = createBottomTabNavigator<ExpenseOverviewParamList>();

type IconProps = {
	size: number;
	color: string;
};
const RecentExpensesIcon = ({ size, color }: IconProps) => (
	<Ionicons name="hourglass" size={size} color={color} />
);

const AllExpensesIcon = ({ size, color }: IconProps) => (
	<Ionicons name="calendar" size={size} color={color} />
);
const AddIcon = ({
	color,
	onPress,
}: {
	color: string;
	onPress: () => void;
}) => <IconButton size={24} color={color} iconName="add" onPress={onPress} />;

const BottomTabsNavigator = () => {
	const getScreenOptions: (props: {
		route: any;
		navigation: RootStackNavigationProps<"MangeExpense">;
	}) => BottomTabNavigationOptions = ({ navigation }) => {
		const handleAddExpensePress = () =>
			navigation.navigate("MangeExpense", {});

		const AddExpenseIcon = ({ tintColor }: { tintColor?: string }) => (
			<AddIcon color={tintColor!} onPress={handleAddExpensePress} />
		);

		return {
			headerStyle: tw`bg-primary-500`,
			headerTintColor: "white",
			tabBarStyle: tw`bg-primary-500`,
			tabBarActiveTintColor: tw.color("accent-500"),
			headerRight: AddExpenseIcon,
		};
	};
	return (
		<BottomTab.Navigator screenOptions={getScreenOptions}>
			<BottomTab.Screen
				name="RecentExpenses"
				component={RecentExpensesScreen}
				options={{
					title: "Recent Expenses",
					tabBarIcon: RecentExpensesIcon,
				}}
			/>
			<BottomTab.Screen
				name="AllExpenses"
				component={AllExpensesScreen}
				options={{ title: "All Expenses", tabBarIcon: AllExpensesIcon }}
			/>
		</BottomTab.Navigator>
	);
};

export default BottomTabsNavigator;
