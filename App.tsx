/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './app/screen/home';
import LoginScreen from './app/screen/login';
import { StatusBar } from 'react-native';
import BottomNavigation from './app/navigation/bottomNavigation';
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
