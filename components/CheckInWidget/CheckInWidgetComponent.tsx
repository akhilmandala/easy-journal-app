import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { CheckInWidgetStatComponent } from "./CheckInWidgetStatContent"

export const CheckInWidgetComponent = () => {
  let [currentFilterIndex, setCurrentFilterIndex] = useState(0)
  let filterOptions = [
    "3 DAYS",
    "WEEK",
    "2 WEEKS",
    "MONTH",
    "3 MONTHS",
    "6 MONTHS",
    "YEARS"
  ]


  return (
    <View style={[styles.container]}>
      <View style={[styles.greetingTextContainer]}>
        <Text style={[styles.text, {fontSize: 48}]}>Good morning, </Text>
        <Text style={[styles.text, {fontSize: 48}]}>user.</Text>
      </View>
      <CheckInWidgetStatComponent currentFilter={filterOptions[currentFilterIndex]} textStyle={styles.text} />
      {/** WIP: Redo footer to be date range selector using sliders */}
      {/* <CheckInWidgetFooter filterOptions={filterOptions} currentFilterIndex={currentFilterIndex} setFilterIndex={setCurrentFilterIndex} textStyle={styles.text} /> */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 20,
  },
  greetingTextContainer: {
    marginVertical: 10
  },
  text: {
    fontSize: 18,
    color: "white"
  }
})