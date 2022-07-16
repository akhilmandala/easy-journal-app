import EmojiCluster from "../../data/emoji_cluster.json";
import SVG_ICONS, { retrieveSVGAssetFromUnicode } from "../../utils/SVGImports";
import RecentCheckInsToolBar, {
  selectRecentCheckIns,
} from "../../components/RecentCheckInsBar";
import React, { useState } from "react";
import { StyleSheet, View, Dimensions, Pressable } from "react-native";
import { Button, Card, Layout, Modal, Text } from "@ui-kitten/components";
import { Svg } from "react-native-svg";
import { connect as connectRedux, useDispatch, useSelector } from "react-redux";
import { addCheckIn, CheckIn } from "../../redux/store";
import uuid from "react-native-uuid";
import dayjs from "dayjs";
import { selectLatestEntryOrder } from "../../components/NewEntryForm";
import { connect, Formik } from "formik";
import { AntDesign as Icon } from "@expo/vector-icons";

/**
 * TODO:
 * - send new check in action
 * - create check ins history page
 *  - should this be in the journal tab? maybe as a different line
 *  - can add entry / check in filter
 */

const selectRecentCheckInsWithinRange = (range) => (state) => {
  let checkIns = state.journalEntries.checkIns;
  let checkInOrder = state.journalEntries.checkInOrder;
  let recentCheckInIds;
  if (checkInOrder.length > range) {
    recentCheckInIds = checkInOrder.slice(-range);
  } else {
    recentCheckInIds = checkInOrder;
  }
  let recentCheckIns = recentCheckInIds.map((checkInId) => checkIns[checkInId]);
  return recentCheckIns;
};

export const CheckInWidgetHeader = () => {
  let [visible, setVisible] = useState(false);
  let user = "Akhil";
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 16,
        paddingHorizontal: 24,
      }}
    >
      <View style={{alignSelf: "center"}}>
        <Text category="h5" style={{ fontWeight: "600" }}>
          Hello {user},
        </Text>
        <Text category="h5" style={{ fontWeight: "600" }}>
          how are you doing?
        </Text>
      </View>
      <View style={{ justifyContent: "center", alignContent: "center" }}>
        <Button
          style={{
            height: 64,
            width: 64,
            borderRadius: 7,
          }}
          onPress={() => setVisible(true)}
        >
          <Icon size={40} name="plus" color="white" />
        </Button>
        <Modal visible={visible} style={styles.newEntryFormContainer}>
          <CheckInScreen setVisible={setVisible} />
        </Modal>
      </View>
    </View>
  );
};

