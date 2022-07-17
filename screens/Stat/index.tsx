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
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Pressable
        onPress={() => {
          randomWidth.value = Math.random() * 50;
        }}
      >
        <View
          style={{
            width: 100,
            height: 50,
            backgroundColor: "rgb(68, 107, 237)",
            borderRadius: 5,
            alignContent: "center",
            justifyContent: "center",
            flexWrap: "wrap",
            overflow: "hidden"
          }}
        >
          <Animated.View style={[style]}>
            <Text style={{ flexWrap: "wrap" }}>filter</Text>
          </Animated.View>
        </View>
      </Pressable>
    </View>
  );
};

export default AnimatedStyleUpdateExample;
