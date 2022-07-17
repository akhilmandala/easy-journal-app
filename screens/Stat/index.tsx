import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from "react-native-reanimated";
import { View, Button, Pressable } from "react-native";
import { Text } from "@ui-kitten/components";
import React, {useState} from "react";

const AnimatedStyleUpdateExample = ({
  translateFilterTextOffset,
  filterText,
  ...props
}) => {
  const randomWidth = useSharedValue(10);

  const config = {
    duration: 500,
    easing: Easing.bezier(0.5, 0.01, 0, 1),
  };

  const style = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: withTiming(-randomWidth.value, config) }],
    };
  });

  let filterIndex = useState(0)

  let filterOptions = [
    "3 days",
    "week",
    "2 weeks",
    "month",
    "3 months",
    "6 months",
    "year",
  ];

  let filterOption = filterOptions.map((filterOption) => (
    <Animated.View
    >
      <Text style={{ flexWrap: "wrap" }}>filter</Text>
    </Animated.View>
  ));

  return (
    <View
      style={{
        width: 100,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Pressable
        onPress={() => {
          randomWidth.value += 38;
        }}
      >
        <View
          style={{
            backgroundColor: "rgb(68, 107, 237)",
            borderRadius: 5,
            justifyContent: "flex-start",
            alignContent: "center",
            flexWrap: "wrap",
            overflow: "hidden",
            height: 40,
            width: 80
          }}
        >
          <View style={{
            alignSelf: "flex-start",
            paddingTop: 11,
          }}>
          <Animated.View style={[style, {flexDirection: "column"}]}>
            {filterOptions.map(filter => <Text style={{ fontWeight: "600",fontSize:15, color:"white", paddingVertical: 10 }}>{filter}</Text>)}
          </Animated.View>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

export default AnimatedStyleUpdateExample;
