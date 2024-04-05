import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getStorage } from "firebase/storage";
import 'firebase/storage'; 
import * as firebaseAuth from 'firebase/auth';
const firebaseConfig = {
    apiKey: "AIzaSyBtgAZoG9IbrL1GeLqVUzVLvCP-Nt89T98",
    authDomain: "newsapp-e1932.firebaseapp.com",
    projectId: "newsapp-e1932",
    storageBucket: "newsapp-e1932.appspot.com",
    messagingSenderId: "1073524380669",
    appId: "1:1073524380669:web:9db37590825f5a64a97f94",
    measurementId: "G-9QXGWQY6VR"
};
const reactNativePersistence = (firebaseAuth as any).getReactNativePersistence;
export const FirebaseApp = initializeApp(firebaseConfig);

export const FirebaseAuth = initializeAuth(FirebaseApp, {
    persistence: reactNativePersistence(ReactNativeAsyncStorage)
});
export const storage = getStorage(FirebaseApp);

