import EmojiCluster from "../../../data/emoji_cluster.json";
import SVG_ICONS, { retrieveSVGAssetFromUnicode } from "../../../utils/SVGImports";
import React, { useState } from "react";
import { View, Pressable } from "react-native";
import { Svg } from "react-native-svg";
import { connect, Formik } from "formik";
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

export const CheckInOptionSelectionComponent = ({
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

export const CheckInOptionSelection = connect(CheckInOptionSelectionComponent);
