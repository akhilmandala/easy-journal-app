import EmojiCluster from "../../data/emoji_cluster.json";
import SVG_ICONS, { retrieveSVGAssetFromUnicode } from "../../utils/SVGImports";
import RecentCheckInsToolBar from "../../components/RecentCheckInsBar";
import React, { useState } from "react";
import { StyleSheet, View, Dimensions, Pressable } from "react-native";
import { Button, Card, Layout, Modal, Text } from "@ui-kitten/components";
import { Svg } from "react-native-svg";
import { AntDesign as Icon } from "@expo/vector-icons";
import { connect as connectRedux, useDispatch, useSelector } from "react-redux";
import { addCheckIn, CheckIn } from "../../redux/store";
import uuid from "react-native-uuid";
import dayjs from "dayjs";
import { selectLatestEntryOrder } from "../../components/NewEntryForm";
import { connect, Formik } from "formik";

/**
 * TODO:
 * - send new check in action
 * - create check ins history page
 *  - should this be in the journal tab? maybe as a different line
 *  - can add entry / check in filter
 */

const CheckInWidgetComponent = () => {
  const dispatch = useDispatch();
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

  let [emotionChoice, setEmotionChoice] = useState("");
  let [options, setOptions] = useState(generateMoodOptions());
  let emojiSvgs = options.map(({ unicode }) =>
    retrieveSVGAssetFromUnicode(unicode)
  );

  let handleShuffle = () => {
    setOptions(generateMoodOptions());
  };

  let handleEmotionClick = (option) => {
    if (emotionChoice == option.unicode) {
      setEmotionChoice("");
      props.formik.setFieldValue("emotion", "");
    } else {
      setEmotionChoice(option.unicode);
      props.formik.setFieldValue("emotion", option.unicode);
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
              handleEmotionClick(options[index])
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
      initialValues={{ emotion: "" }}
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
          <Button onPress={() => {
            if(values.emotion !== "") {
              dispatch(addCheckIn({newCheckIn: {...checkInDraft, ...values}}))
            }
            setVisible(false)
          }} >Check In</Button>
        </Card>
      )}
    </Formik>
  );
};

export const NewCheckInWidget = () => {
  const [visible, setVisible] = React.useState(false);

  return (
    <Layout style={styles.container} level="1">
      <Button
        onPress={() => setVisible(true)}
        style={styles.widgetButtonContainer}
      >
        Check in
      </Button>
      <Modal visible={visible} style={styles.newEntryFormContainer}>
        <CheckInScreen setVisible={setVisible} />
      </Modal>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: "5%",
    paddingTop: 10,
    width: "90%",
  },
  widgetButtonContainer: {
    borderRadius: 15,
  },
  newEntryFormContainer: {
    height: "80%",
    width: "80%",
  },
});
