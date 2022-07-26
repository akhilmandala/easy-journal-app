import {
	View,
	FlatList,
	Pressable,
	TouchableOpacity,
	TextInput,
	Text,
	Button,
	StyleSheet,
} from "react-native";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { selectAllJournalEntryLabels } from "../../redux/journalEntries/journalEntriesSlice";
import { useState } from "react";
import { Modal } from "@ui-kitten/components";
import { AntDesign as Icon } from "@expo/vector-icons";

const TAG_COLORS = [
	"EAE4E9",
	"FFF1E6",
	"FDE2E4",
	"FAD2E1",
	"DFE7FD",
	"BEE1E6",
	"CDDAFD",
];

export const LabelTag = ({ label, chosenLabels, setChosenLabels }) => {
	return (
		<Pressable
			onPress={() => {
				setChosenLabels(chosenLabels.filter((cLabel) => cLabel !== label));
			}}
		>
			<View style={[styles.chosenLabelTag, { backgroundColor: "#BEE1E6" }]}>
				<Text>{label}</Text>
			</View>
		</Pressable>
	);
};

export function LabelSearchDropdownMenu({ filter, setFilter, iconSize }) {
	const labels: String[] = useSelector(selectAllJournalEntryLabels);
	const [labelSearchTerm, setLabelSearchTerm] = useState("");
	let [chosenLabels, setChosenLabels] = useState([]);
	let possibleLabelsToPick = labels
		.filter(
			(label) =>
				label.toLowerCase().includes(labelSearchTerm.toLowerCase()) &&
				!chosenLabels.includes(label)
		)
		.map((label, index) => ({ id: index, item: label }));
	const [labelMenuVisible, setLabelMenuVisible] = useState(false);

	function renderItem(item, index) {
		let { id, item: label } = item;
		return (
			<TouchableOpacity
				style={styles.possibleLabelChoiceButton}
				onPress={() => {
					if (chosenLabels.includes(label.item)) {
						setChosenLabels(
							chosenLabels.filter((cLabel) => cLabel.item !== label.item)
						);
					} else {
						setChosenLabels([...chosenLabels, label.item]);
					}
				}}
			>
				<Text>{label.item}</Text>
			</TouchableOpacity>
		);
	}

	return (
		<View
			style={{
				alignSelf: "center",
			}}
		>
			<Modal visible={labelMenuVisible} style={styles.modal}>
				<View style={styles.modalFormContainer}>
					<View style={styles.chosenLabelsContainer}>
						{chosenLabels.map((label) => (
							<LabelTag
								label={label}
								chosenLabels={chosenLabels}
								setChosenLabels={setChosenLabels}
							/>
						))}
					</View>
					<View style={styles.searchBar}>
						<TextInput
							placeholder="Search label, or type your own..."
							value={labelSearchTerm}
							onChangeText={(text) => setLabelSearchTerm(text)}
							style={styles.searchLabelInputBar}
							onSubmitEditing={({ nativeEvent: { text } }) => {
								setChosenLabels([...chosenLabels, text]);
							}}
						></TextInput>
					</View>
					<FlatList
						style={{ width: "100%", height: 150, paddingBottom: 20 }}
						data={possibleLabelsToPick}
						renderItem={renderItem}
						keyExtractor={(label) => label.id}
					/>
					<Pressable
						onPress={() => {
							setLabelMenuVisible(!labelMenuVisible);
							setFilter({ ...filter, labels: chosenLabels });
						}}
					>
						<View
							style={{
								height: 40,
								width: 80,
								borderRadius: 10,
								alignContent: "center",
								justifyContent: "center",
								alignSelf: "center",
								backgroundColor: "#C5979D",
							}}
						>
							<Text
								style={{
									fontSize: 12,
									fontWeight: "600",
									alignSelf: "center",
									color: "white",
								}}
							>
								APPLY
							</Text>
						</View>
					</Pressable>
				</View>
			</Modal>
			<Pressable onPress={() => setLabelMenuVisible(!labelMenuVisible)}>
				<Icon name="tago" size={iconSize ? iconSize : 25} color="white"></Icon>
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	chosenLabelTag: {
		paddingHorizontal: 15,
		height: 20,
		borderRadius: 10,
		alignContent: "center",
		justifyContent: "center",
	},
	possibleLabelChoiceButton: {
		width: "100%",
		alignItems: "center",
		backgroundColor: "#CDDAFD",
		padding: 10,
		borderRadius: 10,
		marginVertical: 5,
	},
	modal: {
		height: 350,
		width: 350,
		backgroundColor: "white",
		borderWidth: 2,
		borderRadius: 20,
	},
	modalFormContainer: {
		padding: 10,
		height: "100%",
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
	},
	chosenLabelsContainer: { height: 40, width: "100%", flexDirection: "row" },
	searchBar: {
		height: 40,
		width: "100%",
		borderRadius: 10,
		borderColor: "black",
		overflow: "hidden",
		borderWidth: 2,
		marginVertical: 10,
	},
	searchLabelInputBar: {
		alignSelf: "flex-start",
		padding: 10,
		backgroundColor: "#ffffff",
	},
});
