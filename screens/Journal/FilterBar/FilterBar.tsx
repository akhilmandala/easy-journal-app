import {
	View,
	Pressable,
} from "react-native";
import dayjs from "dayjs";
import { useState } from "react";
import { AntDesign as Icon } from "@expo/vector-icons";
import {LabelSearchDropdownMenu} from "./LabelSearchModal"
import {DateRangePicker} from "./DateRangePickerModal"

export function FilterBar() {
	let [filters, setFilters] = useState({
		ascending: false,
		labels: [],
		dateRange: [0, dayjs().unix()],
		searchTerm: "",
	});
	return (
		<View
			style={{
				width: "100%",
				flexDirection: "row",
				justifyContent: "space-evenly",
				alignItems: "center",
			}}
		>
			<Pressable
				onPress={() =>
					setFilters({ ...filters, ascending: !filters.ascending })
				}
			>
				{filters.ascending ? (
					<Icon name="caretup" size={25}></Icon>
				) : (
					<Icon name="caretdown" size={25}></Icon>
				)}
			</Pressable>
			<LabelSearchDropdownMenu />
			<DateRangePicker />
		</View>
	);
}
