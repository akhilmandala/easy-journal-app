import React, { useState } from "react";
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  Platform,
} from "react-native";
import {
  Button,
  Card,
  Layout,
  Modal,
  Text,
  Input,
} from "@ui-kitten/components";
import { addEntry, JournalEntry } from "../redux/store";
import { Svg } from "react-native-svg";
import uuid from "react-native-uuid";
import dayjs from "dayjs";
import { Formik, connect, getIn } from "formik";
import { useSelector, connect as connectRedux } from "react-redux";
import { retrieveSVGAssetFromUnicode } from "../utils/SVGImports";
import { AntDesign as Icon } from "@expo/vector-icons";

export const selectLatestEntryOrder = (state) =>
  state.journalEntries.entries.length > 0
    ? state.journalEntries.entries[state.journalEntries.entryOrder.at(-1)].order
    : 0;

export const EmojiPickerInputComponent = ({
  handleChange,
  handleBlur,
  values,
  ...props
}) => {
  const DEFAULT_CHOICES = [
    { emoji: "1F973" },
    { emoji: "1F929" },
    { emoji: "1F970" },
    { emoji: "1F976" },
    { emoji: "1F623" },
    { emoji: "1F610" },
  ];

  let [emotionChoice, setEmotionChoice] = useState("");
  let [emotionChoices, setEmotionChoices] = useState(DEFAULT_CHOICES);
  let emotionChoicesSVGs = emotionChoices.map((emotion) =>
    retrieveSVGAssetFromUnicode(emotion.emoji)
  );

  let handleEmotionClick = ({ emoji }) => {
    if (emotionChoice == emoji) {
      setEmotionChoice("");
      props.formik.setFieldValue("emotion", "");
    } else {
      setEmotionChoice(emoji);
      props.formik.setFieldValue("emotion", emoji);
    }
  };

  let handleEmotionChoiceShuffle = () => {
    if (emotionChoice !== "") {
      // shuffle entire set
    } else {
      // shuffle rest of set from picked emoji group
    }
  };

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        paddingVertical: 10,
      }}
    >
      {emotionChoicesSVGs.map((choice, index) => {
        let { emoji } = emotionChoices[index];

        return (
          <Pressable
            onPress={() => handleEmotionClick(emotionChoices[index])}
            key={index}
          >
            <View
              style={{
                borderBottomWidth: emotionChoice == emoji ? 3 : 0,
                borderColor: "rgb(60,105,246)",
                paddingBottom: emotionChoice == emoji ? 0 : 3,
              }}
            >
              <Svg
                height={"40px"}
                width={"40px"}
                preserveAspectRatio="xMinYMin slice"
              >
                {choice}
              </Svg>
            </View>
          </Pressable>
        );
      })}
      <Pressable
        onPress={() => handleEmotionChoiceShuffle()}
        style={{ alignSelf: "center" }}
      >
        <Icon size={20} name="swap" />
      </Pressable>
    </View>
  );
};

const EmojiPickerInput = connect(EmojiPickerInputComponent);

export const NewEntryWidgetFormComponent = ({ setVisible, addEntry }) => {
  //TODO: Option to load previous draft
  let drafts;
  let id = String(uuid.v4());
  let entryDraft: JournalEntry = {
    id,
    emotion: "",
    title: "",
    content: "",
    date: dayjs().unix(),
    order: useSelector(selectLatestEntryOrder) + 1,
  };

  const [draft, setDraft] = React.useState<JournalEntry>(entryDraft);

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
        initialValues={{ emotion: "", title: "", content: "" }}
        onSubmit={(values) => console.log(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <ScrollView
            style={styles.formContainer}
            keyboardShouldPersistTaps="handled"
          >
            <Input
              placeholder="Title"
              onChangeText={handleChange("title")}
              onBlur={handleBlur("title")}
              value={values.title}
            />
            <EmojiPickerInput handleChange={handleChange} />
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
          </ScrollView>
        )}
      </Formik>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{
          flex: 1,
        }}
        keyboardVerticalOffset={150}
      >
        <Button
          onPress={() => {
            handleSubmit();
            addEntry({ ...entryDraft, ...values });
            setVisible(false);
          }}
          style={{}}
        >
          SUBMIT
        </Button>
      </KeyboardAvoidingView>
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
});
