import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { DefaultTheme} from "@react-navigation/native"
import { AntDesign as Icon } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { View } from "react-native";
import {
  NavigationContainer,
  NavigationContainerRef,
} from "@react-navigation/native";
import { Svg, Circle } from "react-native-svg";
import { Text } from "@ui-kitten/components";
import * as React from "react";
import { StyleSheet } from "react-native";
import HomeScreen from "../screens/Home";
import JournalScreen from "../screens/Journal";
import StatScreen from "../screens/Stat";
import Colors from "../constants/Colors";

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
export function TabBarIcon(props: {
  name: React.ComponentProps<typeof Icon>["name"];
}) {
  return (
      <Icon size={30} color="blue" style={{color: "white"}} {...props} />
  );
}

const BottomTab = createBottomTabNavigator();

function MyTabBar({ state, descriptors, navigation }) {
  return (
    <View style={{ backgroundColor: "rgb(242, 242, 242" }}>
      <View style={styles.tabBar}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              // The `merge: true` option makes sure that the params inside the tab screen are preserved
              navigation.navigate({ name: route.name, merge: true });
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.checkInButton}
              key={index}
            >
              <View>
                <Svg height={"30px"} width={"30px"}>
                  {options.tabBarIcon({ color: "rgb(255,255,255)" })}
                </Svg>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}


const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#322D31'
  },
};

export const TabBar = (props) => {
  return (
    <NavigationContainer theme={MyTheme}>
      <BottomTab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "blue",
          tabBarStyle: { ...styles.tabBar },
          tabBarIconStyle: {
            "alignContent": "center",
            color: "white"
          },
          
        }}
        // tabBar={(props) => <MyTabBar initialRouteName="Home" {...props} />}
        initialRouteName="Home"
      >
        <BottomTab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
            tabBarShowLabel: false
          }}
        ></BottomTab.Screen>
        <BottomTab.Screen
          name="Journal"
          component={JournalScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="calendar" color={color} />
            ),
            tabBarShowLabel: false
          }}
        ></BottomTab.Screen>
        <BottomTab.Screen
          name="Stats"
          component={StatScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="setting" color={color} />
            ),
            tabBarShowLabel: false
          }}
        ></BottomTab.Screen>
      </BottomTab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  headerTitle: {
    fontWeight: "600",
    color: Colors.light.white,
    fontSize: 16,
  },
  header: {
    backgroundColor: Colors.light.primary,
  },
  checkInButton: {
    alignSelf: "center",
    paddingTop: "25%",
  },
  tabBar: {
    position: "absolute",
    left: 20,
    bottom: 20,
    right: 20,
    backgroundColor: "black",
    borderRadius: 25,
    paddingHorizontal: 40,
    paddingBottom: -30,
    shadowColor: "#171717",
    shadowOffset: { width: 20, height: 30 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    flexDirection: "row",
    alignSelf: "center",
    alignContent: "center",
    justifyContent: "space-between",
  },
});
