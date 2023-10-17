// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyAxZr_00j6XmNXpx1vzD8n2duIVjsITy4s",
	authDomain: "ite-120-chat-app.firebaseapp.com",
	projectId: "ite-120-chat-app",
	storageBucket: "ite-120-chat-app.appspot.com",
	messagingSenderId: "272958422651",
	appId: "1:272958422651:web:6022cf6b8a80add2466cde",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
	persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const db = getDatabase(app);
export const fs = getFirestore(app);
