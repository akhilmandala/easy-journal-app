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
import { useSelector, connect as connectRedux, useDispatch } from "react-redux";
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

export const NewEntryFormRedesigned = ({ setVisible, editDraft = {} }) => {
	console.log(Dimensions.get("window"));
	//TODO: Option to load previous draft
	let id = String(uuid.v4());
	let latestEntry = useSelector(selectMostRecentJournalEntry);
	let entryDraftBase: JournalEntry = {
		...{
			id,
			emotion: "",
			title: "",
			content: "",
			labels: [],
			date: dayjs().unix(),
			order: latestEntry.order + 1,
		},
		...editDraft,
	};
	const dispath = useDispatch();

	const [draft, setDraft] = React.useState<JournalEntry>(entryDraftBase);

	return (
		<Formik initialValues={draft} onSubmit={(values) => console.log(values)}>
			{({ handleChange, handleBlur, values }) => (
				<View style={{ height: "100%", width: "100%", paddingHorizontal: 20 }}>
					<View
						style={{ flexDirection: "row", justifyContent: "space-between" }}
					>
						<TouchableWithoutFeedback
							onPress={() => {
								Keyboard.dismiss();
							}}
						>
							<TextInput
								placeholder="Title..."
								style={[styles.largeText, styles.titleInput]}
								onChangeText={handleChange("title")}
								onBlur={handleBlur("title")}
								value={values.title}
							></TextInput>
						</TouchableWithoutFeedback>
						<View style={[{ flex: 0.1, alignSelf: "flex-end" }]}>
							<LabelSearchDropdownMenu filter={values} setFilter={({labels}) => values.labels = labels}/>
						</View>
					</View>
					<View>
						<EmojiPickerInputComponent handleChange={handleChange} />
					</View>
					<TouchableWithoutFeedback
						onPress={() => {
							Keyboard.dismiss();
						}}
					>
						<View style={{ width: "100%", height: 400 }}>
							<TextInput
								style={[styles.entryText, styles.entryInput]}
								multiline
								placeholder={PLACEHOLDER_TEXT}
								onChangeText={handleChange("content")}
								onBlur={handleBlur("content")}
								value={values.content}
							/>
						</View>
					</TouchableWithoutFeedback>

					<Pressable
						onPress={() => {
							if (values !== entryDraftBase) {
								dispath(addEntry({ payload: { ...draft, ...values } }));
							}
							setVisible(false);
						}}
						style={[
							{
								height: 100,
								width: 200,
								backgroundColor: "#f4978e",
								borderRadius: 35,
								alignSelf: "center",
								alignItems: "center",
								justifyContent: "center",
							},
						]}
					>
						<View>
							<CustomText style={[{ color: "black" }]}> SAVE </CustomText>
						</View>
					</Pressable>
				</View>
			)}
		</Formik>
	);
};
