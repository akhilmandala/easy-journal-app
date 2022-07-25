import { StyleSheet, Text } from "react-native"

export function CustomText({children, style={}}) {
    return (
        <Text style={[styles.text, style]}>
            {children}
        </Text>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 18,
        color: "white",
        fontFamily: "Apple SD Gothic Neo"
      }
})