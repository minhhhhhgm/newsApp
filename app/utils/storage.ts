
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


export async function setLanguage(lang: string) {
    try {
        await AsyncStorage.setItem(
            UserStatus.LANGUAGE,
            JSON.stringify(lang),
        );
    } catch (err) {
        console.log(err);
    }
}

export async function getLanguage() {
    try {
        const userData = await AsyncStorage.getItem(UserStatus.LANGUAGE);
        if (userData !== null) {
            return JSON.parse(userData);
        } else {
            return null;
        }
    } catch (err) {
        return null;
    }
}


export async function setNews(news: string) {
    try {
        await AsyncStorage.setItem(
            UserStatus.News,
            JSON.stringify(news),
        );
    } catch (err) {
        console.log(err);
    }
}

export async function getNews() {
    try {
        const userData = await AsyncStorage.getItem(UserStatus.News);
        if (userData !== null) {
            return JSON.parse(userData);
        } else {
            return null;
        }
    } catch (err) {
        return null;
    }
}

export async function removeNews() {
    try {
        await AsyncStorage.removeItem(UserStatus.News);
    } catch (err) {
        return false;
    }
}

export async function setEmailApp(token: string) {
    try {
        await AsyncStorage.setItem(
            UserStatus.Email,
            JSON.stringify(token),
        );
    } catch (err) {
        console.log(err);
    }
}

export async function getEmailApp() {
    try {
        const userData = await AsyncStorage.getItem(UserStatus.Email);
        if (userData !== null) {
            return JSON.parse(userData);
        } else {
            return null;
        }
    } catch (err) {
        return null;
    }
}



export async function setDarkMode(mode: string) {
    try {
        await AsyncStorage.setItem(
            UserStatus.DARK_MODE,
            JSON.stringify(mode),
        );
    } catch (err) {
        console.log(err);
    }
}

export async function getDarkMode() {
    try {
        const darkmode = await AsyncStorage.getItem(UserStatus.DARK_MODE);
        if (darkmode !== null) {
            return JSON.parse(darkmode);
        } else {
            return null;
        }
    } catch (err) {
        return null;
    }
}


export async function removeDarkMode() {
    try {
        await AsyncStorage.removeItem(UserStatus.DARK_MODE);
    } catch (err) {
        return false;
    }
}