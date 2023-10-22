import React, { useState, useEffect } from "react";
import {
	View,
	TextInput,
	Text,
	Pressable,
	Image,
	Alert,
	ImageSourcePropType,
} from "react-native";
import {
	getDatabase,
	ref,
	push,
	query,
	equalTo,
	get,
	set,
} from "firebase/database";
import { auth } from "../../lib/firebase";
import * as ImagePicker from "expo-image-picker";
import { ScrollView } from "react-native-gesture-handler";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";

type User = {
	name: string;
	email: string;
	user_id: string;
};

const Message = () => {
	const [searchValue, setSearchValue] = useState("");
	const [message, setMessage] = useState("");
	const [image, setImage] = useState(null);
	const [receiverId, setReceiverId] = useState<string | null>(null);
	const [receiverName, setReceiverName] = useState<string | null>(null);
	const [users, setUsers] = useState([]);
	const user = auth.currentUser;

	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: false,
			aspect: [4, 3],
			quality: 1,
		});

		console.log(result);

		if (!result.canceled) {
			setImage(result.assets[0].uri as any);
		}
	};

	const handleGetAllUser = async () => {
		try {
			const db = getDatabase();
			const usersRef = ref(db, "users");

			const usersSnapshot = await get(usersRef);
			const users: User[] = [];
			usersSnapshot.forEach((userSnapshot) => {
				const user = userSnapshot.val();
				if (user.user_id !== auth.currentUser?.uid) users.push(user);
			});
			setUsers(users as any);
		} catch (error) {
			console.error("Error retrieving users:", error);
		}
	};

	useEffect(() => {
		if (searchValue) {
			const db = getDatabase();

			const usersRef = ref(db, "users");

			const userQuery = query(usersRef, equalTo("name", searchValue));
			get(userQuery).then((snapshot) => {
				if (snapshot.exists()) {
					const data = snapshot.val();
					setReceiverId(Object.keys(data)[0]);
				} else {
					setReceiverId(null);
				}
			});
		}
	}, [searchValue]);

	const handleGetReceiverData = (user: User) => {
		setReceiverId(user?.user_id);
		setReceiverName(user?.name);
	};

	const handleSendMessage = () => {
		if (!receiverId) {
			console.log("Reciever ID", receiverId);
		} else if (!message) {
			Alert.alert("Please enter a message");
		} else {
			const db = getDatabase();
			const messagesRef = ref(db, "messages");
			const newMessageRef = push(messagesRef);
			set(newMessageRef, {
				sender_id: user?.uid,
				receiver_id: receiverId,
				receiverName: receiverName,
				senderName: user?.displayName,
				message: message,
				image: image,
				time: new Date().toISOString(),
			});

			setSearchValue("");
			setMessage("");
			setImage(null);
			Alert.alert("Message sent successfully");
		}
	};

	useEffect(() => {
		handleGetAllUser();
	}, []);

	return (
		<View className='flex-1'>
			<TextInput
				className='bg-gray-100 py-4 pl-3 rounded'
				placeholder='To:'
				value={searchValue || receiverName || ""}
				onChangeText={(text) => setSearchValue(text)}
			/>
			<ScrollView className='h-screen'>
				{users?.map((user: User, idx) => {
					return (
						<Pressable
							key={idx}
							className='flex flex-row items-center px-4 py-2'
							onPress={() => handleGetReceiverData(user)}>
							<View className='w-10 h-10 rounded-full bg-primary mr-4' />
							<View className='flex flex-col'>
								<Text className='text-primary font-bold'>{user.name}</Text>
								<Text className='text-zinc-500'>{user.email}</Text>
							</View>
						</Pressable>
					);
				})}
			</ScrollView>
			<View className='flex flex-row w-full'>
				<TextInput
					className='bg-gray-100 p-4 mt-4 ml-4 mb-4 rounded w-64'
					placeholder='Type your message'
					multiline
					value={message}
					onChangeText={(text) => setMessage(text)}
				/>
				{image && (
					<Image
						source={{ uri: image }}
						style={{ width: 40, height: 40 }}
						className='absolute bottom-[26px] right-[140px]'
					/>
				)}
				<Pressable
					onPress={pickImage}
					className='absolute z-10 bottom-[34px] right-[100px]'>
					<MaterialIcons
						name='perm-media'
						size={24}
						color='gray'
					/>
				</Pressable>
				<Pressable
					className='bg-primary p-4 m-4 rounded items-center'
					onPress={handleSendMessage}>
					<FontAwesome
						name='send'
						size={24}
						color='white'
					/>
				</Pressable>
			</View>
		</View>
	);
};

export default Message;
