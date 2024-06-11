import { StatusBar } from "expo-status-bar";
import React from "react";
import { View } from "react-native";
import TimeSlotSelector from "./TimeSlotSelector";

export default function App() {
	return (
		<View>
			<TimeSlotSelector />
		</View>
	);
}
