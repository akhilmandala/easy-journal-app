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
import { SlidingCounter } from "../../screens/Stat";

export const NewCheckInButton = () => {
	const [visible, setVisible] = React.useState(false);
	let [shortcutEmojis, setShortcutEmojis] = useState([
		"1F642",
		"1F610",
		"2639",
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

	return (
		<View style={styles.container}>
			<Pressable style={[styles.mainNewCheckInButton]}>
				<CustomText style={{ color: "black" }}>New Check In</CustomText>
			</Pressable>
			<View style={[styles.addSpecificCheckInSection]}>
				{shortcutEmojis.map((emoji, index) => (
					<View style={[styles.checkInEmojiShortcutButton, {height: "100%", backgroundColor:checkInShortcutColors[index]}]}>
						<SlidingCounter />
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
        width: 40
	},
});
