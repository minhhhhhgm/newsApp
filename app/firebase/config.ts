import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getStorage } from "firebase/storage";
import 'firebase/storage'; 
import * as firebaseAuth from 'firebase/auth';
const firebaseConfig = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId,
    measurementId: process.env.measurementId
};

const reactNativePersistence = (firebaseAuth as any).getReactNativePersistence;
export const FirebaseApp = initializeApp(firebaseConfig);

export const FirebaseAuth = initializeAuth(FirebaseApp, {
    persistence: reactNativePersistence(ReactNativeAsyncStorage)
});
export const storage = getStorage(FirebaseApp);

