import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, } from '@react-navigation/native-stack';
import React from 'react';
import { LogBox, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { Bookmark, Todos } from './app/database';
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
import AccountScreen from './app/screen/account/account-screen';
import { FirebaseAuth } from './app/firebase/config';
import ForgotPasswordScreen from './app/screen/forgot-password/forgot-password-screen';
import ProfileScreen from './app/screen/profile/profile-screen';

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
  Profile: undefined

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
        <AppNavigator />
      </>
    </Provider>
  );
}
export default App;
