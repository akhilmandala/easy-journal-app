import { Text, Button, Card, Layout } from "@ui-kitten/components";
import { View, StyleSheet, Animated } from "react-native";
import RecentCheckInsToolBar from "../../components/RecentCheckInsBar";
import { connect, useSelector } from "react-redux";
import { FlatList } from "react-native-gesture-handler";
import { NewEntryWidget } from "../../components/NewEntryForm/NewEntryWidget";
import * as dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import advanced from "dayjs/plugin/advancedFormat";
import {
  removeEntry,
  selectRecentEntriesWithinRange,
} from "../../redux/journalEntries/journalEntriesSlice";
import { retrieveSVGAssetFromUnicode } from "../../utils/SVGImports";
import { Svg } from "react-native-svg";
import { NewCheckInFormScreen } from "../CheckIn";
import { CheckInWidgetComponent } from "../CheckIn";
import { LabelSearchDropdownMenu } from "../Journal";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect } from "react";

interface Props {
  navigation: StackNavigationProp<SettingsParamList>;
}

const Header = ({ title, date, emotion, ...props }) => {
  dayjs.extend(timezone);
  dayjs.extend(advanced);
  dayjs.extend(utc);

  let local_date = dayjs.unix(date).tz().format("dddd, MMM D/YY");
  let local_time = dayjs.unix(date).tz().format("h:m a");
  /**
   * TODO: set this up for other places
   */

  let svg = emotion ? retrieveSVGAssetFromUnicode(emotion) : null;
  return (
    <View
      {...props}
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 16,
        paddingHorizontal: 24,
      }}
    >
      <View>
        <Text category="h6">{title}</Text>
        <Text category="s1">{local_date}</Text>
        <Text category="s1">{local_time}</Text>
      </View>
      <View style={{ alignSelf: "center" }}>
        {svg && (
          <Svg
            height={"40px"}
            width={"40px"}
            preserveAspectRatio="xMinYMin slice"
          >
            {svg}
          </Svg>
        )}
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

export const JournalEntryCardLong = ({ entry }) => {
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

export default function Home({ navigation }: Props) {
  let entries = [].concat(useSelector((state) =>
    selectRecentEntriesWithinRange(state, 3)
  )).reverse();


  return (
    <View style={styles.screen}>
      <RecentCheckInsToolBar />
      <SafeAreaView style={styles.container}>
        <FlatList
          style={{
            height: 400,
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
    paddingTop: 72,
    alignSelf: "center",
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardContainer: {
    width: "100%",
  },
  cardShort: {
    borderRadius: 35,
    width: "95%",
    margin: 2,
    alignSelf: "center",
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  footerControl: {
    marginHorizontal: 2,
  },
});
