import EmojiCluster from "../../../data/emoji_cluster.json";
import SVG_ICONS, {
  retrieveSVGAssetFromUnicode,
} from "../../../utils/SVGImports";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Card, Text } from "@ui-kitten/components";
import { Svg } from "react-native-svg";
import { connect as connectRedux, useDispatch, useSelector } from "react-redux";
import { CheckIn, selectRecentCheckInsWithinRange } from "../../../redux/store";

export const CheckInWidgetStatComponent = ({currentFilter}) => {
  const checkIns = useSelector(selectRecentCheckInsWithinRange(10));
  let positiveCheckIns = checkIns.filter((checkIn: CheckIn) =>
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

  return (
    <View style={styles.container}>
      <View style={{ justifyContent: "center" }}>
        <Text category="p1">You've checked in </Text>
        <Text category="h6" style={{ fontWeight: "600" }}>
          {checkIns.length} times
        </Text>
        <Text category="p1">over the past {currentFilter.toLowerCase()}</Text>
      </View>
      <View style={styles.checkInEmotionBreakdownContainer}>
        {[
          [positiveCheckIns, "1F642"],
          [neutralCheckIns, "1F610"],
          [negativeCheckIns, "2639"],
        ].map(([checkInCategory, checkInCategoryEmotion]) => (
          <View style={styles.emotionBreakdownColumn}>
            <Text
              category="p1"
              style={{ alignSelf: "center", justifyContent: "center" }}
            >
              {checkInCategory.length}
            </Text>
            <Svg
              height={"30px"}
              width={"30px"}
              preserveAspectRatio="xMinYMin slice"
              viewbox="0 0 30 30"
            >
              {retrieveSVGAssetFromUnicode(checkInCategoryEmotion)}
            </Svg>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-between",
  },
  checkInEmotionBreakdownContainer: {
    justifyContent: "center",
    flexDirection: "row",
  },
  emotionBreakdownColumn: {
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
  },
});
