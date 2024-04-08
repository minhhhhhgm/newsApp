import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BookMarkIcon from '../icons/svg-component/bookMarkIcon';
import HomeSelectedIcon from '../icons/svg-component/homeSelectedIcon';
import SearchIcons from '../icons/svg-component/searchIcon';
import SettingIcon from '../icons/svg-component/settingIcon';
import HomeScreen from '../screen/home/home';
import SearchScreen from '../screen/search/search-screen';
import BookMarkScreen from '../screen/bookmark/book-mark-screen';
import SettingScreen from '../screen/setting/setting-screen';
import { COLOR } from '../utils/color';

export type ParamsListBottomNav = {
    Home: undefined,
    Search: undefined,
    Fav: undefined,
    About: undefined,
  }
const Tab = createBottomTabNavigator<ParamsListBottomNav>();

export default function BottomNavigation() {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarHideOnKeyboard: true,
                tabBarStyle: {
                    borderColor: 'transparent',
                    backgroundColor: COLOR.backgroundColor,
                    borderTopWidth: 0,
                    elevation: 0
                }
            }}>
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <HomeSelectedIcon fill={focused ? COLOR.focusColor : 'none'} />
                    )
                }} />
            <Tab.Screen
                name="Search"
                component={SearchScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <SearchIcons fill={focused ? COLOR.focusColor : 'none'} />
                    )
                }} />
            <Tab.Screen
                name="Fav"
                component={BookMarkScreen}
                options={{
                    unmountOnBlur: true,
                    tabBarIcon: ({ focused }) => (
                        <BookMarkIcon fill={focused ? COLOR.focusColor : 'none'} />
                    )
                }} />
            <Tab.Screen
                name="About"
                component={SettingScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <SettingIcon fill={focused ? COLOR.focusColor : 'none'} />
                    )
                }} />

        </Tab.Navigator>
    );
}