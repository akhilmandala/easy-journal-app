import { useState } from "react";
import {
  StyleSheet,
  View,
  StyleProp,
  ViewStyle,
  ViewProps,
} from "react-native";
import { Text } from "@ui-kitten/components";
import dayjs from "dayjs";
import { retrieveSVGAssetFromUnicode } from "../utils/SVGImports";
import { Svg, Circle } from "react-native-svg";
import { DEFAULT_CHECK_INS, selectCheckInsWithinRange, selectRecentCheckInsWithinRange } from "../redux/store";
import { useSelector } from "react-redux";
import EmojiCluster from "../data/emoji_cluster.json"

/**
 * TODO:
 * - Start working on user defined emotion arousal / valence
 * - Include emoji name in data, not just unicode (can be used to map to specific SVG)
 */

const styles = StyleSheet.create({
  container: {
    paddingTop: 48,
    paddingBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    backgroundColor: "rgb(60,105,246)",
  },
  recentCheckInToolbarItem: {
    justifyContent: "center",
    alignItems: "center",
  },
  recentCheckInToolBarText: {
    fontSize: 12,
    color: "white",
    fontWeight: "600",
  },
  previousCheckIns: {
    flex: 1,
    justifyContent: "space-evenly",
    flexDirection: "row",
  },
  currentCheckIn: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  checkInButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

interface Props extends ViewProps {
  style?: StyleProp<ViewStyle>;
  recentCheckIns?: CheckInToolBarInput;
}

const formatHour = (hour: number) => {
  if (hour == 0) {
    return "12 A.M.";
  } else if (hour == 12) {
    return "12 P.M.";
  } else if (hour > 12) {
    return hour - 12 + " P.M.";
  } else {
    return hour + " A.M.";
  }
};

export const RecentCheckInsToolBar: React.FC<Props> = ({ style }) => {
  let recentCheckIns = useSelector(selectRecentCheckInsWithinRange(3));
  recentCheckIns.reverse()
  let recentCheckInSVGs = recentCheckIns.map((checkIn) => {
    let {emotion} = checkIn;
    return retrieveSVGAssetFromUnicode(emotion);
  });

  return (
    <View style={[styles.container]}>
      <View style={styles.previousCheckIns}>
        <View style={styles.recentCheckInToolbarItem}>
          <Text style={styles.recentCheckInToolBarText}>
            {formatHour(dayjs.unix(recentCheckIns[0].date).hour())}
          </Text>
          <Svg
            height={"40px"}
            width={"40px"}
            preserveAspectRatio="xMinYMin slice"
          >
            {recentCheckInSVGs[0] ? (
              recentCheckInSVGs[0]
            ) : (
              <Circle cx="20" cy="20" r="20" fill="rgb(60,105,246)" />
            )}
          </Svg>
        </View>
        <View style={styles.recentCheckInToolbarItem}>
          <Text style={styles.recentCheckInToolBarText}>
            {formatHour(dayjs.unix(recentCheckIns[1].date).hour())}
          </Text>
          <Svg
            height={"40px"}
            width={"40px"}
            preserveAspectRatio="xMinYMin slice"
          >
            {recentCheckInSVGs[1] ? (
              recentCheckInSVGs[1]
            ) : (
              <Circle cx="20" cy="20" r="20" fill="rgb(60,105,246)" />
            )}
          </Svg>
        </View>
      </View>
      <View style={styles.currentCheckIn}>
        <View style={styles.recentCheckInToolbarItem}>
          <Text style={styles.recentCheckInToolBarText}>
            {formatHour(dayjs.unix(recentCheckIns[2].date).hour())}
          </Text>
          <Svg
            height={"40px"}
            width={"40px"}
            preserveAspectRatio="xMinYMin slice"
          >
            {recentCheckInSVGs[2] ? (
              recentCheckInSVGs[2]
            ) : (
              <Circle cx="20" cy="20" r="20" fill="rgb(60,105,246)" />
            )}
          </Svg>
        </View>
      </View>
      <View style={styles.checkInButton}>
        <Svg
          height={"40px"}
          width={"40px"}
          preserveAspectRatio="xMinYMin slice"
        >
          <Circle cx="20" cy="20" r="20" fill="rgb(60,105,246)" />
        </Svg>
      </View>
    </View>
  );
};

RecentCheckInsToolBar.defaultProps = {
  recentCheckIns: DEFAULT_CHECK_INS,
};

export default RecentCheckInsToolBar;
