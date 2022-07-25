import React from "react";
import { Pressable, StyleSheet, View, Text } from "react-native";
import { Button, Card, Layout, Modal } from "@ui-kitten/components";
import { NewEntryWidgetForm } from "./NewEntryForm";
import { CustomText } from "../CustomText";
import { SafeAreaView } from "react-native-safe-area-context";

export const NewEntryWidget = ({ labels }) => {
	const [visible, setVisible] = React.useState(false);

	return (
		<View style={styles.container}>
			<Pressable
				onPress={() => setVisible(true)}
				style={[styles.mainAddEntryButton, { flex: 0.8, marginRight: 2 }]}
			>
				<View>
					<CustomText style={[styles.text]}>New Entry</CustomText>
				</View>
			</Pressable>
			<View style={[styles.addEntryWithLabelButtonColumn]}>
				<Pressable
					onPress={() => setVisible(true)}
					style={[
						styles.addEntryWithLabelButton,
						{
							borderTopRightRadius: 15,
							marginLeft: 2,
							marginBottom: 2,
							backgroundColor: "#FDE2E4",
						},
					]}
				>
					<View>
						<CustomText style={[styles.text]}>{labels[0]}</CustomText>
					</View>
				</Pressable>
				<Pressable
					onPress={() => setVisible(true)}
					style={[
						styles.addEntryWithLabelButton,
						{
							borderBottomRightRadius: 15,
							marginLeft: 2,
							marginTop: 2,
							backgroundColor: "#CDDAFD",
						},
					]}
				>
					<View>
						<CustomText style={[styles.text]}>{labels[1]}</CustomText>
					</View>
				</Pressable>
			</View>

			<Modal visible={visible} style={styles.newEntryFormContainer}>
				<SafeAreaView>
					<NewEntryWidgetForm setVisible={() => setVisible(!visible)} />
				</SafeAreaView>
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
		borderBottomLeftRadius: 15,
		borderTopLeftRadius: 15,
		height: "100%",
		width: "100%",
		backgroundColor: "#FAD2E1",
		flex: 0.6,
		alignItems: "center",
		justifyContent: "center",
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
		justifyContent: "center",
	},
	newEntryFormContainer: {
		height: "100%",
		width: "100%",
		backgroundColor: "#FAD2E1",
	},
	text: {
		color: "black",
	},
});
