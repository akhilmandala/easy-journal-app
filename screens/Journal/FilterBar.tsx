import {
  View,
  FlatList,
  Pressable,
  TouchableOpacity,
  TextInput,
  Text,
  Switch,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { selectAllJournalEntryLabels } from "../../redux/journalEntries/journalEntriesSlice";
import { useState } from "react";
import uuid from "react-native-uuid";

export function LabelSearchDropdownMenu() {
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
      <View style={{ backgroundColor: "#DDDDDD", paddingHorizontal: 5 }}>
        <Text>{label}</Text>
      </View>
    </Pressable>
  );

  function renderItem(item, index) {
    let { id, item: label } = item;
    return (
      <TouchableOpacity
        style={{
          alignItems: "center",
          backgroundColor: "#DDDDDD",
          padding: 10,
        }}
        onPress={() => {
          console.log(chosenLabels);
          console.log(label);
          if (chosenLabels.includes(label.item)) {
            console.log(label);
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
        height: 100,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View>
        <View style={{ height: 20, width: 200, flexDirection: "row" }}>
          {chosenLabels.map((label) => (
            <LabelTag label={label} />
          ))}
        </View>
        <View style={{ height: 20, width: 100 }}>
          <TextInput
            placeholder="Search label"
            value={labelSearchTerm}
            onChangeText={(text) => setLabelSearchTerm(text)}
          ></TextInput>
        </View>
        <FlatList
          data={possibleLabelsToPick}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
}

function DateRangePicker() {}

function EntrySearchBar() {}

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
        alignSelf: "center",
        width: "60%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Switch
        style={{ alignSelf: "center" }}
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={filters.ascending ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={() =>
          setFilters({ ...filters, ascending: !filters.ascending })
        }
        value={filters.ascending}
      />
      <LabelSearchDropdownMenu />
    </View>
  );
}
