import { Text } from "@ui-kitten/components";
import { View, StyleSheet, Pressable } from "react-native";
import RecentCheckInsToolBar from "../../components/RecentCheckInsBar";

interface Props {
  navigation: StackNavigationProp<SettingsParamList>;
}

export default function Stats({ navigation }: Props) {
  return (
    <View style={styles.screen}>
      <RecentCheckInsToolBar />
      <View style={styles.container}>
        {/** Recent entries */}
        <Text>STATS</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  container: {
    width: "100%",
    flex: 10,
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "#faedcd",
  },
});
