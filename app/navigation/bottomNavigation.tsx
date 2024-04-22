import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BookMarkIcon from '../icons/svg-component/bookMarkIcon';
import HomeSelectedIcon from '../icons/svg-component/homeSelectedIcon';
import SearchIcons from '../icons/svg-component/searchIcon';
import SettingIcon from '../icons/svg-component/settingIcon';
import HomeScreen from '../screen/home/home';
import BookMarkScreen from '../screen/bookmark/book-mark-screen';
import { COLOR, COLOR_MODE } from '../utils/color';
import ViewedScreen from '../screen/viewed/viewed-screen';
import { SettingStack } from '../../App';
import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

export type ParamsListBottomNav = {
    Home: undefined,
    Search: undefined,
    Fav: undefined,
    About: undefined,
  }
const Tab = createBottomTabNavigator<ParamsListBottomNav>();

export default function BottomNavigation() {
    const mode = useSelector((state: RootState) => state.newsReducer.darkMode)
    const color = mode ? COLOR.white : COLOR.focusColor
    const stroke = mode ? COLOR.white : null
    const styles = useBottomStyles(mode)
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarHideOnKeyboard: true,
                tabBarStyle: styles.tabBarStyle
            }}>
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <HomeSelectedIcon fill={focused ? color : 'none'} stroke={stroke}/>
                    )
                }} />
            <Tab.Screen
                name="Search"
                component={ViewedScreen}
                options={{
                    // unmountOnBlur: true,
                    tabBarIcon: ({ focused }) => (
                        <SearchIcons fill={focused ? color : 'none'} stroke={stroke} />
                    )
                }} />
            <Tab.Screen
                name="Fav"
                component={BookMarkScreen}
                options={{
                    // unmountOnBlur: true,
                    tabBarIcon: ({ focused }) => (
                        <BookMarkIcon fill={focused ? color : 'none'} stroke={stroke} />
                    )
                }} />
            <Tab.Screen
                name="About"
                component={SettingStack}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <SettingIcon fill={focused ? color : 'none'} stroke={stroke} />
                    )
                }} />

        </Tab.Navigator>
    );
}

const useBottomStyles = (mode : boolean) => {
    const styles = StyleSheet.create({
        tabBarStyle: {
            borderColor: 'transparent',
            backgroundColor: COLOR_MODE(mode).backgroundColor,
            borderTopWidth: 0,
            elevation: 0
        }
    });
    return styles;
}