import { Text, Button, Card, Layout } from "@ui-kitten/components";
import { View, StyleSheet, FlatList, Pressable } from "react-native";
import RecentCheckInsToolBar from "../../components/RecentCheckInsBar";
import { JOURNAL_ENTRY_FIXTURE_1 } from "../../fixture/entries";
import { useSelector } from "react-redux";
import * as dayjs from "dayjs";
import { selectRecentEntries } from "../Home";
import { retrieveSVGAssetFromUnicode } from "../../utils/SVGImports";
import { Svg } from "react-native-svg";
import { CheckIn } from "../../redux/store"

interface Props {
  navigation: StackNavigationProp<SettingsParamList>;
}

interface JournalTabFilter {
  ascending: boolean;
  upperDateBound: number;
  lowerDateBound: number;
  searchTerm: string;
  displayedEntryType: string; // [both, journal_entries, check_ins]
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
  console.log(entry)
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
        <View style={{alignSelf: "center"}}>
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

export default function Journal({ navigation }: Props) {
  const entries = useSelector(selectAllEntriesOrdered);
  console.log(entries);
  return (
    <View style={styles.screen}>
      <RecentCheckInsToolBar />
      <View style={styles.container}>
        {/** Recent entries */}
        {/* <FilterBar /> */}

        <FlatList
          data={entries}
          renderItem={(entry) => {
            if(entry.item.content !== undefined) {
              console.log("entry")
              return <JournalEntryCardLong key={entry.item.id} entry={entry.item}></JournalEntryCardLong>
            } else {
              console.log("check in")
              return <CheckInCard key={entry.item.id} checkIn={entry.item}></CheckInCard>
            }
          }}
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
    justifyContent: "center"
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  footerControl: {
    marginHorizontal: 2,
  },
});
