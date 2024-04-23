import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, Dimensions, Modal, ScrollView, StyleSheet, Switch, Text as TextRN, TouchableOpacity, View } from 'react-native';
import { ParamsList } from '../../../App';
import { Text } from '../../components/Text';
import RightChvron from '../../icons/svg-component/RightChvron';
import DarkModeicon from '../../icons/svg-component/darkmodeicon';
import InterRestIcon from '../../icons/svg-component/interser';
import LogOutIcon from '../../icons/svg-component/logout';
import Noti from '../../icons/svg-component/noti';
import ProfileIcon from '../../icons/svg-component/profile';
import SettingIconProfile from '../../icons/svg-component/setting';
import { COLOR, COLOR_MODE } from '../../utils/color';
import { removeAccessToken, removeDarkMode, removeNews, setDarkMode, setLanguage } from '../../utils/storage';
import { useDispatch, useSelector } from 'react-redux';
import { changeDarkMode, changeNews, changeStatusLogin } from '../../store/newsSlice';
import { RootState } from '../../store/store';
import { VNEXPRESS } from '../../utils/const';
import { UserSetting } from '../../database';
const { width, height } = Dimensions.get('screen');
type NavigationProps = NativeStackNavigationProp<ParamsList, 'BottomNavigation'>

const SettingScreen = () => {
    const [darkModeSetting, setDarkModeSetting] = React.useState(false);
    const [isChoosLanguage, setIsChoosLanguage] = React.useState(false);
    const { i18n } = useTranslation();
    const navigation = useNavigation<NavigationProps>()
    const mode = useSelector((state: RootState) => state.newsReducer.darkMode)
    const email = useSelector((state: RootState) => state.newsReducer.mail);
    const dispatch = useDispatch()
    const styles = useSettingStyles(mode)

    // useEffect(() => {
    //     const isExistDarkMode = UserSetting.get({ email: email, darkMode: true })
    //     isExistDarkMode && setDarkModeSetting(true)
    // }, [])


    const data = [
        {
            index: 1,
            name: 'account',
            onPress: () => {
                navigation.navigate('Account')
            },
            icon: ProfileIcon({ darkMode: mode })
        },
        {
            index: 2,
            name: 'category',
            onPress: () => {
                navigation.navigate('Category')
            },
            icon: InterRestIcon({ darkMode: mode })
        },
        {
            index: 3,
            name: 'changeLanguage',
            onPress: () => { setIsChoosLanguage(!isChoosLanguage) },
            icon: SettingIconProfile({ darkMode: mode })
        },
        {
            index: 4,
            name: 'Dark Mode',
            onPress: async () => {
                // dispatch(changeDarkMode(!mode))
                // await setDarkMode('dark')
                // if (mode) {
                //     await removeDarkMode()
                // }
            },
            icon: DarkModeicon({ darkMode: mode })
        },

        {
            index: 5,
            name: 'logOut',
            onPress: () => logOutAlert(),
            icon: LogOutIcon({ darkMode: mode })
        },

    ]

    const logOutAlert = () => {
        Alert.alert('Log Out', 'Do you want to log out ?', [
            {
                text: 'Cancel',
                style: 'cancel',
            },
            {
                text: 'Log out',
                onPress: async () => {
                    await removeAccessToken()
                    // await removeNews()
                    dispatch(changeNews(VNEXPRESS))
                    dispatch(changeStatusLogin(false))
                },

            },
        ]);
    }

    console.log("isExist", UserSetting.data());
    const handleSwitchDarkMode = async () => {
        const isExist = UserSetting.get({ email: email })
        if (!isExist) {
            const isInsert = UserSetting.insert({
                email: email,
                darkMode: true
            })
            dispatch(changeDarkMode(true))
            // isInsert && setDarkModeSetting(true)
        } else {
            const isDarkModeOn = UserSetting.get({ email: email, darkMode: true || 1 })
            if (isDarkModeOn) {

                const isUpdate = UserSetting.update(isExist, { darkMode: false })
                if (isUpdate) {
                    dispatch(changeDarkMode(false))
                }
            } else {
                const isUpdate = UserSetting.update(isExist, { darkMode: true })
                if (isUpdate) {
                    dispatch(changeDarkMode(true))
                }

            }
        }


        console.log("isExist", UserSetting.data());

        // dispatch(changeDarkMode(!mode))
        // await setDarkMode('dark')
        // if (mode) {
        //     await removeDarkMode()
        // }
    }

    const rederItem = ({ item, index }: { item: any, index: number }) => {
        return (
            <View key={index}>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingHorizontal: 16
                    }}>
                    <View style={{
                        flexDirection: 'row'
                    }}>
                        <View style={{ alignSelf: "center" }}>{item.icon}</View>
                        <TouchableOpacity onPress={item.onPress}>
                            <Text text={item.name} style={styles.textAction} />
                        </TouchableOpacity>
                    </View>
                    {
                        index == 3 ?
                            <View style={styles.switch}>
                                <Switch
                                    trackColor={{ false: COLOR.colorSwitchOff, true: COLOR.colorSwitchOn }}
                                    onValueChange={handleSwitchDarkMode}
                                    value={mode}
                                />
                            </View>
                            :
                            <RightChvron />

                    }
                </View>
                <View style={styles.line}></View>
            </View>

        )
    }
    return (
        <View style={styles.body}>
            <Text
                text={'settings'}
                style={styles.textHeader}
            />
            <View style={{ marginTop: 30, }}>
                <ScrollView>
                    {
                        data.map((item, index) => rederItem({ item, index }))
                    }
                    <Modal
                        visible={isChoosLanguage}
                        transparent={true}>
                        <View style={styles.main}>
                            <View style={styles.content}>
                                <View style={styles.modalView}>
                                    <TextRN style={styles.modalText} />
                                    <Text text='Choose Language' style={styles.textChooseLanguage} />
                                    <TouchableOpacity
                                        onPress={async () => {
                                            setIsChoosLanguage(!isChoosLanguage)
                                            i18n.changeLanguage('vi')
                                            await setLanguage('vi')
                                        }}>
                                        <Text text='Việt Nam' style={styles.vnText} />
                                    </TouchableOpacity>
                                    <View style={{
                                        height: 1,
                                        backgroundColor: COLOR.buttonColorInactive,
                                        marginVertical: 20
                                    }}>
                                    </View>
                                    <TouchableOpacity onPress={async () => {
                                        setIsChoosLanguage(!isChoosLanguage);
                                        i18n.changeLanguage('en')
                                        await setLanguage('en')
                                    }}>
                                        <Text text='English' style={styles.enText} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </ScrollView>
            </View>
        </View>
    );
};

