import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Card, Text } from "@ui-kitten/components";
import { useSharedValue } from "react-native-reanimated";
import { CheckInWidgetFooter } from "./CheckInWidgetFooter";
import { CheckInWidgetHeader } from "./CheckInWidgetHeader";
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
      <View style={{ width: "100%", alignSelf: "center" }}>
        <Card
          style={{
            borderRadius: 35,
            marginTop: 10,
            width: '100%',
            alignSelf: "center"
          }}
          header={CheckInWidgetHeader}
          footer={(props) => <CheckInWidgetFooter {...props} filterOptions={filterOptions} currentFilterIndex={currentFilterIndex} setFilterIndex={setCurrentFilterIndex}/>}
        >
          <CheckInWidgetStatComponent currentFilter={filterOptions[currentFilterIndex]} />
        </Card>
      </View>
    );
  };