import "react-native-gesture-handler";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { LogBox, StatusBar } from 'react-native';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider, useDispatch, useSelector } from 'react-redux';
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
import { addMail, changeDarkMode, changeNews, changeStatusLogin } from './app/store/newsSlice';
import { RootState, store } from './app/store/store';
import { getAccessToken, getDarkMode, getEmailApp, getLanguage, getNews } from './app/utils/storage';
import SwipeGesture from './app/screen/category-management/swipe-screen';
import { useTranslation } from 'react-i18next';
import Loading from "./app/components/loading";
import SettingScreen from "./app/screen/setting/setting-screen";
import VasernDB from './app/database/db';
import { TUOITRE, VNEXPRESS } from "./app/utils/const";
import AppNavigator from "./app/stacks/app-navigator";

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
  Swipe: undefined,
  Setting: undefined,
  About: undefined

}

const Stack = createNativeStackNavigator<ParamsList>()

export const auth = FirebaseAuth
LogBox.ignoreAllLogs();
// Bookmark.data()
VasernDB





export const SettingStack = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="Setting" component={SettingScreen} />
      <Stack.Screen name="Category" component={CategoryManagementScreen} />
    </Stack.Navigator>
  )
}

function App(): React.JSX.Element {
  const { i18n } = useTranslation();

  const handleGetEmailAndSetLanguage = async () => {
    const mail = await getEmailApp()
    const lang = await getLanguage()
    const news = await getNews()
    const darkmode = await getDarkMode()
    console.log('=============', news);
    if (news) {
      if (news == VNEXPRESS) {
        store.dispatch(changeNews(VNEXPRESS))
      } else {
        store.dispatch(changeNews(TUOITRE))
      }
    }

    if (mail) {
      store.dispatch(addMail(mail))
    }
    if (lang) {
      i18n.changeLanguage(lang)
    }
    if(darkmode){
      store.dispatch(changeDarkMode(true))
    }
  }
  useEffect(() => {
    handleGetEmailAndSetLanguage()
  }, [])
  
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <>
         
          <AppNavigator />
        </>
      </GestureHandlerRootView>
    </Provider>
  );
}
export default App;
