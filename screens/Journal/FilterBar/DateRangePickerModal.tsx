import {
	View,
	Pressable,
    Button,
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

export function DateRangePicker({filter, setFilter}) {
	let { date: earliestEntryDate } = useSelector(selectEarliestEntry);
	let [datePickerMenuVisible, setDatePickerMenuVisible] = useState(false);
	let [{ bottomDateBound, topDateBound }, setDateBounds] = useState({
		bottomDateBound: dayjs.unix(earliestEntryDate).toDate(),
		topDateBound: dayjs().toDate(),
	});

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
                            setFilter({...filter, dateRange: [filter.dateRange[0], dayjs(topDateBound).unix()]})
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
                            setFilter({...filter, dateRange: [dayjs(bottomDateBound).unix(), filter.dateRange[1]]})
						}}
						display="default"
						style={{ width: 200 }}
					/>
				</View>
                <Button title="Submit" onPress={() => setDatePickerMenuVisible(!datePickerMenuVisible)}></Button>
			</Modal>
			<Pressable
				onPress={() => setDatePickerMenuVisible(!datePickerMenuVisible)}
			>
				<Icon name="clockcircle" size={25}></Icon>
			</Pressable>
		</View>
	);
}