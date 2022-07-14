import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import * as eva from "@eva-design/eva";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { ApplicationProvider, Layout, Text } from "@ui-kitten/components";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { TabBar } from "./navigation";

export default function App() {
  return (
    <Provider store={store}>
      <ApplicationProvider {...eva} theme={eva.light}>
        <SafeAreaProvider>
          <StatusBar />
          <TabBar
            screenOptions={{
              headerShown: false,
              tabBarActiveTintColor: "tomato",
              tabBarInactiveTintColor: "#faedcd",
              tabBarActiveBackgroundColor: "tomato",
              tabBarInactiveBackgroundColor: "#faedcd",
            }}
            initialRouteName="Home"
          />
        </SafeAreaProvider>
      </ApplicationProvider>
    </Provider>
  );
}
