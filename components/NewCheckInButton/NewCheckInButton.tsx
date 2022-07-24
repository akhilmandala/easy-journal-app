import React from "react";
import { Pressable, StyleSheet, View, Text } from "react-native";
import { NewEntryWidgetForm } from "./NewEntryForm";

export const NewEntryWidget = () => {
	const [visible, setVisible] = React.useState(false);

	return (
		<View style={styles.container}>
			<Pressable style={[styles.mainNewCheckInButton]}></Pressable>
            <View style={[styles.addSpecificCheckInSection]}>
                <Pressable></Pressable>
                <Pressable></Pressable>
                <Pressable></Pressable>
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
	},
    mainNewCheckInButton: {
        flex: 0.6
    },
    addSpecificCheckInSection: {
        flex: 0.4,
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center"
    }
});
