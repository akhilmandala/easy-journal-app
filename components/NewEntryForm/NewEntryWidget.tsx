import React from "react";
import { Pressable, StyleSheet, View, Text } from "react-native";
import { Button, Card, Layout, Modal } from "@ui-kitten/components";
import { NewEntryWidgetForm } from "./NewEntryForm";

export const NewEntryWidget = () => {
	const [visible, setVisible] = React.useState(false);

	return (
		<View style={styles.container}>
			<Pressable
				onPress={() => setVisible(true)}
				style={[styles.mainAddEntryButton, { flex: 0.8, marginRight: 2 }]}
			>
				<View>
					<Text>New Entry</Text>
				</View>
			</Pressable>
			<View style={[styles.addEntryWithLabelButtonColumn]}>
				<Pressable
					onPress={() => setVisible(true)}
					style={[
						styles.addEntryWithLabelButton,
						{
							borderTopRightRadius: 35,
							marginLeft: 2,
							marginBottom: 2,
							backgroundColor: "#FDE2E4",
						},
					]}
				>
					<View>
						<Text>Label 1</Text>
					</View>
				</Pressable>
				<Pressable
					onPress={() => setVisible(true)}
					style={[
						styles.addEntryWithLabelButton,
						{
							borderBottomRightRadius: 35,
							marginLeft: 2,
							marginTop: 2,
							backgroundColor: "#CDDAFD",
						},
					]}
				>
					<View>
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
		height: 150,
		marginVertical: 10,
		width: "100%",
		alignSelf: "center",
		flexDirection: "row",
	},
	mainAddEntryButton: {
		borderBottomLeftRadius: 35,
		borderTopLeftRadius: 35,
		height: "100%",
		width: "100%%",
		backgroundColor: "#FAD2E1",
		flex: 0.6,
		alignItems: "center",
		justifyContent: "center"
	},
	addEntryWithLabelButtonColumn: {
		flexDirection: "column",
		flex: 0.4,
	},
	addEntryWithLabelButton: {
		height: 73,
		width: "100%%",
		backgroundColor: "#DFE7FD",
		alignItems: "center",
		justifyContent: "center"
	},
	newEntryFormContainer: {
		height: "80%",
		width: "80%",
	},
});
