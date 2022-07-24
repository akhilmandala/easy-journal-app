import { Text, Button, Card, Layout } from "@ui-kitten/components";
import { View, StyleSheet, Animated } from "react-native";
import { connect, useSelector } from "react-redux";
import * as dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import advanced from "dayjs/plugin/advancedFormat";
import { removeEntry } from "../../redux/journalEntries/journalEntriesSlice";
import { retrieveSVGAssetFromUnicode } from "../../utils/SVGImports";
import { Svg } from "react-native-svg";

const JournalEntryCardHeader = ({ title, date, emotion, ...props }) => {
	dayjs.extend(timezone);
	dayjs.extend(advanced);
	dayjs.extend(utc);

	let local_date = dayjs.unix(date).tz().format("dddd, MMM D/YY");
	let local_time = dayjs.unix(date).tz().format("h:m a");
	/**
	 * TODO: set this up for other places
	 */

	let svg = emotion ? retrieveSVGAssetFromUnicode(emotion) : null;
	return (
		<View
			{...props}
			style={{
				flexDirection: "row",
				justifyContent: "space-between",
				paddingVertical: 16,
				paddingHorizontal: 24,
			}}
		>
			<View>
				<Text category="h6">{title}</Text>
				<Text category="s1">{local_date}</Text>
				<Text category="s1">{local_time}</Text>
			</View>
			<View style={{ alignSelf: "center" }}>
				{svg && (
					<Svg
						height={"40px"}
						width={"40px"}
						preserveAspectRatio="xMinYMin slice"
					>
						{svg}
					</Svg>
				)}
			</View>
		</View>
	);
};

const JournalEntryCardFooterComponent = ({
	deleteEntry,
	entryId,
	entryLabels,
	...props
}) => (
	<View {...props} style={[props.style, styles.footerContainer]}>
		<View
			style={{
				flexDirection: "row",
			}}
		>
			{entryLabels &&
				entryLabels.map((label) => (
					<View
						style={{
							backgroundColor: "#FDE2E4",
							padding: 3,
							marginHorizontal: 3,
							justifyContent: "center",
							alignContent: "center",
						}}
					>
						<Text>{label}</Text>
					</View>
				))}
		</View>
		<Button
			style={styles.footerControl}
			size="small"
			status="basic"
			onPress={() => {
				console.log("DELETE");
				console.log(props);
				deleteEntry(entryId);
			}}
		>
			ARCHIVE
		</Button>
		<Button style={styles.footerControl} size="small">
			EDIT
		</Button>
	</View>
);

const mapDispatchToProps = (dispatch) => {
	return {
		// dispatching actions returned by action creators
		deleteEntry: (entryId) => dispatch(removeEntry({ entryId })),
	};
};

const JournalEntryCardFooter = connect(
	null,
	mapDispatchToProps
)(JournalEntryCardFooterComponent);

export const JournalEntryCardShort = ({ entry }) => {
	let content = entry.item.content;
	var length = 400;
	var trimmedString =
		content.length > length
			? content.substring(0, length - 3) + "..."
			: content.substring(0, length);

	return (
		<View style={styles.cardContainer}>
			<Card
				style={styles.cardShort}
				header={(props) => (
					<JournalEntryCardHeader
						{...props}
						title={entry.item.title}
						date={entry.item.date}
						emotion={entry.item.emotion}
					/>
				)}
				footer={(props) => (
					<JournalEntryCardFooter
						{...props}
						entryId={entry.item.id}
						entryLabels={entry.item.labels}
					/>
				)}
			>
				<Text>{trimmedString}</Text>
			</Card>
		</View>
	);
};

const styles = StyleSheet.create({
    cardContainer: {
      width: "100%",
    },
    cardShort: {
      borderRadius: 35,
	  width: "100%",
      alignSelf: "center",
    },
    footerContainer: {
      flexDirection: "row",
      justifyContent: "flex-end",
    },
    footerControl: {
      marginHorizontal: 2,
    },
  });
  