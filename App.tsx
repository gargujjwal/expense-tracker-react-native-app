import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { Provider } from "react-redux";
import tw from "./src/lib/tailwind";
import StackNavigator from "./src/navigators/StackNavigator";
import { store } from "./src/store/redux/store";

export default function App() {
  return (
    <View style={tw`flex-1`}>
      <Provider store={store}>
        <NavigationContainer>
          <StackNavigator />
        </NavigationContainer>
      </Provider>
      <StatusBar style="light" />
    </View>
  );
}
