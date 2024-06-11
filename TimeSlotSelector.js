import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const TimeSlotSelector = () => {
	const [selectedTimes, setSelectedTimes] = useState([]);
	const [excludedTimes, setExcludedTimes] = useState([]);

	const handleTimeClick = (time) => {
		if (selectedTimes.includes(time)) {
			setSelectedTimes(selectedTimes.filter((t) => t !== time));
		} else {
			setSelectedTimes([...selectedTimes, time]);
		}
	};

	const handleExcludedTimeClick = (time) => {
		if (excludedTimes.includes(time)) {
			setExcludedTimes(excludedTimes.filter((t) => t !== time));
		} else {
			setExcludedTimes([...excludedTimes, time]);
		}
	};

	const processTimes = (times) => {
		if (times.length === 0) return [];

		const sortedTimes = times.sort((a, b) => a - b);
		const ranges = [];
		let start = sortedTimes[0];
		let end = sortedTimes[0];

		for (let i = 1; i < sortedTimes.length; i++) {
			if (sortedTimes[i] === end + 1) {
				end = sortedTimes[i];
			} else {
				ranges.push(start === end ? `${start}` : `${start}-${end}`);
				start = sortedTimes[i];
				end = sortedTimes[i];
			}
		}
		ranges.push(start === end ? `${start}` : `${start}-${end}`);
		return ranges;
	};

	const mergeSelectedAndExcludedTimes = (selected, excluded) => {
		let combinedSelected = [];
		selected.forEach((range) => {
			const [start, end] = range.split("-").map(Number);
			for (let i = start; i <= (end || start); i++) {
				if (!excluded.includes(i)) {
					combinedSelected.push(i);
				}
			}
		});
		return processTimes(combinedSelected);
	};

	useEffect(() => {
		const selectedTimeRanges = processTimes(selectedTimes);
		const excludedTimeRanges = processTimes(excludedTimes);

		const finalSelectedRanges = mergeSelectedAndExcludedTimes(
			selectedTimeRanges,
			excludedTimeRanges
		);

		console.log({
			selectedTimeRange: finalSelectedRanges,
			excludedTime: excludedTimeRanges,
		});
	}, [selectedTimes, excludedTimes]);

	return (
		<View>
			<Text style={styles.header}>Select Times:</Text>
			<View style={styles.timeContainer}>
				{Array.from({ length: 24 }, (_, i) => (
					<TouchableOpacity
						key={i}
						onPress={() => handleTimeClick(i)}
						style={[
							styles.timeSlot,
							{
								backgroundColor: selectedTimes.includes(i)
									? "blue"
									: "lightgray",
							},
						]}
					>
						<Text style={styles.timeText}>{i}</Text>
					</TouchableOpacity>
				))}
			</View>
			<Text style={styles.header}>Exclude Times:</Text>
			<View style={styles.timeContainer}>
				{Array.from({ length: 24 }, (_, i) => (
					<TouchableOpacity
						key={i}
						onPress={() => handleExcludedTimeClick(i)}
						style={[
							styles.timeSlot,
							{
								backgroundColor: excludedTimes.includes(i)
									? "red"
									: "lightgray",
							},
						]}
					>
						<Text style={styles.timeText}>{i}</Text>
					</TouchableOpacity>
				))}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	header: {
		fontSize: 18,
		fontWeight: "bold",
		marginVertical: 10,
	},
	timeContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
		width: 300,
	},
	timeSlot: {
		width: 30,
		height: 30,
		margin: 5,
		alignItems: "center",
		justifyContent: "center",
		borderWidth: 1,
	},
	timeText: {
		color: "black",
		textAlign: "center",
	},
});

export default TimeSlotSelector;
