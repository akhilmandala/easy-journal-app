import { Button, Card, Layout, Toggle } from "@ui-kitten/components";
import {
  View,
  StyleSheet,
  FlatList,
  Pressable,
  VirtualizedList,
  TouchableOpacity,
  TextInput,
  Text,
  Switch,
} from "react-native";
import RecentCheckInsToolBar from "../../components/RecentCheckInsBar";
import { JOURNAL_ENTRY_FIXTURE_1 } from "../../fixture/entries";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { retrieveSVGAssetFromUnicode } from "../../utils/SVGImports";
import { Svg } from "react-native-svg";
import {
  selectRecentEntriesWithinRange,
  EntrySearchFilter,
  selectAllJournalEntryLabels,
} from "../../redux/journalEntries/journalEntriesSlice";
import { useState } from "react";
import uuid from "react-native-uuid";
import { SafeAreaView } from "react-native-safe-area-context";
import { JournalEntryCardLong } from "../Home";
import { FilterBar } from "./FilterBar";

interface Props {
  navigation: StackNavigationProp<SettingsParamList>;
}

export default function Journal({ navigation }: Props) {
  const entries = useSelector((state) =>
    selectRecentEntriesWithinRange(state, 100)
  );
  entries.reverse();
  console.log(entries);
  return (
    <View style={styles.screen}>
      <RecentCheckInsToolBar />
      <SafeAreaView
        style={{
          paddingTop: 72,
        }}
      >
        <FilterBar />
        <View style={styles.container}>
          {/* <FilterBar /> */}
          <FlatList
            data={entries}
            renderItem={(entry) => (
              <JournalEntryCardLong
                key={entry.item.id}
                entry={entry.item}
              ></JournalEntryCardLong>
            )}
            keyExtractor={(entry) => entry.id}
            ListFooterComponent={() => <View style={{ height: 200 }}></View>}
          />
        </View>
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
    backgroundColor: "rgb(255, 255, 255)",
  },
  container: {
    width: "100%",
    flex: 10,
    alignItems: "center",
    flexDirection: "column",
    paddingTop: -5,
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardContainer: {
    padding: 10,
    flex: 0.4,
  },
  cardShort: {
    borderRadius: 35,
    width: "98%",
    margin: 2,
    justifyContent: "center",
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  footerControl: {
    marginHorizontal: 2,
  },
});