const useSettingStyles = (mode: boolean) => {
    const styles = StyleSheet.create({
        body: {
            flex: 1,
            backgroundColor: COLOR_MODE(mode).backgroundColor,
        },
        textHeader: {
            marginTop: 60,
            fontSize: 15,
            fontWeight: '700',
            color: COLOR_MODE(mode).textColor,
            marginLeft: 16
        },
        textAction: {
            fontSize: 14,
            fontWeight: '500',
            color: COLOR_MODE(mode).textColor,
            marginLeft: 10
        },
        line: {
            height: 1,
            backgroundColor: COLOR_MODE(mode).divider,
            marginLeft: 32,
            marginVertical: 20
        },
        logo: {
            alignItems: 'center',
        },
        main: {
            backgroundColor: 'rgba(0, 0, 0, 0.65)',
            width: width,
            height: height,
            flex: 1
        },
        content: {
            position: 'absolute',
            bottom: 22,
            alignSelf: 'center',
        },
        background: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
        },
        centeredView: {
            width: width - 16,
            alignSelf: 'center',
            justifyContent: 'flex-end',
        },
        modalView: {
            width: width - 32,
            backgroundColor: 'white',
            borderRadius: 8,
            marginHorizontal: 16,

        },
        button: {
            marginHorizontal: 14,
            marginBottom: 23,
            height: 48,
            borderRadius: 8,
            backgroundColor: '#F4AD22'
        },
        textButton: {
            fontSize: 14,
            color: 'white',
            paddingVertical: 12,
            alignSelf: 'center'
        },
        buttonClose: {
            backgroundColor: '#2196F3',
        },
        textStyle: {
            color: 'white',
            textAlign: 'center',
        },
        modalText: {
            marginTop: 10,
            textAlign: 'center',
            width: 68,
            height: 5,
            backgroundColor: '#C7C7C7',
            borderRadius: 8,
            alignSelf: 'center'
        },
        textChooseLanguage: {
            fontWeight: '700',
            color: COLOR.darkBlack,
            fontSize: 20,
            alignSelf: 'center',
            marginTop: 20,
            marginBottom: 10
        },
        vnText: {
            fontWeight: '700',
            color: COLOR.darkBlack,
            fontSize: 15,
            marginLeft: 15
        },
        enText: {
            fontWeight: '700',
            color: COLOR.darkBlack,
            fontSize: 15,
            fontFamily: '',
            marginLeft: 15,
            marginBottom: 20
        },
        switch: {
            marginBottom: -10
        }
    });
    return styles;
}



export default SettingScreen;