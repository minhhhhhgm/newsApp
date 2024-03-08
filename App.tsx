/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-gesture-handler';
// import './app/i18n/i18n'
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './app/screen/home';
import LoginScreen from './app/screen/login';
import { StatusBar } from 'react-native';
import BottomNavigation from './app/navigation/bottomNavigation';
import { I18n } from 'i18n-js'
import {translations} from './app/i18n/trans'
const Stack = createNativeStackNavigator()

const AppNavigation =()=>{
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName='BottomNavigation' screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="BottomNavigation" component={BottomNavigation} />
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
