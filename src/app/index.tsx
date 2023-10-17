import { auth } from "../lib/firebase";
import { GoogleAuthProvider, signInWithEmailAndPassword } from "firebase/auth";
import { Text, ToastAndroid } from "react-native";

const Main = () => {
	const handleSignIn = async () => {
		try {
			await signInWithEmailAndPassword(auth, "emau@sjas.com", "sasasasas");
		} catch (e: any) {
			console.log(e.message);
			ToastAndroid.show(e.message, ToastAndroid.SHORT);
		}
	};
	return (
		<Text
			className='flex justify-center items-center h-full text-xl'
			onPress={handleSignIn}>
			Main
		</Text>
	);
};

export default Main;
