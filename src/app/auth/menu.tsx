import React, { useCallback, useEffect, useState } from "react";
import { Text, View, Image } from "react-native";
import { Link } from "expo-router";

//@ts-ignore
import logo from "../../assets/images/logo.png";
//@ts-ignore
import illustration from "../../assets/images/illustration.png";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

const Menu = () => {
	const [fontsLoaded, fontError] = useFonts({
		PlastoHeader: require("../../assets/fonts/PlastoTrial-ExtraBold.otf"),
		PlastoText: require("../../assets/fonts/PlastoTrial-ExtLtExp.otf"),
	});

	const onLayoutRootView = useCallback(async () => {
		if (fontsLoaded || fontError) {
			await SplashScreen.hideAsync();
		}
	}, [fontsLoaded, fontError]);

	useEffect(() => {
		onLayoutRootView();
	}, [onLayoutRootView]);

	if (!fontsLoaded && !fontError) {
		return null;
	}
	return (
		<View className='w-full h-screen flex justify-center items-center px-14'>
			<Image
				source={illustration}
				style={{
					height: "35%",
					width: "80%",
					resizeMode: "contain",
				}}
			/>

			<Image
				source={logo}
				style={{ width: 120, height: 120, resizeMode: "contain" }}
			/>
			<Text
				style={{
					fontFamily: "PlastoText",
				}}
				className='text-center text-zinc-500 -mt-10 mb-10'>
				Puhonan sa katawa ug walay undangay nga chika diri sa istorya.
			</Text>

			<View className='w-full flex flex-col gap-4'>
				<Link
					href='auth/login'
					style={{
						fontFamily: "PlastoText",
						color: "#FF60DD",
					}}
					className='border border-primary text-center py-4 rounded-full'>
					Login
				</Link>
				<Link
					href='auth/register'
					style={{
						fontFamily: "PlastoText",
						color: "#FFF",
					}}
					className='bg-primary text-center py-4 rounded-full'>
					Register
				</Link>
			</View>
			<Text
				style={{
					fontFamily: "PlastoText",
				}}
				className='text-zinc-200 mt-20'>
				Made with ❤︎ by Francis and Riena
			</Text>
		</View>
	);
};

export default Menu;
