
import AsyncStorage from "@react-native-async-storage/async-storage"
import { UserStatus } from "./const";

export async function setAccessToken(token: string) {
    try {
        await AsyncStorage.setItem(
            UserStatus.ACCESS_TOKEN,
            JSON.stringify(token),
        );
    } catch (err) {
        console.log(err);
    }
}

export async function getAccessToken() {
    try {
        const userData = await AsyncStorage.getItem(UserStatus.ACCESS_TOKEN);
        if (userData !== null) {
            return JSON.parse(userData);
        } else {
            return null;
        }
    } catch (err) {
        return null;
    }
}

export async function removeAccessToken() {
    try {
        await AsyncStorage.removeItem(UserStatus.ACCESS_TOKEN);
    } catch (err) {
        return false;
    }
}



export async function setInterest(token: any) {
    try {
        await AsyncStorage.setItem(
            UserStatus.ACCESS_TOKEN,
            JSON.stringify(token),
        );
    } catch (err) {
        console.log(err);
    }
}

export async function getInterest() {
    try {
        const userData = await AsyncStorage.getItem(UserStatus.ACCESS_TOKEN);
        if (userData !== null) {
            return JSON.parse(userData);
        } else {
            return null;
        }
    } catch (err) {
        return null;
    }
}