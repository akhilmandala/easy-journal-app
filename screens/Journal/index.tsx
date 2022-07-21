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

interface Props {
  navigation: StackNavigationProp<SettingsParamList>;
}

const Header = ({ title, date, emotion, ...props }) => (
  <View {...props}>
    <View>
      <Text category="h6">{title}</Text>
      <Text category="s1">{dayjs.unix(date).toString()}</Text>
    </View>
  </View>
);

const Footer = (props) => (
  <View {...props} style={[props.style, styles.footerContainer]}>
    <Button style={styles.footerControl} size="small" status="basic">
      ARCHIVE
    </Button>
    <Button style={styles.footerControl} size="small">
      EDIT
    </Button>
  </View>
);

const JournalEntryCardLong = ({ entry }) => {
  console.log(entry);
  let content = entry.content;
  return (
    <View style={styles.cardContainer}>
      <Card
        style={styles.cardShort}
        header={(props) => (
          <Header
            {...props}
            title={entry.title}
            date={entry.date}
            emotion={entry.emotion}
          />
        )}
        footer={Footer}
      >
        <Text>{content}</Text>
      </Card>
    </View>
  );
};

export const CheckInCard = ({ checkIn, ...props }) => {
  let { date, emotion } = checkIn;
  let svg = retrieveSVGAssetFromUnicode(emotion);
  return (
    <Card style={styles.cardShort}>
      <View
        {...props}
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingVertical: 16,
          paddingHorizontal: 24,
        }}
      >
        <View style={{ alignSelf: "center" }}>
          <Text category="s1">{dayjs.unix(date).toString()}</Text>
        </View>
        <View>
          <Svg
            height={"40px"}
            width={"40px"}
            preserveAspectRatio="xMinYMin slice"
          >
            {svg}
          </Svg>
        </View>
      </View>
    </Card>
  );
};

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <View>
      <TextInput
        value={searchTerm}
        onChangeText={(text) => setSearchTerm(text)}
      ></TextInput>
    </View>
  );
};
export function LabelSearchDropdownMenu() {
  const labels: String[] = useSelector(selectAllJournalEntryLabels);
  const [labelSearchTerm, setLabelSearchTerm] = useState("");
  let possibleLabelsToPick = labels
    .filter((label) =>
      label.toLowerCase().includes(labelSearchTerm.toLowerCase())
    )
    .map((label) => ({ id: uuid.v4().toString(), item: label }));
  console.log(possibleLabelsToPick);

  const renderOption = ({ item }) => {
    <View style={{  }}>
      <Text>{item}</Text>
    </View>;
  };

  return (
    <View
      style={{
        height: 200,
        backgroundColor: "blue",
        width: 500,
        position: "absolute",
        bottom: 0,
      }}
    >
      {/* <SearchBar
        searchTerm={labelSearchTerm}
        setSearchTerm={setLabelSearchTerm}
      /> */}
      <FlatList
        data={possibleLabelsToPick}
        renderItem={renderOption}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

function DateRangePicker() {}

function EntrySearchBar() {}

export function FilterBar() {
  let [filters, setFilters] = useState({
    ascending: false,
    labels: [],
    dateRange: [0, dayjs().unix()],
    searchTerm: "",
  });
  return (
    <View>
      <Button>{ascending ? "ASC" : "DESC"}</Button>
      <LabelSearchDropdownMenu />
      <DateRangePicker />
      <EntrySearchBar />
    </View>
  );
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
