import React, { useCallback, useEffect, useState } from "react";
import { View, Text, Image, TextInput, Button } from "react-native";
//@ts-ignore
import logo from "../../assets/images/logo_white.png";
//@ts-ignore
import bg from "../../assets/images/bg.svg";
import { router } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { auth } from "../../lib/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";

SplashScreen.preventAutoHideAsync();

const Register = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [fontsLoaded, fontError] = useFonts({
		PlastoHeader: require("../../assets/fonts/PlastoTrial-ExtraBold.otf"),
		PlastoText: require("../../assets/fonts/PlastoTrial-ExtLtExp.otf"),
	});

	const db = getDatabase();

	const handleRegister = async () => {
		setLoading(true);
		let errorMessage = "";
		try {
			if (name === "" || email === "" || password === "") {
				errorMessage = "Please fill all the fields";
			} else {
				const userCredential = await createUserWithEmailAndPassword(
					auth,
					email,
					password
				);
				const user = userCredential.user;

				const userRef = ref(db, `users/${user.uid}`);

				const newUserInfo = {
					name: name,
					email: email,
					user_id: user.uid,
					friends: [],
				};

				await set(userRef, newUserInfo);

				await updateProfile(user, {
					displayName: name,
				});

				setTimeout(() => {
					router.replace("auth/login");
				}, 1200);
			}
		} catch (error: any) {
			if (error.code === "auth/email-already-in-use") {
				errorMessage = "Email already in use";
			} else if (error.code === "auth/invalid-email") {
				errorMessage = "Invalid email";
			} else if (error.code === "auth/weak-password") {
				errorMessage = "Password must be at least 6 characters";
			} else {
				errorMessage = "An error occurred";
			}
		} finally {
			setLoading(false);
			if (errorMessage) {
				setError(errorMessage);
			}
		}
	};

	const onLayoutRootView = useCallback(async () => {
		if (fontsLoaded || fontError) {
			await SplashScreen.hideAsync();
		}
	}, [fontsLoaded, fontError]);

	if (auth.currentUser) {
		router.replace("chat/layout");
	}

	useEffect(() => {
		onLayoutRootView();
	}, [onLayoutRootView]);

	if (!fontsLoaded && !fontError) {
		return null;
	}
	return (
		<View className='w-full h-screen'>
			<Image
				source={bg}
				style={{
					position: "absolute",
					width: "100%",
					height: "35%",
					resizeMode: "cover",
				}}
			/>
			<View className=' w-full px-14 py-24 flex justify-center'>
				<Image
					className='mx-auto'
					source={logo}
					style={{ width: 120, height: 120, resizeMode: "contain" }}
				/>
				<Text
					className='text-center font-bold text-2xl -mt-8 text-white'
					style={{
						fontFamily: "PlastoHeader",
						fontWeight: "bold",
					}}>
					Register
				</Text>
				<View className='flex flex-col gap-2 mt-10'>
					{error && <Text className='text-red-500 text-center'>{error}</Text>}
					{/* Name */}
					<Text
						style={{
							fontFamily: "PlastoText",
						}}
						className='text-primary'>
						Full Name
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
							onChangeText={(name) => setName(name)}
						/>
					</View>
					{/* End of name */}
					{/* Email */}
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
				</View>
				<View className='mt-10'>
					<Button
						title='Register'
						color='#FF60DD'
						onPress={handleRegister}
					/>
				</View>
			</View>
		</View>
	);
};

export default Register;
