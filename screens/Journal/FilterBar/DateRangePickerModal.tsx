import {
	View,
	Pressable,
} from "react-native";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import {
	selectEarliestEntry,
} from "../../../redux/journalEntries/journalEntriesSlice";
import { useState } from "react";
import { Modal } from "@ui-kitten/components";
import { AntDesign as Icon } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";

export function DateRangePicker() {
	let { date: earliestEntryDate } = useSelector(selectEarliestEntry);
	console.log(earliestEntryDate);
	let [datePickerMenuVisible, setDatePickerMenuVisible] = useState(false);
	let [{ bottomDateBound, topDateBound }, setDateBounds] = useState({
		bottomDateBound: dayjs.unix(earliestEntryDate).toDate(),
		topDateBound: dayjs().toDate(),
	});

	console.log(bottomDateBound);
	console.log(topDateBound);

	return (
		<View>
			<Modal
				visible={datePickerMenuVisible}
				style={{
					height: "40%",
					width: 300,
					backgroundColor: "white",
					borderWidth: 2,
					borderRadius: 40,
				}}
			>
				<View
					style={{
						justifyContent: "center",
						flexDirection: "column",
						alignContent: "center",
						padding: 20,
						alignSelf: "center",
					}}
				>
					<DateTimePicker
						is24Hour={true}
						value={topDateBound}
						mode="date"
						onChange={(event, date) => {
							setDateBounds({
								bottomDateBound,
								topDateBound: date ? date : dayjs().toDate(),
							});
						}}
						display="default"
						style={{ width: 200 }}
					/>
					<DateTimePicker
						is24Hour={true}
						mode="date"
						value={bottomDateBound}
						onChange={(event, date) => {
							setDateBounds({
								topDateBound,
								bottomDateBound: date ? date : dayjs().toDate(),
							});
						}}
						display="default"
						style={{ width: 200 }}
					/>
				</View>
			</Modal>
			<Pressable
				onPress={() => setDatePickerMenuVisible(!datePickerMenuVisible)}
			>
				<Icon name="clockcircle" size={25}></Icon>
			</Pressable>
		</View>
	);
}