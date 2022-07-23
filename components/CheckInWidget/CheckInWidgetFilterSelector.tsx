import { useState } from "react";
import { View, Button, Pressable, ScrollView, StyleSheet } from "react-native";
import { IndexPath, Text, Select, SelectItem } from "@ui-kitten/components";

const CheckInWidgetFilterSelector = ({
  options,
  currentOptionIndex,
  handler,
  buttonStyle,
  textStyle,
  scrollLength,
  setOptionIndex,
  ...props
}) => {
  let [indexPath, setIndexPath] = useState(new IndexPath(currentOptionIndex));
  console.log(setOptionIndex);

  return (
    <Select
      size="small"
      value={evaProps =>
        <Text {...evaProps} style={styles.optionStyle}>
          {options[indexPath.row]}
        </Text>
      }
      onSelect={(index) => {
        setOptionIndex(index.row)
        setIndexPath(index);
      }}
    >
      {options.map((option) => (
        <SelectItem
          title={(evaProps) => (
            <Text {...evaProps} style={styles.optionStyle}>
              {option}
            </Text>
          )}
        />
      ))}
    </Select>
  );
};

const styles = StyleSheet.create({
    optionStyle: {
        fontSize: 13,
        fontWeight: "600"
    }
})

export default CheckInWidgetFilterSelector;
