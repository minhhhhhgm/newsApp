/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-gesture-handler';
// import './app/i18n/i18n'
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './app/screen/home';
import SignUpScreen from './app/screen/sign-up/sign-up-screen';
import { StatusBar } from 'react-native';
import BottomNavigation from './app/navigation/bottomNavigation';
import { I18n } from 'i18n-js'
import {translations} from './app/i18n/trans'
import HomeNewsScreen from './app/screen/home/home-screen';
const Stack = createNativeStackNavigator()
import { LogBox } from "react-native"
import SignInScreen from './app/screen/sign-in/sign-in-screen';
import InterestsScreen from './app/screen/interests/interests-screen';
import SearchScreen from './app/screen/search/search-screen';
import DetailScreen from './app/screen/detail-news/detail-news-screen';
import BookMarkScreen from './app/screen/bookmark/book-mark-screen';
LogBox.ignoreAllLogs();

const AppNavigation =()=>{
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Interests' screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="BottomNavigation" component={BottomNavigation} />
        <Stack.Screen name="HomeNews" component={HomeNewsScreen} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="Interests" component={InterestsScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="Detail" component={DetailScreen} />
        <Stack.Screen name="BookMark" component={BookMarkScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  )
}

function App(): React.JSX.Element {
  const i18n = new I18n(translations)
  i18n.locale = "ru"
  i18n.enableFallback = true
  i18n.defaultLocale = "en"
  return (
    <>
    <StatusBar 
    barStyle={'dark-content'}
    backgroundColor={'transparent'}
    translucent
    />
     <AppNavigation/>
    </>
   
  );
}
export default App;
