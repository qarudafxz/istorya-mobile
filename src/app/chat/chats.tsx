import { View, Text, ScrollView, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import data from "../../../data/fake_chat.json";

const chats = () => {
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
			<ScrollView>
				{data.map((item, idx) => (
					<View key={idx}>
						<Pressable className='flex flex-row items-center px-4 py-2'>
							{/* Image kunohay */}
							<View className='w-10 h-10 rounded-full bg-primary mr-4' />
							{/* Image kunohay */}
							<View className='flex flex-col'>
								<Text className='text-primary font-bold'>{item.name}</Text>
								<View className='flex flex-row justify-between'>
									<Text className='text-zinc-500'>
										{item.message.length > 28
											? `${item.message.substring(0, 28)}...`
											: item.message}
									</Text>
									<Text className='text-right'>{item.time}</Text>
								</View>
							</View>
						</Pressable>
					</View>
				))}
			</ScrollView>
		</View>
	);
};

export default chats;
