import React, { useState } from "react";
import {
	View,
	Pressable,
} from "react-native";
import { Svg } from "react-native-svg";
import { retrieveSVGAssetFromUnicode } from "../../utils/SVGImports";
import { connect } from "formik";

export const EmojiPickerInputComponent = connect(({
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

	return (
		<View
			style={{
				flexDirection: "row",
				justifyContent: "space-evenly",
				paddingVertical: 10,
				alignSelf: "flex-start",
			}}
		>
			<View
				style={{
					flex: 0.9,
					flexDirection: "row",
					justifyContent: "flex-start",
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
			</View>
		</View>
	);
});