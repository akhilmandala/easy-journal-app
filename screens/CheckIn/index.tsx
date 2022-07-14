import EmojiCluster from "../../data/emoji_cluster.json";
import SVG_ICONS, { retrieveSVGAssetFromUnicode } from "../../utils/SVGImports";
import RecentCheckInsToolBar from "../../components/RecentCheckInsBar";
import React, { useState } from "react";
import { StyleSheet, View, Dimensions, Pressable } from "react-native";
import { Button, Card, Layout, Modal, Text } from "@ui-kitten/components";
import { Svg } from "react-native-svg";
import { AntDesign as Icon } from "@expo/vector-icons";

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
    return
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

export const CheckInEmojiSelection = ({ dimensions }) => {
  let { PI } = Math;
  let angles = [
    0,
    (2 * PI) / 6,
    (4 * PI) / 6,
    (6 * PI) / 6,
    (8 * PI) / 6,
    (10 * PI) / 6,
    (12 * PI) / 6,
  ];

  let [options, setOptions] = useState(generateMoodOptions());

  let emojiSvgs = options.map(({ unicode }) =>
    retrieveSVGAssetFromUnicode(unicode)
  );

  let handleShuffle = () => {
    setOptions(generateMoodOptions());
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
        console.log(index);
        return (
          <Svg
            height={"60px"}
            width={"60px"}
            style={{
              position: "absolute",
              transform: [
                { translateX: 100 * Math.cos(position) },
                { translateY: 100 * Math.sin(position) },
              ],
            }}
            key={index}
          >
            {emojiSvgs[index]}
          </Svg>
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

export const CheckInScreen = ({ setVisible }) => {
  let [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const onLayout = ({ nativeEvent }) => {
    let { width, height } = nativeEvent.layout;
    setDimensions({
      width,
      height,
    });
  };

  return (
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
      <CheckInEmojiSelection dimensions={dimensions} />
      <Button onPress={() => setVisible(false)}>Check In</Button>
    </Card>
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
