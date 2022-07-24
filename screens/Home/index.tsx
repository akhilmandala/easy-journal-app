import { View, StyleSheet, Animated } from "react-native";
import RecentCheckInsToolBar from "../../components/RecentCheckInsBar";
import { connect, useSelector } from "react-redux";
import { FlatList } from "react-native-gesture-handler";
import { NewEntryWidget } from "../../components/NewEntryForm/NewEntryWidget";
import {
  selectRecentEntriesWithinRange,
} from "../../redux/journalEntries/journalEntriesSlice";
import { CheckInWidgetComponent } from "../CheckIn";
import { SafeAreaView } from "react-native-safe-area-context";
import { JournalEntryCardShort } from "../../components/JournalEntryCard/JournalEntryCard";

export function HomeRedesigned({navigation}) {
  return (
    <View>

    </View>
  )
}

export default function Home({ navigation }) {
  let entries = [].concat(useSelector((state) =>
    selectRecentEntriesWithinRange(state, 3)
  )).reverse();


  return (
    <View style={styles.screen}>
      <SafeAreaView style={styles.container}>
        <FlatList
          style={{
            width: "100%",
          }}
          data={entries}
          renderItem={(entry) => <JournalEntryCardShort entry={entry} />}
          keyExtractor={(entry) => entry.id}
          fadingEdgeLength={100}
          ListHeaderComponent={() => {
            return (
              <View
                style={{
                  alignSelf: "center",
                  width: "100%",
                  justifyContent: "center",
                }}
              >
                <CheckInWidgetComponent />
                <NewEntryWidget />
              </View>
            );
          }}
          ListFooterComponent={() => <View style={{ height: 200 }}></View>}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
  },
  container: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    flexDirection: "column",
    alignSelf: "center",
    paddingHorizontal: 10
  },
});
