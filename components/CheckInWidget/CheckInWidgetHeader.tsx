import React, { useState } from "react";
import {  View, StyleSheet } from "react-native";
import { Button, Modal, Text } from "@ui-kitten/components";
import { AntDesign as Icon } from "@expo/vector-icons";
import { NewCheckInFormScreen } from "../NewCheckInForm";

export const CheckInWidgetHeader = () => {
    let [visible, setVisible] = useState(false);
    let user = "Akhil";
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingVertical: 16,
          paddingHorizontal: 24,
        }}
      >
        <View style={{alignSelf: "center"}}>
          <Text category="h5" style={{ fontWeight: "600" }}>
            Hello {user},
          </Text>
          <Text category="h5" style={{ fontWeight: "600" }}>
            how are you doing?
          </Text>
        </View>
        <View style={{ justifyContent: "center", alignContent: "center" }}>
          <Button
            style={{
              height: 64,
              width: 64,
              borderRadius: 7,
            }}
            onPress={() => setVisible(true)}
          >
            <Icon size={40} name="plus" color="white" />
          </Button>
          <Modal visible={visible} style={styles.newEntryFormContainer}>
            <NewCheckInFormScreen setVisible={setVisible} />
          </Modal>
        </View>
      </View>
    );
  };

  const styles = StyleSheet.create({
    newEntryFormContainer: {
      height: "80%",
      width: "80%"
    }
  })