import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from "react-native-reanimated";
import { View, Button, Pressable, StyleSheet } from "react-native";
import { Text } from "@ui-kitten/components";
import React, { useState } from "react";

const OptionScrollAnimatedButton = ({
  options,
  buttonStyle,
  textStyle,
  scrollLength,
  ...props
}) => {
  const randomWidth = useSharedValue(0);

  const config = {
    duration: 500,
    easing: Easing.bezier(0.5, 0.01, 0, 1),
  };

  const rStyle = useAnimatedStyle(() => {
    if (randomWidth.value == scrollLength * options.length) {
      randomWidth.value = 0;
      return {
        transform: [{ translateY: withTiming(scrollLength * options.length, config) }],
      };
    }
    return {
      transform: [{ translateY: withTiming(-randomWidth.value, config) }],
    };
  });

  return (
    <Pressable
      onPress={() => {
        randomWidth.value += scrollLength;
      }}
    >
      <View style={{...buttonStyle}}>
        <Animated.View style={[rStyle]}>
          {options.map((option) => (
            <Text style={{...textStyle}}>{option}</Text>
          ))}
        </Animated.View>
      </View>
    </Pressable>
  );
};

export default OptionScrollAnimatedButton;
