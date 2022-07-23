import { View, Pressable, StyleSheet } from "react-native";
import dayjs from "dayjs";
import { useState } from "react";
import { AntDesign as Icon } from "@expo/vector-icons";
import { LabelSearchDropdownMenu } from "./LabelSearchModal";
import { DateRangePicker } from "./DateRangePickerModal";
import { useSelector } from "react-redux";

export const FILTER_ICON_SIZE = 20
export function FilterBar({ filters, setFilters }) {
	return (
		<View style={styles.container}>
			<Pressable
				onPress={() =>
					setFilters({ ...filters, ascending: !filters.ascending })
				}
			>
				{filters.ascending ? (
					<Icon name="upcircleo" size={FILTER_ICON_SIZE}></Icon>
				) : (
					<Icon name="downcircleo" size={FILTER_ICON_SIZE}></Icon>
				)}
			</Pressable>
			<LabelSearchDropdownMenu filter={filters} setFilter={setFilters} iconSize={FILTER_ICON_SIZE} />
			<DateRangePicker filter={filters} setFilter={setFilters} iconSize={FILTER_ICON_SIZE} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-evenly",
		alignItems: "center",
		marginVertical: 18
	},
});
