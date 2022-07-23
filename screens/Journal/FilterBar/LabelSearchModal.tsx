import {
	View,
	FlatList,
	Pressable,
	TouchableOpacity,
	TextInput,
	Text,
	Button,
} from "react-native";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import {
	selectAllJournalEntryLabels,
} from "../../../redux/journalEntries/journalEntriesSlice";
import { useState } from "react";
import { Modal } from "@ui-kitten/components";
import { AntDesign as Icon } from "@expo/vector-icons";

export function LabelSearchDropdownMenu( {filter, setFilter} ) {
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

	const LabelTag = ({ label }) => (
		<Pressable
			onPress={() => {
				setChosenLabels(chosenLabels.filter((cLabel) => cLabel !== label));
			}}
		>
			<View style={{ backgroundColor: "#D2D2D2", paddingHorizontal: 5 }}>
				<Text>{label}</Text>
			</View>
		</Pressable>
	);

	function renderItem(item, index) {
		let { id, item: label } = item;
		return (
			<TouchableOpacity
				style={{
					width: "100%",
					alignItems: "center",
					backgroundColor: "#DDDDDD",
					padding: 10,
				}}
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
			<Modal
				visible={labelMenuVisible}
				style={{
					height: 250,
					width: 250,
					backgroundColor: "white",
				}}
			>
				<View
					style={{
						padding: 10,
						height: "100%",
						width: "100%",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<View style={{ height: 40, width: "100%", flexDirection: "row" }}>
						{chosenLabels.map((label) => (
							<LabelTag label={label} />
						))}
					</View>
					<View
						style={{
							height: 40,
							width: "100%",
							borderRadius: 10,
							borderColor: "black",
							overflow: "hidden",
							borderWidth: 2,
							marginVertical: 10,
						}}
					>
						<TextInput
							placeholder="Search label, or type your own..."
							value={labelSearchTerm}
							onChangeText={(text) => setLabelSearchTerm(text)}
							style={{
								alignSelf: "center",
								padding: 10,
								backgroundColor: "#ffffff",
							}}
							onSubmitEditing={({ nativeEvent: { text }}) => {
								setChosenLabels([...chosenLabels, text])
							}}
						></TextInput>
					</View>
					<FlatList
						style={{ width: "100%" }}
						data={possibleLabelsToPick}
						renderItem={renderItem}
						keyExtractor={(item) => item.id}
					/>
					<Button
						onPress={() =>{ 
                            setLabelMenuVisible(!labelMenuVisible)
                            setFilter({...filter, labels: chosenLabels})
                        }}
						title={"APPLY"}
					></Button>
				</View>
			</Modal>
			<Pressable onPress={() => setLabelMenuVisible(!labelMenuVisible)}>
				<Icon name="filter" size={25}></Icon>
			</Pressable>
		</View>
	);
}