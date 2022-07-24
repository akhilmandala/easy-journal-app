import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Button, Card, Layout, Modal, Text } from "@ui-kitten/components";
import { NewEntryWidgetForm } from "./NewEntryForm";

export const NewEntryWidget = () => {
	const [visible, setVisible] = React.useState(false);

	return (
		<View style={styles.container}>
			<Pressable onPress={() => setVisible(true)} style={{flex: 0.8}}>
				<View style={styles.widgetButtonContainer}>
					<Text>New Entry</Text>
				</View>
			</Pressable>
			<View style={[styles.labelSpecificColumn, {flex: 0.2}]}>
				<Pressable onPress={() => setVisible(true)} style={[styles.widgetLabelButtonContainer, {borderTopRightRadius: 15}]}>
					<View>
						<Text>Label 1</Text>
					</View>
				</Pressable>
				<Pressable onPress={() => setVisible(true)} style={[styles.widgetLabelButtonContainer, {borderTopRightRadius: 15}]}>
					<View >
						<Text>Label 2</Text>
					</View>
				</Pressable>
			</View>

			<Modal visible={visible} style={styles.newEntryFormContainer}>
				<NewEntryWidgetForm setVisible={() => setVisible(!visible)} />
			</Modal>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		height: 100,
		marginVertical: 10,
		width: "100%",
		alignSelf: "center",
		flexDirection: "row",
	},
	widgetLabelButtonContainer: { height: "50%", width: "100%%", backgroundColor: "#DFE7FD",  },
	widgetButtonContainer: {
		borderBottomLeftRadius: 15,
    borderTopLeftRadius: 15,
		height: "100%",
		width: "100%%",
		backgroundColor: "#FAD2E1",
	},
	labelSpecificColumn: {
		flexDirection: "column",
	},
	newEntryFormContainer: {
		height: "80%",
		width: "80%",
	},
});
