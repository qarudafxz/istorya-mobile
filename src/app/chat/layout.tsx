import React, { ReactNode, useEffect } from "react";
import { View, Text } from "react-native";
import { Link, useNavigation } from "expo-router";
import { auth } from "../../lib/firebase";
import Chats from "./chats";
import Login from "../auth/login";
import Navbar from "./navbar";

const Layout = () => {
	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			if (!user) {
				const navigate: any = useNavigation();
				navigate.navigate("auth/login");
			}
		});

		return unsubscribe;
	}, []);

	return (
		<View style={{ flex: 1 }}>
			{auth.currentUser ? <Chats /> : <Login />}

			{/* Bottom navigation bar */}
			<Navbar />
		</View>
	);
};

export default Layout;
