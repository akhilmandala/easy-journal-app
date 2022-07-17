import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Modal, Text } from "@ui-kitten/components";

export const CheckInWidgetFooter = ({filter, ...props}) => {
    console.log(filter)
  
    return (
      <View style={styles.container}>
        <Text category="p2" style={{ fontWeight: "600" }}>
          FILTER BY
        </Text>
        <Button
          size="small"
          status="primary"
          style={styles.widgetButtonContainer}
        >
          {filter.toUpperCase()}
        </Button>
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-end",
      marginVertical: 15
    },
    widgetButtonContainer: {
      height: 20,
      marginRight: 24,
      marginLeft: 12
    }
  })