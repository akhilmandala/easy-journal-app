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
    fontWeight: "600"
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

interface CHECK_IN {
  emoji?: string;
  id: string;
  timestamp: dayjs.Dayjs;
}

type CheckInToolBarInput = [CHECK_IN, CHECK_IN, CHECK_IN];
/** [last, 2nd last, 3rd last] */
let DEFAULT_CHECK_INS: CheckInToolBarInput = [
  {
    emoji: "1F973",
    id: "3",
    timestamp: dayjs().subtract(9, "hours"),
  },
  {
    emoji: "1F929",
    id: "2",
    timestamp: dayjs().subtract(5, "hours"),
  },
  {
    emoji: "1F970",
    id: "1",
    timestamp: dayjs().subtract(4, "hours"),
  },
];

interface Props extends ViewProps {
  style?: StyleProp<ViewStyle>;
  recentCheckIns?: CheckInToolBarInput;
}

const formatHour = (hour: number) => {
  if (hour == 0) {
    return "12 A.M."
  } else if (hour == 12) {
    return "12 P.M."
  } else if (hour > 12) {
    return hour - 12 + " P.M."
  } else {
    return hour + " A.M.";
  }
}
export const RecentCheckInsToolBar: React.FC<Props> = ({
  style,
  recentCheckIns = DEFAULT_CHECK_INS,
}) => {
  let recentCheckInSVGs = recentCheckIns.map((checkIn) =>
    retrieveSVGAssetFromUnicode(checkIn.emoji)
  );

  return (
    <View style={[styles.container]}>
      <View style={styles.previousCheckIns}>
        <View style={styles.recentCheckInToolbarItem}>
          <Text style={styles.recentCheckInToolBarText}>
            {formatHour(recentCheckIns[0].timestamp.hour())}
          </Text>
          <Svg
            height={"40px"}
            width={"40px"}
            preserveAspectRatio="xMinYMin slice"
          >
            {recentCheckInSVGs[0]}
          </Svg>
        </View>
        <View style={styles.recentCheckInToolbarItem}>
          <Text style={styles.recentCheckInToolBarText}>
            {formatHour(recentCheckIns[1].timestamp.hour())}
          </Text>
          <Svg
            height={"40px"}
            width={"40px"}
            preserveAspectRatio="xMinYMin slice"
          >
            {recentCheckInSVGs[1]}
          </Svg>
        </View>
      </View>
      <View style={styles.currentCheckIn}>
        <View style={styles.recentCheckInToolbarItem}>
          <Text style={styles.recentCheckInToolBarText}>
            {formatHour(recentCheckIns[2].timestamp.hour())}
          </Text>
          <Svg
            height={"40px"}
            width={"40px"}
            preserveAspectRatio="xMinYMin slice"
          >
            {recentCheckInSVGs[2]}
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