export const CheckInWidgetComponent = () => {
  const dispatch = useDispatch();
  const checkIns = useSelector(selectRecentCheckInsWithinRange(10));
  let positiveCheckIns = checkIns.filter((checkIn) =>
    [].concat
      .apply(
        [],
        [
          Object.keys(EmojiCluster["Cluster 4"]),
          Object.keys(EmojiCluster["Cluster 5"]),
          Object.keys(EmojiCluster["Cluster 6"]),
        ]
      )
      .includes(checkIn.iconName)
  );
  let neutralCheckIns = checkIns.filter((checkIn) =>
    [].concat
      .apply([], [Object.keys(EmojiCluster["Cluster 3"])])
      .includes(checkIn.iconName)
  );
  let negativeCheckIns = checkIns.filter((checkIn) =>
    [].concat
      .apply(
        [],
        [
          Object.keys(EmojiCluster["Cluster 1"]),
          Object.keys(EmojiCluster["Cluster 2"]),
        ]
      )
      .includes(checkIn.iconName)
  );

  let filter = "week";
  console.log(checkIns);
  return (
    <View style={{ width: "100%", alignSelf: "center", }}>
      <Card
        style={{
          borderRadius: 35,
          marginTop: 10,
          width: '95%',
          alignSelf: "center"
        }}
        header={CheckInWidgetHeader}
        footer={NewCheckInWidget}
      >
        <View
          style={{
            flexDirection: "row",
            alignContent: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ justifyContent: "center" }}>
            <Text category="p1">You've checked in </Text>
            <Text category="h6" style={{fontWeight: "600"}}>{checkIns.length} times</Text>
            <Text category="p1">over the past {filter}</Text>
          </View>
          <View style={{ justifyContent: "center", flexDirection: "row" }}>
            <View
              style={{
                flexDirection: "column",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <Text
                category="p1"
                style={{ alignSelf: "center", justifyContent: "center" }}
              >
                {positiveCheckIns.length}
              </Text>
              <Svg
                height={"30px"}
                width={"30px"}
                preserveAspectRatio="xMinYMin slice"
                viewbox="0 0 30 30"
              >
                {retrieveSVGAssetFromUnicode("1F642")}
              </Svg>
            </View>
            <View
              style={{
                flexDirection: "column",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <Text
                category="p1"
                style={{ alignSelf: "center", justifyContent: "center" }}
              >
                {neutralCheckIns.length}
              </Text>
              <Svg
                height={"30px"}
                width={"30px"}
                preserveAspectRatio="xMinYMin slice"
                viewbox="0 0 30 30"
              >
                {retrieveSVGAssetFromUnicode("1F610")}
              </Svg>
            </View>
            <View
              style={{
                flexDirection: "column",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <Text
                category="p1"
                style={{ alignSelf: "center", justifyContent: "center" }}
              >
                {negativeCheckIns.length}
              </Text>
              <Svg
                height={"30px"}
                width={"30px"}
                preserveAspectRatio="xMinYMin slice"
                viewbox="0 0 30 30"
              >
                {retrieveSVGAssetFromUnicode("2639")}
              </Svg>
            </View>
          </View>
        </View>
      </Card>
    </View>
  );
};

// if this is called in a shuffle, the new emojis shouldn't be the same as the old ones
// UNLESS it is a shuffle among a specific cluster - then only the "anchored" emoji should
// stay the same
function generateMoodOptions(shuffleOptions?: any) {
  if (shuffleOptions) {
    let { currentEmojis, selectedEmoji } = shuffleOptions;
    if (selectedEmoji) {
      // shuffle other options within selected emoji cluster
    } else {
      // just random shuffle, but make sure new elements are distinct from old ones
    }
    return;
  } else {
    let options = [];
    for (let cluster in EmojiCluster) {
      let possibleEmojis = EmojiCluster[cluster];
      let emoji_keys = Object.keys(possibleEmojis);
      let randomEmoji =
        possibleEmojis[emoji_keys[(emoji_keys.length * Math.random()) << 0]];
      randomEmoji = { ...randomEmoji, cluster };
      options.push(randomEmoji);
    }
    return options;
  }
}

export const CheckInEmojiSelectionComponent = ({
  dimensions,
  handleChange,
  values,
  ...props
}) => {
  let { PI } = Math;
  let angles = [
    (2 * PI) / 6,
    (4 * PI) / 6,
    (6 * PI) / 6,
    (8 * PI) / 6,
    (10 * PI) / 6,
    (12 * PI) / 6,
  ];

  let [emotionChoice, setEmotionChoice] = useState({ emoji: "", iconName: "" });
  let [options, setOptions] = useState(generateMoodOptions());
  let emojiSvgs = options.map(({ unicode }) =>
    retrieveSVGAssetFromUnicode(unicode)
  );

  let handleShuffle = () => {
    setOptions(generateMoodOptions());
  };

  let handleEmotionClick = (option) => {
    if (emotionChoice == option.unicode) {
      setEmotionChoice({ emoji: option.unicode, iconName: option.name });
      props.formik.setFieldValue("emotion", "");
      props.formik.setFieldValue("iconName", "");
    } else {
      setEmotionChoice({ emoji: option.unicode, iconName: option.name });
      props.formik.setFieldValue("emotion", option.unicode);
      props.formik.setFieldValue("iconName", option.name);
    }
  };

  return (
    <View
      style={{
        alignSelf: "center",
        height: "80%",
        width: dimensions.width,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {angles.map((position, index) => {
        return (
          <Pressable
            onPress={() => {
              handleEmotionClick(options[index]);
            }}
            style={{
              position: "absolute",
              transform: [
                { translateX: 100 * Math.cos(position) },
                { translateY: 100 * Math.sin(position) },
              ],
            }}
            key={index}
          >
            <Svg height={"60px"} width={"60px"}>
              {emojiSvgs[index]}
            </Svg>
          </Pressable>
        );
      })}
      <Pressable
        onPress={() => {
          handleShuffle();
        }}
      >
        <Icon size={40} name="swap" />
      </Pressable>
    </View>
  );
};

const CheckInEmojiSelection = connect(CheckInEmojiSelectionComponent);

export const CheckInScreen = ({ setVisible }) => {
  const dispatch = useDispatch();
  const [checkInDraft, setCheckInDraft] = useState({
    id: String(uuid.v4()),
    emotion: "",
    date: dayjs().unix(),
    order: useSelector(selectLatestEntryOrder) + 1,
  } as CheckIn);

  let [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const onLayout = ({ nativeEvent }) => {
    let { width, height } = nativeEvent.layout;
    setDimensions({
      width,
      height,
    });
  };

  return (
    <Formik
      initialValues={{ emotion: "", iconName: "" }}
      onSubmit={(values) => console.log(values)}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <Card
          style={{
            height: "100%",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
          onLayout={onLayout}
        >
          <Text
            style={{
              fontSize: 24,
              alignSelf: "center",
            }}
          >
            How are you doing?
          </Text>
          <CheckInEmojiSelection
            dimensions={dimensions}
            handleChange={handleChange}
          />
          <Button
            onPress={() => {
              if (values.emotion !== "") {
                dispatch(
                  addCheckIn({ newCheckIn: { ...checkInDraft, ...values } })
                );
              }
              setVisible(false);
            }}
          >
            Check In
          </Button>
        </Card>
      )}
    </Formik>
  );
};

export const NewCheckInWidget = () => {
  const [visible, setVisible] = React.useState(false);

  return (
    <View style={styles.container}>
      <Text category="p2" style={{ fontWeight: "600" }}>
        FILTER BY
      </Text>
      <Button
        size="small"
        status="primary"
        onPress={() => setVisible(true)}
        style={styles.widgetButtonContainer}
      >
        WEEK
      </Button>
      <Modal visible={visible} style={styles.newEntryFormContainer}>
        <CheckInScreen setVisible={setVisible} />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingVertical: 10,
  },
  widgetButtonContainer: {
    marginLeft: 10,
    marginRight: 25,
  },
  newEntryFormContainer: {
    height: "80%",
    width: "80%",
  },
});
