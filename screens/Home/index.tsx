import { View, StyleSheet, ScrollView } from "react-native";
import RecentCheckInsToolBar from "../../components/RecentCheckInsBar";
import { connect, useSelector } from "react-redux";
import { FlatList } from "react-native-gesture-handler";
import { NewEntryWidget } from "../../components/NewEntryForm/NewEntryWidget";
import { selectAllJournalEntryLabels, selectRecentEntriesWithinRange } from "../../redux/journalEntries/journalEntriesSlice";
import { CheckInWidgetComponent } from "../CheckIn";
import { SafeAreaView } from "react-native-safe-area-context";
import { JournalEntryCardShort } from "../../components/JournalEntryCard/JournalEntryCard";
import { NewCheckInButton } from "../../components/NewCheckInButton/NewCheckInButton";
import { JournalTabViewShortcut } from "../../components/JournalTabViewShortcut/JournalTabViewShortcut";

export function HomeRedesigned({ navigation }) {
	return <View></View>;
}

export default function Home({ navigation }) {
	let labels = useSelector(selectAllJournalEntryLabels)

	return (
		<View style={styles.screen}>
			<SafeAreaView style={styles.container}>
        <ScrollView>
				<CheckInWidgetComponent />
				<NewCheckInButton />
				<View
					style={{
						flexDirection: "row",
						height: 150,
						width: "100%",
						marginVertical: 10,
					}}
				>
					<View style={{ flex: 1, marginRight: 2 }}>
						<JournalTabViewShortcut label={labels[0]} />
					</View>
					<View style={{ flex: 1, marginLeft: 2 }}>
						<JournalTabViewShortcut label={labels[1]} />
					</View>
				</View>
				<NewEntryWidget labels={labels} />
        <View style={{height: 200}}></View>
        </ScrollView>
			</SafeAreaView>
		</View>
	);
}

const styles = StyleSheet.create({
	screen: {
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		height: "100%",
		width: "100%",
	},
	container: {
		height: "100%",
		width: "100%",
		alignItems: "center",
		flexDirection: "column",
		alignSelf: "center",
		paddingHorizontal: 20,
	},
});
