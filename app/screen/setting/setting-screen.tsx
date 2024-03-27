import React from 'react';
import { Dimensions, Modal, ScrollView, StyleSheet, Switch, View, Text as TextRN, TouchableOpacity } from 'react-native';
import { Text } from '../../components/Text';
import { IScreen } from '../home/home';
import ProfileIcon from '../../icons/svg-component/profile';
import RightChvron from '../../icons/svg-component/RightChvron';
import InterRestIcon from '../../icons/svg-component/interser';
import Noti from '../../icons/svg-component/noti';
import DarkModeicon from '../../icons/svg-component/darkmodeicon';
import SettingIconProfile from '../../icons/svg-component/setting';
import LogOutIcon from '../../icons/svg-component/logout';
import { useLanguage } from '../../i18n/i18n';
import { removeAccessToken } from '../../utils/storage';
import { useTranslation } from 'react-i18next';
const { width, height } = Dimensions.get('screen');

const SettingScreen = (props: IScreen) => {
    const [darkmode, setDarkMode] = React.useState(false);
    const [isChoosLanguage, setIsChoosLanguage] = React.useState(false);
    const { changeLanguage } = useLanguage()
    const { t, i18n } = useTranslation();

    const data = [
        {
            index: 0,
            name: 'Profile',
            onPress: () => { },
            icon: ProfileIcon
        },
        {
            index: 1,
            name: 'Account',
            onPress: () => { },
            icon: ProfileIcon
        },
        {
            index: 2,
            name: 'Interest',
            onPress: () => {
                const isBack = true;
                const isHome = false
                console.log("loggg");

                props.navigation.navigate('Interests', { isBack, isHome })
            },
            icon: ProfileIcon
        },
        {
            index: 3,
            name: 'Change Language',
            onPress: () => { setIsChoosLanguage(!isChoosLanguage) },
            icon: ProfileIcon
        },
        {
            index: 4,
            name: 'Dark Mode',
            onPress: () => { },
            icon: ProfileIcon
        },
        {
            index: 5,
            name: 'Terms & Conditions',
            onPress: () => { },
            icon: ProfileIcon
        },
        {
            index: 6,
            name: 'About',
            onPress: () => { },
            icon: ProfileIcon
        },
        {
            index: 7,
            name: 'Log Out',
            onPress: async () => {
                await removeAccessToken()
                props.navigation.replace('SignIn')
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
                                color: '#000000',
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
                                    trackColor={{ false: "#767577", true: "#180E19" }}
                                    thumbColor={darkmode ? "white" : "#ddd"}
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
                    backgroundColor: '#EEEEEE',
                    marginLeft: 32,
                    marginVertical: 20
                }}></View>
            </View>

        )
    }
    return (
        <View style={styles.body}>
            <Text
                text='Settings'
                style={{
                    marginTop: 60,
                    fontSize: 15,
                    fontWeight: '700',
                    color: '#000000',
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
                                        color: '#000000',
                                        fontSize: 20,
                                        fontFamily: '',
                                        alignSelf: 'center',
                                        marginTop: 20,
                                        marginBottom: 10
                                    }}>Choose Language</TextRN>
                                    <TouchableOpacity
                                        onPress={() => { changeLanguage('vi');
                                         setIsChoosLanguage(!isChoosLanguage) 
                                         i18n.changeLanguage('vi')
                                         }}>
                                        <TextRN style={{
                                            fontWeight: '700',
                                            color: '#000000',
                                            fontSize: 15,
                                            fontFamily: '',
                                            marginLeft: 15
                                        }}>Việt Nam </TextRN>
                                    </TouchableOpacity>

                                    <View style={{
                                        height: 1,
                                        backgroundColor: '#EEEEEE',
                                        marginVertical: 20
                                    }}>

                                    </View>
                                    <TouchableOpacity onPress={() => { 
                                        changeLanguage('en'); 
                                        setIsChoosLanguage(!isChoosLanguage);
                                        i18n.changeLanguage('en')
                                        }}>
                                        <TextRN style={{
                                            fontWeight: '700',
                                            color: '#000000',
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
        backgroundColor: 'white',
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
    icon: {
        alignSelf: 'center',
        marginTop: 37,
        marginBottom: 24
    },
    text: {
        alignSelf: "center",
        color: '#323232',
        fontSize: 18,
        marginTop: 23,
        marginBottom: 14,
        fontWeight: '700'
    },
    row: {
        marginHorizontal: 16
    },
    row1: {
        marginTop: 38,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    selectType: {
        fontSize: 14,
        color: '#323232'
    },
    cancel: {
        fontSize: 14,
        color: '#FF0000'
    },
    horizontalLine: {
        height: 1,
        backgroundColor: '#E7EFFF',
        marginTop: 18,
        marginBottom: 14
    },
    row2: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    viewButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 16,
        marginTop: 14,
        width: 'auto',
        paddingBottom: 15
    },
    buttonCancel: {
        height: 44,
        backgroundColor: '#F2F2F2',
        borderRadius: 8,
        width: '49%'
    },
    buttonConfirm: {
        height: 44,
        backgroundColor: '#F4AD22',
        borderRadius: 8,
        width: '49%'
    },
    buttonConfirm2: {
        height: 44,
        backgroundColor: 'rgb(255, 224, 178)',
        borderRadius: 8,
        width: '49%'
    },
    textCancel: {
        paddingHorizontal: 52,
        paddingVertical: 12,
        fontSize: 14,
        color: '#F4AD22',
        textAlign: 'center',
        fontWeight: '700'
    },
    textConfirm: {
        paddingHorizontal: 52,
        paddingVertical: 12,
        fontSize: 14,
        color: '#FFFFFF',
        textAlign: 'center',
        fontWeight: '700'

    },
    textResend: {
        fontSize: 14,
        color: '#3F91FF80',
        fontWeight: '700',
    },
    reSendOtp: {
        position: 'absolute',
        right: 27,
        top: 20,
        zIndex: 1,
        flexDirection: 'row',
    },
    countDownNumber: {
        fontSize: 14,
        color: '#FF3B30',
        fontWeight: '700',
    },
});

export default SettingScreen;