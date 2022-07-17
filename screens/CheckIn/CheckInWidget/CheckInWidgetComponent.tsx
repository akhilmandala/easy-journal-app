import EmojiCluster from "../../../data/emoji_cluster.json";
import SVG_ICONS, { retrieveSVGAssetFromUnicode } from "../../../utils/SVGImports";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Card, Text } from "@ui-kitten/components";
import { Svg } from "react-native-svg";
import { connect as connectRedux, useDispatch, useSelector } from "react-redux";
import { useSharedValue } from "react-native-reanimated";
import { CheckIn, selectRecentCheckInsWithinRange } from "../../../redux/store";
import { CheckInWidgetFooter } from "./CheckInWidgetFooter";
import { CheckInWidgetHeader } from "./CheckInWidgetHeader";

export const CheckInWidgetComponent = () => {
    const dispatch = useDispatch();
    const checkIns = useSelector(selectRecentCheckInsWithinRange(10));
    let positiveCheckIns = checkIns.filter((checkIn: CheckIn) =>
      [].concat
        .apply(
          [],
          [
            Object.keys(EmojiCluster["Cluster 4"]),
            Object.keys(EmojiCluster["Cluster 5"]),
            Object.keys(EmojiCluster["Cluster 6"]),
          ]
        )
        .includes(checkIn.iconName)
    );
    let neutralCheckIns = checkIns.filter((checkIn) =>
      [].concat
        .apply([], [Object.keys(EmojiCluster["Cluster 3"])])
        .includes(checkIn.iconName)
    );
    let negativeCheckIns = checkIns.filter((checkIn) =>
      [].concat
        .apply(
          [],
          [
            Object.keys(EmojiCluster["Cluster 1"]),
            Object.keys(EmojiCluster["Cluster 2"]),
          ]
        )
        .includes(checkIn.iconName)
    );
  
    let currentFilterIndex = useSharedValue(0)
  //   const animatedStyles = useAnimatedStyle(() => {
  //     return {
  //       slide
  //     }
  // })
  
    let filterOptions = [
      "3 days",
      "week",
      "2 weeks",
      "month",
      "3 months",
      "6 months",
      "year"
    ]
  
    let slide = {
      "0%": {
        top: 0
      },
      "25%": {
        top: -12
      },
      "50%": {
        top: -24
      },
      "75%" : {
        top: -36
      }
    }
  
    let filter = "week";
    console.log(filterOptions[currentFilterIndex.value]);
    return (
      <View style={{ width: "100%", alignSelf: "center", }}>
        <Card
          style={{
            borderRadius: 35,
            marginTop: 10,
            width: '95%',
            alignSelf: "center"
          }}
          header={CheckInWidgetHeader}
          footer={(props) => <CheckInWidgetFooter {...props} filter={filterOptions[currentFilterIndex.value]}/>}
        >
          <View
            style={{
              flexDirection: "row",
              alignContent: "center",
              justifyContent: "space-between",
            }}
          >
            <View style={{ justifyContent: "center" }}>
              <Text category="p1">You've checked in </Text>
              <Text category="h6" style={{fontWeight: "600"}}>{checkIns.length} times</Text>
              <Text category="p1">over the past {filterOptions[currentFilterIndex.value]}</Text>
            </View>
            <View style={{ justifyContent: "center", flexDirection: "row" }}>
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "center",
                  alignContent: "center",
                }}
              >
                <Text
                  category="p1"
                  style={{ alignSelf: "center", justifyContent: "center" }}
                >
                  {positiveCheckIns.length}
                </Text>
                <Svg
                  height={"30px"}
                  width={"30px"}
                  preserveAspectRatio="xMinYMin slice"
                  viewbox="0 0 30 30"
                >
                  {retrieveSVGAssetFromUnicode("1F642")}
                </Svg>
              </View>
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "center",
                  alignContent: "center",
                }}
              >
                <Text
                  category="p1"
                  style={{ alignSelf: "center", justifyContent: "center" }}
                >
                  {neutralCheckIns.length}
                </Text>
                <Svg
                  height={"30px"}
                  width={"30px"}
                  preserveAspectRatio="xMinYMin slice"
                  viewbox="0 0 30 30"
                >
                  {retrieveSVGAssetFromUnicode("1F610")}
                </Svg>
              </View>
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "center",
                  alignContent: "center",
                }}
              >
                <Text
                  category="p1"
                  style={{ alignSelf: "center", justifyContent: "center" }}
                >
                  {negativeCheckIns.length}
                </Text>
                <Svg
                  height={"30px"}
                  width={"30px"}
                  preserveAspectRatio="xMinYMin slice"
                  viewbox="0 0 30 30"
                >
                  {retrieveSVGAssetFromUnicode("2639")}
                </Svg>
              </View>
            </View>
          </View>
        </Card>
      </View>
    );
  };