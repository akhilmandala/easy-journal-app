import React, { useState } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { Button, Modal, Text } from "@ui-kitten/components";
import AnimatedStyleUpdateExample from "../../Stat";

export const CheckInWidgetFooter = ({ filter, ...props }) => {
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
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginVertical: 15,
    marginRight: 15,
  },
  widgetButtonContainer: {
    height: 32,
    width: 64,
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
