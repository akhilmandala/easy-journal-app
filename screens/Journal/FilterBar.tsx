import {
  View,
  FlatList,
  Pressable,
  TouchableOpacity,
  TextInput,
  Text,
  Switch,
} from "react-native";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import {
  selectAllJournalEntryLabels,
} from "../../redux/journalEntries/journalEntriesSlice";
import { useState } from "react";
import uuid from "react-native-uuid";

const SearchBar = ({ searchTerm, setSearchTerm }) => {
    return (
      <View style={{ height: 20, width: 100 }}>
        <TextInput
          placeholder="Search label"
          value={searchTerm}
          onChangeText={(text) => setSearchTerm(text)}
        ></TextInput>
      </View>
    );
  };
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
      .map((label) => ({ id: uuid.v4().toString(), item: label }));
  
      console.log(chosenLabels)
    const LabelTag = ({label}) => (
      <View style={{ backgroundColor: "#DDDDDD", paddingHorizontal: 5 }}>
        <Text>{label.item}</Text>
      </View>
    );
  
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
          <View style={{ height: 20, width: 200, flexDirection: "row" }}>{chosenLabels.map(label => <LabelTag label={label}/>)}</View>
          <SearchBar
            searchTerm={labelSearchTerm}
            setSearchTerm={setLabelSearchTerm}
          />
          {possibleLabelsToPick.map((label) => (
            <TouchableOpacity
              style={{
                alignItems: "center",
                backgroundColor: "#DDDDDD",
                padding: 10,
              }}
              onPress={() => {
                if(chosenLabels.includes(label)) {
                  setChosenLabels(chosenLabels.filter(cLabel => cLabel !== label))
                } else {
                  setChosenLabels([...chosenLabels, label])
                }
              }}
            >
              <Text>{label.item}</Text>
            </TouchableOpacity>
          ))}
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