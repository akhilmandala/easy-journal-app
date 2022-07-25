import React from "react";
import {
	StyleSheet,
	View,
	KeyboardAvoidingView,
	ScrollView,
	Platform,
	Keyboard,
	TextInput,
	Dimensions,
	Pressable,
} from "react-native";
import { Button, Card, Input } from "@ui-kitten/components";
import {
	addEntry,
	JournalEntry,
} from "../../redux/journalEntries/journalEntriesSlice";
import uuid from "react-native-uuid";
import dayjs from "dayjs";
import { Formik, connect } from "formik";
import { useSelector, connect as connectRedux } from "react-redux";
import { selectMostRecentJournalEntry } from "../../redux/journalEntries/journalEntriesSlice";
import { LabelSearchDropdownMenu } from "../FilterBar/LabelSearchModal";
import {
	TouchableOpacity,
	TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { TabBarIcon } from "../../navigation";
import { CustomText } from "../CustomText";
import { EmojiPickerInputComponent } from "./EmojiLinePicker";

const styles = StyleSheet.create({
	container: {
		minHeight: "5%",
		paddingTop: 10,
	},
	widgetButtonContainer: {
		borderRadius: 15,
	},
	formContainer: {
		padding: 0,
		alignSelf: "flex-start",
	},
	entryText: {
		fontSize: 16,
		fontFamily: "Apple SD Gothic Neo",
	},
	entryInput: {
		height: "100%",
	},
	largeText: {
		fontSize: 24,
		fontWeight: "400",
		fontFamily: "Apple SD Gothic Neo",
	},
	titleInput: {
		fontStyle: "italic",
	},
});

const PLACEHOLDER_TEXT =
	"................................................................................................\n\n\n\n\n\n..........................................................................................\n\n\n\n\n\n.............................................................................................!";

export const NewEntryFormRedesigned = ({ setVisible }) => {
	console.log(Dimensions.get("window"));
	return (
		<TouchableWithoutFeedback
			onPress={() => {
				Keyboard.dismiss();
			}}
		>
			<View
				style={[
					StyleSheet.absoluteFill,
					{
						top: Dimensions.get("screen").height - 300,
						left: Dimensions.get("screen").width / 4,
						height: 100,
						width: 200,
						backgroundColor: "#f4978e",
						borderRadius: 35,
					},
				]}
			>
				<Pressable
					onPress={() => {
						setVisible(false);
					}}
					style={[
						{
							height: "100%",
							width: "100%",
							alignItems: "center",
							justifyContent: "center",
						},
					]}
				>
					<CustomText style={[{ color: "black" }]}> SAVE </CustomText>
				</Pressable>
			</View>
			<View style={{ height: "100%", width: "100%", paddingHorizontal: 20 }}>
				<View style={{ flexDirection: "row" }}>
					<TextInput
						placeholder="Title..."
						style={[styles.largeText, styles.titleInput, { flex: 0.9 }]}
					></TextInput>
					<View style={[{ flex: 0.1, alignSelf: "flex-end" }]}>
						<TabBarIcon name="tago" style={{ color: "#f4978e" }} />
					</View>
				</View>
				<View>
					<EmojiPickerInputComponent />
				</View>
				<View style={{ width: "100%", height: 400 }}>
					<TextInput
						style={[styles.entryText, styles.entryInput]}
						multiline
						placeholder={PLACEHOLDER_TEXT}
					/>
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
};

const EmojiPickerInput = connect(EmojiPickerInputComponent);

export const NewEntryWidgetFormComponent = ({ setVisible, addEntry }) => {
	//TODO: Option to load previous draft
	let drafts;
	let id = String(uuid.v4());
	let latestEntry = useSelector(selectMostRecentJournalEntry);
	let entryDraft: JournalEntry = {
		id,
		emotion: "",
		title: "",
		content: "",
		labels: [],
		date: dayjs().unix(),
		order: latestEntry.order + 1,
	};

	const [draft, setDraft] = React.useState<JournalEntry>(entryDraft);
	const DEFAULT_INITIAL_VALUES = {
		emotion: "",
		title: "",
		content: "",
		labels: [],
	};
	return (
		<Card
			disabled={true}
			style={{
				height: "100%",
				width: "100%",
				alignItems: "center",
				justifyContent: "flex-start",
			}}
		>
			<Formik
				initialValues={DEFAULT_INITIAL_VALUES}
				onSubmit={(values) => console.log(values)}
			>
				{({ handleChange, handleBlur, values }) => (
					<View>
						<ScrollView
							style={styles.formContainer}
							keyboardShouldPersistTaps="handled"
						>
							<View
								style={{
									flexDirection: "row",
									width: "100%",
									justifyContent: "space-evenly",
								}}
							>
								<Input
									placeholder="Title"
									onChangeText={handleChange("title")}
									onBlur={handleBlur("title")}
									value={values.title}
									style={{ flex: 1, marginRight: 10 }}
								/>
								<LabelSearchDropdownMenu
									iconSize={20}
									filter={values}
									setFilter={({ labels: newLabels }) => {
										values.labels = newLabels;
									}}
								/>
							</View>
							<EmojiPickerInput handleChange={handleChange} />
							<TouchableOpacity
								activeOpacity={1}
								onPress={() => Keyboard.dismiss()}
								style={{ width: "100%" }}
							>
								<Input
									placeholder="Write whatever you need.."
									size="large"
									multiline={true}
									textStyle={{ height: 400 }}
									numberOfLines={20}
									onChangeText={handleChange("content")}
									onBlur={handleBlur("content")}
									value={values.content}
								/>
							</TouchableOpacity>
						</ScrollView>
						<KeyboardAvoidingView
							behavior={Platform.OS === "ios" ? "padding" : "height"}
							style={{
								flex: 1,
							}}
							keyboardVerticalOffset={100}
						>
							<Button
								onPress={() => {
									if (values !== DEFAULT_INITIAL_VALUES) {
										addEntry({ ...entryDraft, ...values });
									}
									setVisible(false);
								}}
								style={{}}
							>
								SUBMIT
							</Button>
						</KeyboardAvoidingView>
					</View>
				)}
			</Formik>
		</Card>
	);
};

const mapDispatchToProps = (dispatch) => {
	return {
		addEntry: (entry) => {
			dispatch(addEntry({ entry }));
		},
	};
};
export const NewEntryWidgetForm = connectRedux(
	null,
	mapDispatchToProps
)(NewEntryWidgetFormComponent);
