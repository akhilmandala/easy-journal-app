import React, { useState } from "react";
import { Pressable, StyleSheet, View, Text } from "react-native";
import { retrieveSVGAssetFromUnicode } from "../../utils/SVGImports";
import { Svg } from "react-native-svg";
import { useSelector } from "react-redux";
import { selectEntriesWithFilter } from "../../redux/journalEntries/journalEntriesSlice";

export const JournalTabViewShortcut = ({ label }) => {
	const [visible, setVisible] = React.useState(false);
	let [shortcutEmojis, setShortcutEmojis] = useState([
		"1F642",
		"1F610",
		"2639",
	]);
	let entriesWithLabel = useSelector((state) =>
		selectEntriesWithFilter(state, {
			ascending: false,
			labels: [label],
			dateRange: [0, 0],
			searchTerm: "",
		})
	);
	console.log(shortcutEmojis);

	return (
		<View style={styles.container}>
			<Pressable style={[styles.mainButton]}>
				<View>
					<Text style={styles.text}>{label}: {entriesWithLabel.length} {entriesWithLabel.length > 1 ?  "entries" : "entry"} </Text>
				</View>
			</Pressable>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		height: 150,
		width: "100%",
		alignSelf: "center",
		flexDirection: "row",
	},
    mainButton: {
        height: "100%",
		width: "100%",
		backgroundColor: "#DFE7FD",
		alignItems: "center",
		justifyContent: "center",
        borderRadius: 15,
    },
    text: {
        fontSize: 16,
        color: "black"
    }
});
