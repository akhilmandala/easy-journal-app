import { AntDesign } from "@expo/vector-icons";
import React, { useCallback, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import {
	PanGestureHandler,
	PanGestureHandlerGestureEvent,
	GestureHandlerRootView,
    TapGestureHandler,
} from "react-native-gesture-handler";
import { Svg } from "react-native-svg";
import Animated, {
	interpolate,
	runOnJS,
	useAnimatedGestureHandler,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from "react-native-reanimated";
import { retrieveSVGAssetFromUnicode } from "../../utils/SVGImports";

const ICON_SIZE = 20;

const clamp = (value: number, min: number, max: number) => {
	"worklet";
	return Math.min(Math.max(value, min), max);
};

export const SlidingCounter = ({options, onSelect}) => {

	const translateX = useSharedValue(0);
	const translateY = useSharedValue(0);

	const [count, setCount] = useState(0);
  console.log(count)
	const MAX_SLIDE_OFFSET = 150 * 0.3;

	// wrapper function
	const incrementCount = useCallback(() => {
    if(count == options.length - 1) {
      setCount(0)
    } else {
      setCount(count + 1);
	}}, [count, options]);

	const decrementCount = useCallback(() => {
    if(count == 0) {
      setCount(options.length - 1)
    } else {
      setCount(count - 1);
    }
	}, [count, options]);

	const onPanGestureEvent =
		useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
			onActive: (event) => {
				translateX.value = clamp(event.translationX, 0, 0);

				translateY.value = clamp(
					event.translationY,
					-MAX_SLIDE_OFFSET,
					MAX_SLIDE_OFFSET
				);
			},
			onEnd: () => {
				if (translateX.value === MAX_SLIDE_OFFSET) {
					// Increment
					runOnJS(incrementCount)();
				} else if (translateX.value === -MAX_SLIDE_OFFSET) {
					// Decrement
					runOnJS(decrementCount)();
				} else if (translateY.value === MAX_SLIDE_OFFSET) {
					runOnJS(decrementCount)();
				} else if (translateY.value === -MAX_SLIDE_OFFSET) {
					runOnJS(incrementCount)();
				}

				translateX.value = withSpring(0);
				translateY.value = withSpring(0);
			},
		});

	const rStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{ translateX: translateX.value },
				{ translateY: translateY.value },
			],
		};
	}, []);


	return (
		<View>
			<View
				style={{
					...StyleSheet.absoluteFillObject,
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<PanGestureHandler onGestureEvent={onPanGestureEvent}>
					<Animated.View style={[styles.circle, rStyle]}>
                        <Pressable onPress={() => {onSelect(options[count])}}>
						<Svg
							height={"40px"}
							width={"40px"}
							preserveAspectRatio="xMinYMin slice"
						>
							{retrieveSVGAssetFromUnicode(options[count].unicode)}
						</Svg>
                        </Pressable>
					</Animated.View>
				</PanGestureHandler>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	button: {
		height: 150,
		width: 50,
		backgroundColor: "#111111",
		alignItems: "center",
		justifyContent: "space-between",
		flexDirection: "column",
	},
	countText: {
		fontSize: 25,
		color: "white",
	},
	circle: {
		height: 50,
		width: 50,
		borderRadius: 25,
		position: "absolute",
		justifyContent: "center",
		alignItems: "center",
	},
});
