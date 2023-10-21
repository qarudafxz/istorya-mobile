import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";

const preloader = () => {
	const [visible, setVisible] = useState(true);

	useEffect(() => {
		setTimeout(() => {
			setVisible(false);
		}, 3000);
	}, []);
	return (
		<>
			{!visible && (
				<View className='absolute z-10 top-0 left-0'>
					<Text>Loading</Text>
				</View>
			)}
		</>
	);
};

export default preloader;
