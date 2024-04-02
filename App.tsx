/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-gesture-handler';
// import './app/i18n/i18n'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { LogBox, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { Todos } from './app/database';
import './app/i18n/IMLocalize';
import BottomNavigation from './app/navigation/bottomNavigation';
import BookMarkScreen from './app/screen/bookmark/book-mark-screen';
import DetailScreen from './app/screen/detail-news/detail-news-screen';
import HomeScreen from './app/screen/home/home';
import InterestsScreen from './app/screen/interests/interests-screen';
import SearchScreen from './app/screen/search/search-screen';
import SignInScreen from './app/screen/sign-in/sign-in-screen';
import SignUpScreen from './app/screen/sign-up/sign-up-screen';
import { store } from './app/store/store';
import { AuthProvider } from './app/useAuth/auth';
const Stack = createNativeStackNavigator()

LogBox.ignoreAllLogs();
Todos.data()


export const AppNavigation = () => {
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
