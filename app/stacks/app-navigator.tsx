import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Loading from "../components/loading";
import { NavigationContainer } from '@react-navigation/native';
import { ParamsList } from "../../App";
import ForgotPasswordScreen from "../screen/forgot-password/forgot-password-screen";
import SignInScreen from "../screen/sign-in/sign-in-screen";
import SignUpScreen from "../screen/sign-up/sign-up-screen";
import SettingScreen from "../screen/setting/setting-screen";
import CategoryManagementScreen from "../screen/category-management/category-management";
import HomeScreen from "../screen/home/home";
import BottomNavigation from "../navigation/bottomNavigation";
import SearchScreen from "../screen/search/search-screen";
import DetailScreen from "../screen/detail-news/detail-news-screen";
import BookMarkScreen from "../screen/bookmark/book-mark-screen";
import AccountScreen from "../screen/account/account-screen";
import ProfileScreen from "../screen/profile/profile-screen";
import ViewedScreen from "../screen/viewed/viewed-screen";
import SwipeGesture from "../screen/category-management/swipe-screen";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { RootState } from "../store/store";
import { getAccessToken } from "../utils/storage";
import { changeStatusLogin } from "../store/newsSlice";
import { StatusBar } from "react-native";



const Stack = createNativeStackNavigator<ParamsList>()
const AppNavigation = () => {
    const mode = useSelector((state: RootState) => state.newsReducer.darkMode)
    return (
        <>
            <StatusBar
                barStyle={mode ? 'light-content' : 'dark-content'}
                backgroundColor={'transparent'}
                translucent
            />
            <NavigationContainer>
                <Stack.Navigator initialRouteName='SignIn' screenOptions={{
                    headerShown: false
                }}>
                    <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
                    <Stack.Screen name="SignIn" component={SignInScreen} />
                    <Stack.Screen name="SignUp" component={SignUpScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </>

    )
}

const SettingStack = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name="Setting" component={SettingScreen} />
            <Stack.Screen name="Category" component={CategoryManagementScreen} />
        </Stack.Navigator>
    )
}

const AppNavigationAuth = () => {
    const mode = useSelector((state: RootState) => state.newsReducer.darkMode)
    return (
        <>
            <StatusBar
                barStyle={mode ? 'light-content' : 'dark-content'}
                backgroundColor={'transparent'}
                translucent
            />
            <NavigationContainer>
                <Stack.Navigator initialRouteName='BottomNavigation' screenOptions={{
                    headerShown: false
                }}>
                    <Stack.Screen name="Home" component={HomeScreen} />
                    <Stack.Screen name="SignUp" component={SignUpScreen} />
                    <Stack.Screen name="BottomNavigation" component={BottomNavigation} />
                    <Stack.Screen name="SignIn" component={SignInScreen} />
                    <Stack.Screen name="Search" component={SearchScreen} />
                    <Stack.Screen name="Detail" component={DetailScreen} />
                    <Stack.Screen name="BookMark" component={BookMarkScreen} />
                    <Stack.Screen name="Account" component={AccountScreen} />
                    <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
                    <Stack.Screen name="Profile" component={ProfileScreen} />
                    <Stack.Screen name="Viewed" component={ViewedScreen} />
                    <Stack.Screen name="Category" component={CategoryManagementScreen} />
                    <Stack.Screen name="Swipe" component={SwipeGesture} />
                </Stack.Navigator>
            </NavigationContainer>
        </>
    )
}
const AppNavigator = () => {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true);
    const isLogin = useSelector((state: RootState) => state.newsReducer.isLogin)


    useEffect(() => {
        loadStorageData();
    }, [isLogin]);

    async function loadStorageData() {
        try {
            const accessToken = await getAccessToken()
            if (accessToken) {
                dispatch(changeStatusLogin(true))
            } else {
                dispatch(changeStatusLogin(false))
            }
        } catch (error) {
            dispatch(changeStatusLogin(false))
        } finally {
            setLoading(false)
        }
    }

    const GetStack = () => {
        if (loading) {
            return <Loading />
        }
        if (isLogin) {
            return <AppNavigationAuth />
        } else if (isLogin === false) {
            return <AppNavigation />
        }
    }

    return (
        <GetStack />
    )
}

export default AppNavigator