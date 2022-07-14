import { Text, Button, Card, Layout } from "@ui-kitten/components";
import { View, StyleSheet, Pressable } from "react-native";
import RecentCheckInsToolBar from "../../components/RecentCheckInsBar";
import { connect, useSelector } from "react-redux";
import { FlatList } from "react-native-gesture-handler";
import { NewEntryWidget } from "../NewEntry";
import * as dayjs from "dayjs";
import { removeEntry } from "../../redux/store";
import { retrieveSVGAssetFromUnicode } from "../../utils/SVGImports";
import { Svg } from "react-native-svg";
import { NewCheckInWidget } from "../CheckIn";

const selectRecentEntries = (state) => {
  let entries = state.journalEntries.entries;
  let entryOrder = state.journalEntries.entryOrder;
  let recentEntriesIds;
  if (entryOrder.length > 3) {
    recentEntriesIds = entryOrder.slice(-3);
  } else {
    recentEntriesIds = entryOrder;
  }
  console.log(recentEntriesIds);
  let recentEntries = recentEntriesIds.map((entryId) => entries[entryId]);
  recentEntries.reverse();
  return recentEntries;
};

interface Props {
  navigation: StackNavigationProp<SettingsParamList>;
}

const Header = ({ title, date, emotion, ...props }) => {
  let svg = retrieveSVGAssetFromUnicode(emotion);
  return (
    <View {...props} style={{
      flexDirection: "row",
      justifyContent: "space-between",
      paddingVertical: 16,
      paddingHorizontal: 24

    }}>
      <View>
        <Text category="h6">{title}</Text>
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
  );
};

const FooterComponent = ({ deleteEntry, entryId, ...props }) => (
  <View {...props} style={[props.style, styles.footerContainer]}>
    <Button
      style={styles.footerControl}
      size="small"
      status="basic"
      onPress={() => {
        console.log("DELETE");
        console.log(props);
        deleteEntry(entryId);
      }}
    >
      ARCHIVE
    </Button>
    <Button style={styles.footerControl} size="small">
      EDIT
    </Button>
  </View>
);

const mapDispatchToProps = (dispatch) => {
  return {
    // dispatching actions returned by action creators
    deleteEntry: (entryId) => dispatch(removeEntry({ entryId })),
  };
};

const Footer = connect(null, mapDispatchToProps)(FooterComponent);

const JournalEntryCardShort = ({ entry }) => {
  console.log(entry);
  let content = entry.item.content;
  var length = 400;
  var trimmedString =
    content.length > length
      ? content.substring(0, length - 3) + "..."
      : content.substring(0, length);
      
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
        footer={(props) => <Footer {...props} entryId={entry.item.id} />}
      >
        <Text>{trimmedString}</Text>
      </Card>
    </View>
  );
};

const FadeToWhiteBottom = () => {
  return <View style={styles.fadeToWhiteContainer} />;
};

export default function Home({ navigation }: Props) {
  const entries = useSelector(selectRecentEntries);
  console.log(entries);

  return (
    <View style={styles.screen}>
      <RecentCheckInsToolBar />
      <NewEntryWidget />
      <NewCheckInWidget />
      <View style={styles.container}>
        {/** Recent entries */}
        <FlatList
          style={{
            width: "98%"
          }}
          data={entries}
          renderItem={(entry) => <JournalEntryCardShort entry={entry} />}
          keyExtractor={(entry) => entry.id}
        />
        <FadeToWhiteBottom />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fadeToWhiteContainer: {
    position: "relative",
    overflow: "hidden",
    backgroundRepeat: "no-repeat",
    width: "100%",
    height: "5%",
    backgroundSize: "cover",
    backgroundImage:
      "linear-gradient(to top, rgba(255,255,255, 0), rgba(255,255,255, 1), 90%)",
  },
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
    width: "100%"
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
