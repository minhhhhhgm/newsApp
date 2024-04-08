import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Dimensions, Modal, ScrollView, StyleSheet, Switch, Text as TextRN, TouchableOpacity, View } from 'react-native';
import { ParamsList } from '../../../App';
import { Text } from '../../components/Text';
import RightChvron from '../../icons/svg-component/RightChvron';
import DarkModeicon from '../../icons/svg-component/darkmodeicon';
import InterRestIcon from '../../icons/svg-component/interser';
import LogOutIcon from '../../icons/svg-component/logout';
import Noti from '../../icons/svg-component/noti';
import ProfileIcon from '../../icons/svg-component/profile';
import SettingIconProfile from '../../icons/svg-component/setting';
import { COLOR } from '../../utils/color';
import { removeAccessToken } from '../../utils/storage';
const { width, height } = Dimensions.get('screen');
type NavigationProps = NativeStackNavigationProp<ParamsList, 'BottomNavigation'>

const SettingScreen = () => {
    const [darkmode, setDarkMode] = React.useState(false);
    const [isChoosLanguage, setIsChoosLanguage] = React.useState(false);
    const {  i18n } = useTranslation();
    const navigation = useNavigation<NavigationProps>()


    const data = [
        {
            index: 0,
            name: 'profile',
            onPress: () => {
                navigation.navigate('Profile')
            },
            icon: ProfileIcon
        },
        {
            index: 1,
            name: 'account',
            onPress: () => {
                navigation.navigate('Account')
            },
            icon: ProfileIcon
        },
        {
            index: 2,
            name: 'interest',
            onPress: () => {
                const isBack = true;
                const isHome = false
                console.log("loggg");


                // navigation.navigate('Interests', { isBack, isHome })
            },
            icon: ProfileIcon
        },
        {
            index: 3,
            name: 'changeLanguage',
            onPress: () => { setIsChoosLanguage(!isChoosLanguage) },
            icon: ProfileIcon
        },
        {
            index: 4,
            name: 'darkMode',
            onPress: () => { },
            icon: ProfileIcon
        },
        {
            index: 5,
            name: 'termsAndConditions',
            onPress: () => { },
            icon: ProfileIcon
        },
        {
            index: 6,
            name: 'about',
            onPress: () => { },
            icon: ProfileIcon
        },
        {
            index: 7,
            name: 'logOut',
            onPress: async () => {
                await removeAccessToken()
                navigation.replace('SignIn')
            },
            icon: ProfileIcon
        },

    ]
    const dataItem = [ProfileIcon, ProfileIcon, InterRestIcon, Noti, DarkModeicon, SettingIconProfile, SettingIconProfile, LogOutIcon]
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
                        {
                            //@ts-ignore
                            <View style={{ alignSelf: "center" }}>{dataItem[index]()}</View>
                        }
                        <TouchableOpacity onPress={item.onPress}>
                            <Text text={item.name} style={{
                                fontSize: 14,
                                fontWeight: '500',
                                color: COLOR.darkBlack,
                                marginLeft: 10
                            }} />
                        </TouchableOpacity>

                    </View>
                    {
                        index == 4 ?
                            <View style={{
                                marginBottom: -10
                            }}>
                                <Switch
                                    trackColor={{ false: COLOR.colorSwitchOff, true: COLOR.colorSwitchOn }}
                                    thumbColor={darkmode ? COLOR.backgroundColor : "#ddd"}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={() => { setDarkMode(!darkmode) }}
                                    value={darkmode}
                                />
                            </View>
                            :
                            <RightChvron />

                    }
                </View>
                <View style={{
                    height: 1,
                    backgroundColor: COLOR.buttonColorInactive,
                    marginLeft: 32,
                    marginVertical: 20
                }}></View>
            </View>

        )
    }
    return (
        <View style={styles.body}>
            <Text
                text={'settings'}
                style={{
                    marginTop: 60,
                    fontSize: 15,
                    fontWeight: '700',
                    color: COLOR.buttonColorActive,
                    marginLeft: 16
                }}
            />
            <View style={{
                marginTop: 30,
                // marginHorizontal: 16
            }}>
                <ScrollView>
                    {
                        data.map((item, index) => rederItem({ item, index }))
                    }
                    <Modal
                        visible={isChoosLanguage}
                        transparent={true}
                    >
                        <View style={styles.main}>
                            <View style={styles.content}>
                                <View style={styles.modalView}>

                                    <TextRN style={styles.modalText} />
                                    <TextRN style={{
                                        fontWeight: '700',
                                        color: COLOR.darkBlack,
                                        fontSize: 20,
                                        fontFamily: '',
                                        alignSelf: 'center',
                                        marginTop: 20,
                                        marginBottom: 10
                                    }}>Choose Language</TextRN>
                                    <TouchableOpacity
                                        onPress={() => {
                                            setIsChoosLanguage(!isChoosLanguage)
                                            i18n.changeLanguage('vi')
                                        }}>
                                        <TextRN style={{
                                            fontWeight: '700',
                                            color: COLOR.darkBlack,
                                            fontSize: 15,
                                            fontFamily: '',
                                            marginLeft: 15
                                        }}>Việt Nam </TextRN>
                                    </TouchableOpacity>

                                    <View style={{
                                        height: 1,
                                        backgroundColor: COLOR.buttonColorInactive,
                                        marginVertical: 20
                                    }}>

                                    </View>
                                    <TouchableOpacity onPress={() => {
                                        setIsChoosLanguage(!isChoosLanguage);
                                        i18n.changeLanguage('en')
                                    }}>
                                        <TextRN style={{
                                            fontWeight: '700',
                                            color: COLOR.darkBlack,
                                            fontSize: 15,
                                            fontFamily: '',
                                            marginLeft: 15,
                                            marginBottom: 20
                                        }}>English</TextRN>
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

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: COLOR.backgroundColor,
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
        // height: 279,
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


});

export default SettingScreen;