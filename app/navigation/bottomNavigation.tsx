import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BookMarkIcon from '../icons/svg-component/bookMarkIcon';
import HomeSelectedIcon from '../icons/svg-component/homeSelectedIcon';
import SearchIcons from '../icons/svg-component/searchIcon';
import SettingIcon from '../icons/svg-component/settingIcon';
import HomeScreen from '../screen/home';
import SignUpScreen from '../screen/sign-up/sign-up-screen';
import HomeNewsScreen from '../screen/home/home-screen';
import SearchScreen from '../screen/search/search-screen';
import BookMarkScreen from '../screen/bookmark/book-mark-screen';
const Tab = createBottomTabNavigator();

export default function BottomNavigation() {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarHideOnKeyboard :true,
                tabBarStyle: {
                    borderColor: 'transparent',
                    backgroundColor: 'white',
                    borderTopWidth: 0,
                    elevation: 0
                }
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <HomeSelectedIcon fill={focused ? '#180E19' : 'none'} />
                    )
                }}
            />
            <Tab.Screen
                name="Setting"
                component={SearchScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <SearchIcons fill={focused ? '#180E19' : 'none'} />
                    )
                }}
            />
            <Tab.Screen
                name="Fav"
                component={BookMarkScreen}
                options={{
                    unmountOnBlur: true,
                    tabBarIcon: ({ focused }) => (
                        <BookMarkIcon fill={focused ? '#180E19' : 'none'} />
                    )
                }}
                
            />
            <Tab.Screen
                name="About"
                component={SignUpScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <SettingIcon fill={focused ? '#180E19' : 'none'} />
                    )
                }}
            />

        </Tab.Navigator>
    );
}