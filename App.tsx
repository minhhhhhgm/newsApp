import "react-native-gesture-handler";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider, useDispatch, useSelector } from 'react-redux';
import { FirebaseAuth } from './app/firebase/config';
import './app/i18n/IMLocalize';
import BottomNavigation from './app/navigation/bottomNavigation';
import AccountScreen from './app/screen/account/account-screen';
import BookMarkScreen from './app/screen/bookmark/book-mark-screen';
import CategoryManagementScreen from './app/screen/category-management/category-management';
import DetailScreen from './app/screen/detail-news/detail-news-screen';
import ForgotPasswordScreen from './app/screen/forgot-password/forgot-password-screen';
import ProfileScreen from './app/screen/profile/profile-screen';
import SignInScreen from './app/screen/sign-in/sign-in-screen';
import SignUpScreen from './app/screen/sign-up/sign-up-screen';
import ViewedScreen from './app/screen/viewed/viewed-screen';
import { addMail, changeDarkMode, changeNews, changeStatusLogin } from './app/store/newsSlice';
import { RootState, store } from './app/store/store';
import { getAccessToken, getEmailApp, getLanguage, getNews } from './app/utils/storage';
import { useTranslation } from 'react-i18next';
import Loading from "./app/components/loading";
import SettingScreen from "./app/screen/setting/setting-screen";
import VasernDB from './app/database/db';
import { TUOITRE, VNEXPRESS } from "./app/utils/const";
import { UserSetting } from "./app/database";
import TestCalendarScreen from "./app/screen/test_calendar/test-calendar";
import TestCalendarSecond from "./app/screen/test_calendar/test-calendar-second";
import CustomCalendar from "./app/screen/test_calendar/custom-calendar";

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
// Bookmark.data()
VasernDB



const AuthStacks = () => {
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

export const SettingStack = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="Setting" component={SettingScreen} />
      <Stack.Screen name="Category" component={CategoryManagementScreen} />
      <Stack.Screen name="Account" component={AccountScreen} />
    </Stack.Navigator>
  )
}

const AppStacks = () => {
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
          <Stack.Screen name="BottomNavigation" component={BottomNavigation} />
          <Stack.Screen name="Detail" component={DetailScreen} />
          <Stack.Screen name="BookMark" component={BookMarkScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="Viewed" component={ViewedScreen} />
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

  const getStack = () => {
    if (loading) {
      return <Loading />
    }
    if (isLogin) {
      return <AppStacks />
    } else {
      return <AuthStacks />
    }

  }
  return (
    // getStack()
    // <TestCalendarScreen/>
    // <TestCalendarSecond/>
    <CustomCalendar/>
  )
}
function App(): React.JSX.Element {
  const { i18n } = useTranslation();
  const handleGetEmailAndSetLanguage = async () => {
    const mail = await getEmailApp()
    const lang = await getLanguage()
    const news = await getNews()
    const isExistDarkMode = UserSetting.get({ email: mail, darkMode: true || 1 })
    console.log('isExistDarkModes',isExistDarkMode);
    // const darkmode = await getDarkMode()
    if (news) {
      console.log('NEWS===', news);

      const selectedNews = news === VNEXPRESS ? VNEXPRESS : TUOITRE;
      store.dispatch(changeNews(selectedNews));
    }
    mail && store.dispatch(addMail(mail));
    lang && i18n.changeLanguage(lang);
    isExistDarkMode && store.dispatch(changeDarkMode(true));
  }
  useEffect(() => {
    handleGetEmailAndSetLanguage()
  }, [])
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AppNavigator />
      </GestureHandlerRootView>
    </Provider>
  );
}
export default App;
