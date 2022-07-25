import React, { useState } from "react";
import { Pressable, StyleSheet, View, Text } from "react-native";
import { retrieveSVGAssetFromUnicode } from "../../utils/SVGImports";
import { Svg } from "react-native-svg";

export const NewCheckInButton = () => {
	const [visible, setVisible] = React.useState(false);
	let [shortcutEmojis, setShortcutEmojis] = useState([
		"1F642",
		"1F610",
		"2639",
	]);
	console.log(shortcutEmojis);
	let checkInShortcutColors = ["#f6bd60", "#9f86c0", "#f28482"];

	return (
		<View style={styles.container}>
			<Pressable style={[styles.mainNewCheckInButton]}>
				<View>
					<Text>New Check In</Text>
				</View>
			</Pressable>
			<View style={[styles.addSpecificCheckInSection]}>
				{shortcutEmojis.map((emoji, index) => (
					<View
					>
						<Pressable style={[styles.checkInEmojiShortcutButton, {
							backgroundColor: checkInShortcutColors[index],
                            height: "100%"
						}]}>
							<View>
								<Svg
									height={"40px"}
									width={"40px"}
									preserveAspectRatio="xMinYMin slice"
								>
									{retrieveSVGAssetFromUnicode(emoji)}
								</Svg>
							</View>
						</Pressable>
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
	},
});
