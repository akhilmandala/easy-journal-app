import React, { useState } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { Button, Modal, Text } from "@ui-kitten/components";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  Layout,
  FadeInUp,
  FadeInDown,
  Keyframe,
  Easing,
  withTiming,
  interpolate
} from "react-native-reanimated";
import AnimatedStyleUpdateExample from "../../Stat";

export const CheckInWidgetFooter = ({ filter, ...props }) => {
  console.log(filter);

  let translateY = useSharedValue(0);
  let [currIdx, setIdx] = useState(0);
  let filterOptions = [
    "3 days",
    "week",
    "2 weeks",
    "month",
    "3 months",
    "6 months",
    "year",
  ];
  let selectedOption = filterOptions[currIdx];
  const config = {
    duration: 500,
    easing: Easing.bezier(0.5, 0.01, 0, 1),
  }

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: withTiming(20, config)}]
    }
  })

  let filterComponents = filterOptions.map((filter, index) => (
    <Animated.View
      style={[styles.textWrapper, rStyle]}
    >
      <Pressable
        onPress={() => {
          console.log("press");
          translateY.value += 240
          setIdx(currIdx++)
        }}
      >
        <View style={styles.widgetButtonContainer}>
          <Text
            key={index}
            style={{ color: "white", fontWeight: "500", paddingBottom: 32 }}
          >
            {filter}
          </Text>
        </View>
      </Pressable>
    </Animated.View>
  ));

  return (
    <View style={styles.container}>
      <Text category="p2" style={{ fontWeight: "600" }}>
        FILTER BY
      </Text>
      <AnimatedStyleUpdateExample />
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    height: 40,
    width: 40,
    alignSelf: "flex-start",
    marginRight: 10,
    backgroundColor: "#111111",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginVertical: 15,
  },
  widgetButtonContainer: {
    height: 32,
    width: 64,
    marginRight: 24,
    marginLeft: 12,
    backgroundColor: "rgb(68, 107, 237)",
    borderRadius: 10,
    alignContent: "center",
    justifyContent: "flex-start",
  },
  textWrapper: {},
  widgetButtonText: {
    alignSelf: "center",
  },
});
