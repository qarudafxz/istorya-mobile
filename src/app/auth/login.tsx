import React, { useState, useEffect, useCallback } from "react";
import { View, Text, Image, TextInput, Button } from "react-native";
import { auth } from "../../lib/firebase";
import {
	GoogleAuthProvider,
	getAuth,
	signInWithEmailAndPassword,
} from "firebase/auth";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

//@ts-ignore
import logo from "../../assets/images/logo.png";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();
const login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [fontsLoaded, fontError] = useFonts({
		PlastoHeader: require("../../assets/fonts/PlastoTrial-ExtraBold.otf"),
		PlastoText: require("../../assets/fonts/PlastoTrial-ExtLtExp.otf"),
	});

	const handleLogin = () => {
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				const user = userCredential.user;
			})
			.catch((error) => {
				if (
					error.code === "auth/wrong-password" ||
					error.code === "auth/invalid-login-credentials"
				)
					setError("Invalid login credentials");
				else setError("Invalid email");
				console.log(error);
			});
	};

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
		<View className='w-full h-screen flex items-center py-24'>
			<Image
				source={logo}
				style={{
					height: 120,
					width: 120,
					resizeMode: "contain",
				}}
			/>
			<Text
				style={{
					fontFamily: "PlastoHeader",
					color: "#FF60DD",
				}}
				className='text-4xl -mt-4'>
				Login
			</Text>
			<View className=' w-full px-14 flex gap-4 justify-center mt-10'>
				{error && <Text className='text-center text-red-500'>{error}</Text>}
				<Text
					style={{
						fontFamily: "PlastoText",
					}}
					className='text-primary'>
					Email
				</Text>
				<View
					style={{
						display: "flex",
						flexDirection: "row",
						alignItems: "center",
						borderWidth: 1,
						borderColor: "#FF60DD",
						paddingVertical: 6,
						paddingHorizontal: 8,
						borderRadius: 8,
					}}>
					<FontAwesome5
						name='user-circle'
						size={24}
						style={{
							color: "#FF60DD",
							marginRight: 10,
						}}
					/>
					<TextInput
						style={{ flex: 1 }}
						keyboardType='email-address'
						onChangeText={(email) => setEmail(email)}
					/>
				</View>
				<Text
					style={{
						fontFamily: "PlastoText",
					}}
					className='text-primary'>
					Password
				</Text>
				<View
					style={{
						display: "flex",
						flexDirection: "row",
						alignItems: "center",
						borderWidth: 1,
						borderColor: "#FF60DD",
						paddingVertical: 6,
						paddingHorizontal: 8,
						borderRadius: 8,
					}}>
					<AntDesign
						name='lock1'
						size={24}
						style={{
							color: "#FF60DD",
							marginRight: 10,
						}}
					/>
					<TextInput
						style={{ flex: 1 }}
						secureTextEntry={true}
						onChangeText={(password) => setPassword(password)}
					/>
				</View>
				<View className='mt-16'>
					<Button
						title='Login'
						color='#FF60DD'
						onPress={handleLogin}
					/>
				</View>
			</View>
		</View>
	);
};

export default login;
