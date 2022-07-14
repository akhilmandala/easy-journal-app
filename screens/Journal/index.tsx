import { Text, Button, Card, Layout } from "@ui-kitten/components";
import { View, StyleSheet,FlatList, Pressable } from "react-native";
import RecentCheckInsToolBar from "../../components/RecentCheckInsBar";
import { JOURNAL_ENTRY_FIXTURE_1 } from "../../fixture/entries"
import { useSelector } from "react-redux";
import * as dayjs from "dayjs"

const selectRecentEntries = (state) => {
  let entries = state.journalEntries.entries;
  let latestEntryIds = state.journalEntries.latestEntryIds;
  let recentEntries = latestEntryIds.map((entryId) => entries[entryId]);
  recentEntries.reverse();
  return recentEntries;
};

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
  let content = entry.item.content;
  return (
    <View style={styles.cardContainer}>
      <Card
        style={styles.cardShort}
        header={(props) => (
          <Header
            {...props}
            title={entry.item.title}
            date={entry.item.date}
            emotion={entry.item.emotion}
          />
        )}
        footer={Footer}
      >
        <Text>{content}</Text>
      </Card>
    </View>
  );
};

export default function Journal({ navigation }: Props) {
  const entries = useSelector(selectRecentEntries);
  return (
    <View style={styles.screen}>
      <RecentCheckInsToolBar />
      <View style={styles.container}>
        {/** Recent entries */}
        <FlatList
          data={entries}
          renderItem={(entry) => <JournalEntryCardLong entry={entry} />}
          keyExtractor={(entry) => entry.id}
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
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  footerControl: {
    marginHorizontal: 2,
  },
});
