import React, { useState } from "react";
import { Pressable, StyleSheet, View, Text } from "react-native";
import { retrieveSVGAssetFromUnicode } from "../../utils/SVGImports";
import { Svg } from "react-native-svg";
import {
	useSharedValue,
	useAnimatedGestureHandler,
	withSpring,
	useAnimatedStyle,
} from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";
import { CustomText } from "../CustomText";
import { SlidingCounter } from "./CheckInShortcutSliderButton";
import { useDispatch, useSelector } from "react-redux";
import uuid from "react-native-uuid";
import dayjs from "dayjs";
import {
	addCheckIn,
	CheckIn,
	selectLatestCheckIn,
} from "../../redux/checkIns/checkInsSlice";

export const NewCheckInButton = () => {
	const [visible, setVisible] = React.useState(false);
	let [shortcutEmojis, setShortcutEmojis] = useState([
		{ unicode: "1F642", iconName: "slightly-smiling-face" },
		{ unicode: "1F610", iconName: "neutral-face" },
		{ unicode: "2639", iconName: "frowning-face" },
	]);
	console.log(shortcutEmojis);
	let checkInShortcutColors = ["#f6bd60", "#9f86c0", "#f28482"];

	const translateY = useSharedValue(0);
	const gestureHandler = useAnimatedGestureHandler({
		onStart: (event, context) => {
			context.startY = translateY.value;
		},
		onActive: (event, context) => {
			translateY.value = context.startY + event.translationY;
		},
		onEnd: (event) => {
			translateY.value = withSpring(0, {
				velocity: event.velocityY,
			});
		},
	});

	const animatedStyle = useAnimatedStyle(() => {
		return {
			transform: [{ translateY: translateY.value }],
		};
	});

	const positiveShortcutEmojis = [
		{ unicode: "1F642", iconName: "slightly-smiling-face" },
		{ unicode: "1F603", iconName: "grinning-face-with-big-eyes" },
		{ unicode: "1F923", iconName: "rolling-on-the-floor-laughing" },
		{ unicode: "1F970", iconName: "smiling-face-with-hearts" },
		{ unicode: "1F973", iconName: "partying-face" },
	];
	const neutralShortcutEmojis = [
		{ unicode: "1F610", iconName: "neutral-face" },
		{ unicode: "1F612", iconName: "unamused-face" },
		{ unicode: "1F623", iconName: "persevering-face" },
		{ unicode: "1F92F", iconName: "exploding-head" },
		{ unicode: "1F62A", iconName: "sleepy-face" },
	];
	const negativeShortcutEmojis = [
        { unicode: "2639", iconName: "frowning-face" },
		{ unicode: "1F621", iconName: "pouting-face" },
		{ unicode: "1F631", iconName: "face-screaming-in-fear" },
		{ unicode: "1F975", iconName: "loudly-crying-face" },
		{ unicode: "1F976", iconName: "cold-face" },
	];
    let checkInOptionMappings = [positiveShortcutEmojis, neutralShortcutEmojis, negativeShortcutEmojis]

	const dispath = useDispatch();
	let latestCheckIn = useSelector(selectLatestCheckIn);

	return (
		<View style={styles.container}>
			<Pressable style={[styles.mainNewCheckInButton]}>
				<CustomText style={{ color: "black" }}>New Check In</CustomText>
			</Pressable>
			<View style={[styles.addSpecificCheckInSection]}>
				{shortcutEmojis.map((emoji, index) => (
					<View
						style={[
							styles.checkInEmojiShortcutButton,
							{
								height: "100%",
								backgroundColor: checkInShortcutColors[index],
							},
						]}
						key={index}
					>
						<SlidingCounter
							onSelect={(emoji) =>
								dispath(
									addCheckIn({
										newCheckIn: {
											emotion: emoji.unicode,
											id: String(uuid.v4()),
											date: dayjs().unix(),
											order: latestCheckIn.order + 1,
											iconName: emoji.iconName,
										},
									})
								)
							}
							options={checkInOptionMappings[index]}
						/>
					</View>
				))}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		height: 150,
		marginVertical: 10,
		width: "100%",
		alignSelf: "center",
		flexDirection: "row",
		borderRadius: 15,
	},
	mainNewCheckInButton: {
		flex: 0.6,
		backgroundColor: "#FAD2E1",
		alignItems: "center",
		justifyContent: "center",
		borderBottomLeftRadius: 15,
		borderTopLeftRadius: 15,
	},
	addSpecificCheckInSection: {
		flex: 0.4,
		flexDirection: "row",
		justifyContent: "space-evenly",
		alignItems: "center",
		borderBottomRightRadius: 15,
		borderTopRightRadius: 15,
	},
	checkInEmojiShortcutButton: {
		justifyContent: "center",
		alignItems: "center",
		height: "100%",
		width: 40,
	},
});
