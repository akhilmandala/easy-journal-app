import EmojiCluster from "../../data/emoji_cluster.json";
import SVG_ICONS, {
  retrieveSVGAssetFromUnicode,
} from "../../utils/SVGImports";
import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Svg } from "react-native-svg";
import { connect as connectRedux, useDispatch, useSelector } from "react-redux";
import { isNegativeCheckIn, isNeutralCheckin, isPositiveCheckIn, selectCheckinsWithinRange } from "../../redux/checkIns/checkInsSlice";

export const CheckInWidgetStatComponent = ({currentFilter, textStyle}) => {
  const checkIns = useSelector(state => selectCheckinsWithinRange(state, 10));
  let positiveCheckIns = checkIns.filter(isPositiveCheckIn);
  let neutralCheckIns = checkIns.filter(isNeutralCheckin);
  let negativeCheckIns = checkIns.filter(isNegativeCheckIn);

  return (
    <View style={styles.container}>
      <View style={{ justifyContent: "center" }}>
        <Text style={[textStyle]}>You've checked in </Text>
        <Text style={[textStyle, { fontWeight: "600", fontSize: 36 }]}>
          {checkIns.length} times
        </Text>
        <Text style={[textStyle]}>over the past {currentFilter.toLowerCase()}</Text>
      </View>
      <View style={styles.checkInEmotionBreakdownContainer}>
        {[
          [positiveCheckIns, "1F642"],
          [neutralCheckIns, "1F610"],
          [negativeCheckIns, "2639"],
        ].map(([checkInCategory, checkInCategoryEmotion], index) => (
          <View style={styles.emotionBreakdownColumn} key={index}>
            <Text
              style={[textStyle, { alignSelf: "center", justifyContent: "center"}]}
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
