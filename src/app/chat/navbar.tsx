import { Link } from "expo-router";
import { View, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import {
	MaterialCommunityIcons,
	MaterialIcons,
	FontAwesome,
} from "@expo/vector-icons";
import { getAuth, signOut } from "firebase/auth";

const navbar = () => {
	const menu = [
		{
			icon: (
				<MaterialCommunityIcons
					name='android-messages'
					size={24}
					color='white'
				/>
			),
			label: "Chats",
			link: "chat/chats",
		},
		{
			icon: (
				<MaterialCommunityIcons
					name='message-plus-outline'
					size={24}
					color='white'
				/>
			),
			label: "New Chat",
			link: "chat/message",
		},
		{
			icon: (
				<FontAwesome
					name='group'
					size={24}
					color='white'
				/>
			),
			label: "Groups",
			link: "chat/groups",
		},
	];

	const handleLogout = async () => {
		try {
			const auth = getAuth();
			await signOut(auth);
			router.replace("auth/login");
		} catch (error) {
			console.error("Logout error: ", error);
		}
	};
	return (
		<View className='absolute bottom-0 right-0 left-0 h-16 bg-primary flex flex-row justify-around items-center rounded-t-xl'>
			{menu.map((item) => (
				<Link
					key={item.link}
					href={item.link}>
					{item.icon}
				</Link>
			))}
			<TouchableOpacity onPress={handleLogout}>
				<MaterialIcons
					name='logout'
					size={24}
					color='white'
				/>
			</TouchableOpacity>
		</View>
	);
};

export default navbar;
