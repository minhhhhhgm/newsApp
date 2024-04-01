/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-gesture-handler';
// import './app/i18n/i18n'
import React, { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './app/screen/home/home';
import SignUpScreen from './app/screen/sign-up/sign-up-screen';
import { StatusBar } from 'react-native';
import BottomNavigation from './app/navigation/bottomNavigation';
import { I18n } from 'i18n-js'
import { translations } from './app/i18n/trans'
const Stack = createNativeStackNavigator()
import { LogBox } from "react-native"
import SignInScreen from './app/screen/sign-in/sign-in-screen';
import InterestsScreen from './app/screen/interests/interests-screen';
import SearchScreen from './app/screen/search/search-screen';
import DetailScreen from './app/screen/detail-news/detail-news-screen';
import BookMarkScreen from './app/screen/bookmark/book-mark-screen';
import { Todos } from './app/database';
import { useLanguage } from './app/i18n/i18n';
import { RootState, store } from './app/store/store';
import { Provider, useSelector } from 'react-redux'
import { getAccessToken, removeAccessToken } from './app/utils/storage';
import { useAuth } from './app/i18n/i18n';
import { Context } from './app/useAuth/authContext';
import { AuthProvider } from './app/useAuth/auth';
import { Router } from './app/useAuth/router';
import './app/i18n/IMLocalize'

LogBox.ignoreAllLogs();
Todos.data()


export const AppNavigation = () => {
  // const token = useAuth()
  const value = useContext(Context)
  console.log('Test token ', value);

  return (
   
    <Stack.Navigator initialRouteName='SignIn' screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="BottomNavigation" component={BottomNavigation} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="Interests" component={InterestsScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="Detail" component={DetailScreen} />
      <Stack.Screen name="BookMark" component={BookMarkScreen} />
    </Stack.Navigator>
  )
}

export const AppNavigationAuth = () => {
  const value = useContext(Context)
  return (
    <Stack.Navigator initialRouteName='BottomNavigation' screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="BottomNavigation" component={BottomNavigation} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="Interests" component={InterestsScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="Detail" component={DetailScreen} />
      <Stack.Screen name="BookMark" component={BookMarkScreen} />

    </Stack.Navigator>
  )
}
interface NavigationProps extends Partial<React.ComponentProps<typeof NavigationContainer>> { }
const AppNavigator = (props: NavigationProps) => {
  
  return (
    <AuthProvider>
    </AuthProvider>
  )
}
function App(): React.JSX.Element {
  // const i18n = new I18n(translations)
  // i18n.locale = "vi"
  // i18n.enableFallback = true
  // i18n.defaultLocale = "vi"
  const { changeLanguage } = useLanguage()
  const [auth, setAuth] = useState('')
  // const count = useSelector((state: any) => state.counter.value)
  const getToken = async () => {
    const token = await getAccessToken()
    // await removeAccessToken()
    if (token) {
      setAuth(token)
    }
  }
  useEffect(() => {
    getToken()
    changeLanguage('en')
    // console.log('runnnn');

  }, [])
  return (
    <Provider store={store}>
      <>
        <StatusBar
          barStyle={'dark-content'}
          backgroundColor={'transparent'}
          translucent
        />
        {/* {
            auth ? <AppNavigationAuth /> : <AppNavigation />
          } */}
        {/* <AppNavigation /> */}
        <AppNavigator />
      </>

    </Provider>


  );
}
export default App;
