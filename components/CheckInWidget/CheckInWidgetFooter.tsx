import React, { useState } from "react";
import { View, StyleSheet, Pressable, Text } from "react-native";
import { Button, Modal } from "@ui-kitten/components";
import CheckInWidgetFilterSelector from "./CheckInWidgetFilterSelector";

export const CheckInWidgetFooter = ({
  filterOptions,
  currentFilterIndex,
  setFilterIndex,
  textStyle,
  ...props
}) => {
  console.log(setFilterIndex)
  return (
    <View style={styles.container}>
      <CheckInWidgetFilterSelector
        currentOptionIndex={currentFilterIndex}
        options={filterOptions}
        buttonStyle={styles.buttonContainer}
        textStyle={styles.optionText}
        scrollLength={24}
        setOptionIndex={setFilterIndex}
      />
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
  optionText: {
    fontWeight: "600",
    fontSize: 13,
    paddingBottom: 14,
    color: "white",
  },
  buttonContainer: {
    backgroundColor: "#3366FF",
    borderRadius: 5,
    justifyContent: "flex-start",
    alignContent: "center",
    flexWrap: "wrap",
    overflow: "hidden",
    height: 40,
    width: 80,
    paddingTop: 12
  },
});
