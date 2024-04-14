import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { LogBox, StatusBar } from 'react-native';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider } from 'react-redux';
import { Bookmark } from './app/database';
import { FirebaseAuth } from './app/firebase/config';
import './app/i18n/IMLocalize';
import BottomNavigation from './app/navigation/bottomNavigation';
import AccountScreen from './app/screen/account/account-screen';
import BookMarkScreen from './app/screen/bookmark/book-mark-screen';
import CategoryManagementScreen from './app/screen/category-management/category-management';
import DetailScreen from './app/screen/detail-news/detail-news-screen';
import ForgotPasswordScreen from './app/screen/forgot-password/forgot-password-screen';
import HomeScreen from './app/screen/home/home';
import ProfileScreen from './app/screen/profile/profile-screen';
import SearchScreen from './app/screen/search/search-screen';
import SignInScreen from './app/screen/sign-in/sign-in-screen';
import SignUpScreen from './app/screen/sign-up/sign-up-screen';
import ViewedScreen from './app/screen/viewed/viewed-screen';
import { addMail } from './app/store/newsSlice';
import { store } from './app/store/store';
import { AuthProvider } from './app/useAuth/auth';
import { getEmailApp, getLanguage } from './app/utils/storage';
import SwipeGesture from './app/screen/category-management/swipe-screen';
import { useTranslation } from 'react-i18next';

export type ParamsList = {
  Detail: {
    link: string,
    title?: string,
    author?: string,
    time?: string,
    imageUrl?: string,
    type?: string,
    email?: string
  },
  BookMark: undefined,
  BottomNavigation: undefined,
  Search: undefined,
  Interests: undefined,
  SignIn: undefined,
  SignUp: undefined,
  Home: undefined,
  Account: undefined,
  ForgotPassword: undefined,
  Profile: undefined,
  Viewed: undefined,
  Category: undefined,
  Swipe: undefined

}

const Stack = createNativeStackNavigator<ParamsList>()
export const auth = FirebaseAuth
LogBox.ignoreAllLogs();
Bookmark.data()




export const AppNavigation = () => {
  return (
    <Stack.Navigator initialRouteName='SignIn' screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="BottomNavigation" component={BottomNavigation} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
      {/* <Stack.Screen name="Interests" component={InterestsScreen} /> */}
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
  )
}

export const AppNavigationAuth = () => {
  return (
    <Stack.Navigator initialRouteName='BottomNavigation' screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="BottomNavigation" component={BottomNavigation} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
      {/* <Stack.Screen name="Interests" component={InterestsScreen} /> */}
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
  )
}
const AppNavigator = () => {
  return (
    <AuthProvider>
    </AuthProvider>
  )
}
function App(): React.JSX.Element {
  const { i18n } = useTranslation();

  const handleGetEmailAndSetLanguage = async () => {
    const mail = await getEmailApp()
    const lang = await getLanguage()
    if (mail) {
      store.dispatch(addMail(mail))
    }
    if (lang) {
      i18n.changeLanguage(lang)
    }
  }
  useEffect(() => {
    handleGetEmailAndSetLanguage()
  }, [])
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <>
          <StatusBar
            barStyle={'dark-content'}
            backgroundColor={'transparent'}
            translucent
          />
          <AppNavigator />
        </>
      </GestureHandlerRootView>
    </Provider>
  );
}
export default App;
