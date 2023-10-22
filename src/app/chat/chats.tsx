import { View, Text, ScrollView, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { useNavigation } from "expo-router";
import {
	getDatabase,
	ref,
	query,
	orderByChild,
	limitToLast,
	onValue,
	startAt,
	endAt,
} from "firebase/database";
import { auth } from "../../lib/firebase";

type Chat = {
	receiverName: string;
	senderName: string;
	message: string;
	sender_id: string;
	receiver_id: string;
	timestamp: number;
};

const db = getDatabase();

const chats = () => {
	const navigation: any = useNavigation();
	const user = auth.currentUser;
	const [data, setData] = useState<any[]>([]);

	const getAllChats = () => {
		const chatsRef = ref(db, "messages");
		const queryChats = query(chatsRef, orderByChild("timestamp"));

		onValue(queryChats, (snapshot) => {
			const chats: Chat[] = [];
			snapshot.forEach((childSnapshot) => {
				const chat = childSnapshot.val();
				if (chat.sender_id === user?.uid || chat.receiver_id === user?.uid)
					chats.push(chat);
			});

			const uniqueChats = chats.filter(
				(chat, idx, self) =>
					idx ===
					self.findIndex(
						(t) =>
							t.sender_id === chat.sender_id && t.receiver_id === chat.receiver_id
					)
			);

			//sort the chats by timestamp
			uniqueChats.sort((a, b) => {
				if (a.timestamp < b.timestamp) return 1;
				else return -1;
			});

			setData(uniqueChats as any);
			console.log("Chats are", chats);
		});
	};

	useEffect(() => {
		getAllChats();
	}, []);

	return (
		<View className='w-full py-2'>
			<View className='px-4 sticky flex flex-row justify-between items-center bg-secondary py-4'>
				<Text className='text-2xl font-bold text-white'>Chats</Text>
				<Pressable>
					<Ionicons
						name='search'
						size={24}
						color='white'
					/>
				</Pressable>
			</View>
			<ScrollView className='w-full'>
				{data?.map((chat, idx) => {
					return (
						<Pressable
							onPress={() => {
								navigation.navigate("ChatDetails", {
									senderId: chat.sender_id,
									receiverId: chat.receiver_id,
								});
							}}
							key={idx}
							className='flex flex-row items-center px-4 py-2 w-full'>
							<View className='w-10 h-10 rounded-full bg-primary mr-4' />
							<View className='flex flex-col'>
								<Text className='text-primary font-bold'>
									{chat?.receiver_id !== user?.uid
										? chat?.receiverName
										: chat?.senderName}
								</Text>
								<View className='flex flex-row justify-between w-64'>
									<Text className='text-primary'>{chat?.message}</Text>
									<Text className='text-zinc-300'>
										{new Date(chat?.time).toLocaleTimeString([], {
											hour: "2-digit",
											minute: "2-digit",
										})}
									</Text>
								</View>
							</View>
						</Pressable>
					);
				})}
			</ScrollView>
		</View>
	);
};

export default chats;
