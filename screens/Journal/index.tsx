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
import { useEffect, useState } from "react";
import uuid from "react-native-uuid";
import { SafeAreaView } from "react-native-safe-area-context";
import { JournalEntryCardShort } from "../../components/JournalEntryCard/JournalEntryCard";
import { FilterBar } from "../../components/FilterBar/FilterBar";
import { selectEntriesWithFilter } from "../../redux/journalEntries/journalEntriesSlice";

interface Props {
  navigation: StackNavigationProp<SettingsParamList>;
}

export default function Journal({ navigation }: Props) {
  let [filters, setFilters] = useState({
		ascending: false,
		labels: [],
		dateRange: [0, dayjs().unix()],
		searchTerm: "",
	});
	const matchedEntries = useSelector(state => selectEntriesWithFilter(state, filters))
  const [shownEntries, setShownEntries] = useState(matchedEntries)

  useEffect(() => {
    setShownEntries(matchedEntries)
  }, [filters])

  return (
    <View style={styles.screen}>
      <SafeAreaView
      >
        <FilterBar  filters={filters} setFilters={setFilters} setShownEntries={setShownEntries} />
        <View style={styles.container}>
          
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
  },
  container: {
    width: "100%",
    flex: 10,
    alignItems: "center",
    flexDirection: "column",
    paddingTop: 10,
    alignSelf: "center"
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
