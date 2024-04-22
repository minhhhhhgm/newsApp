import { useNavigation } from '@react-navigation/native';
import { sendPasswordResetEmail } from 'firebase/auth';
import React, { useState } from 'react';
import { Image, KeyboardAvoidingView, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Toast from 'react-native-simple-toast';
import { Text } from '../../components/Text';
import { TextField } from '../../components/TextField';
import { FirebaseAuth } from '../../firebase/config';
import BackIcon from '../../icons/svg-component/backIcon';
import { COLOR, COLOR_MODE, headBlackColor } from '../../utils/color';
import { logoLogin } from '../../utils/const';
import { handleValidateEmail } from '../../utils/validate';
import Loading from '../../components/loading';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const ForgotPasswordScreen = () => {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation()
    const auth = FirebaseAuth
    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const mode = useSelector((state: RootState) => state.newsReducer.darkMode)
    const strokeColor = COLOR_MODE(!mode).backgroundColor
    const styles = useForgotPassStyles(mode)

    const onChangeEmail = (value: string) => {
        setEmailError(handleValidateEmail(value) ?? '')
        setEmail(value)
    }
    const isValid = () => email && !emailError 

    
    const handleReset = async () => {
        try {
            setIsLoading(true)
            sendPasswordResetEmail(auth, email).then(function (user) {
                console.log('res', user);
                Toast.show('Email sent. Please check your email to reset your password', Toast.LONG);
                setIsLoading(false)
            }).catch(function (e) {
                console.log(e)
                setIsLoading(false)
            })
        } catch (err) {
            const error = JSON.stringify(err)
            console.log(error);
            Toast.show('Email or Password incorrect !', Toast.LONG);
            setIsLoading(false)
        }
    }

    
    return (
        <KeyboardAvoidingView style={styles.body} behavior='padding'>
            <Loading isVisible={isLoading} />
            <View>
                <View style={{ marginTop: insets.top + 32 }}>
                    <TouchableOpacity style={{ marginLeft: 10 }}
                        onPress={() => { navigation.goBack() }}>
                        <BackIcon stroke={strokeColor} />
                    </TouchableOpacity>
                </View>
                <View style={[styles.logo,]}>
                    <Image
                        style={styles.image}
                        source={logoLogin}
                    />
                    <Text
                        style={styles.headerText}
                        text={'new24'}
                    />
                    <Text
                        style={styles.contentText}
                        text={'reset'}
                    />
                </View>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps={'handled'}>
                    <TextField
                        mode={mode}
                        value={email}
                        onChangeText={onChangeEmail}
                        containerStyle={styles.textField}
                        style={styles.inputStyle}
                        label={'email'}
                        placeholder={'email'}
                        helper={emailError}
                    />
                    <TouchableOpacity
                        activeOpacity={1}
                        disabled={!isValid()}
                        onPress={handleReset}
                        style={[styles.button, {
                            backgroundColor: !isValid() ? COLOR.buttonColorInactive : COLOR_MODE(mode).titleText
                        }]}>
                        <Text
                            text={'Reset'}
                            style={{
                                color: COLOR_MODE(mode).backgroundColor
                            }}
                        />
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </KeyboardAvoidingView>
    );
};


const useForgotPassStyles = (mode: boolean) => {
    const styles = StyleSheet.create({
        body: {
            flex: 1,
            backgroundColor: COLOR_MODE(mode).backgroundColor
        },
        logo: {
            alignItems: 'center',
        },
        image: {
            tintColor: COLOR_MODE(mode).logoColor
        },
        headerText: {
            fontWeight: '700',
            fontSize: 18,
            marginTop: 20,
            color: COLOR_MODE(mode).textNewsColor
        },
        contentText: {
            fontWeight: '500',
            fontSize: 14,
            marginTop: 20,
            color: COLOR_MODE(mode).textNewsColor,
            marginHorizontal: 46
        },
        textField: {
            marginHorizontal: 46,
            marginTop: 25
        },
        button: {
            borderRadius: 30,
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 10,
            paddingHorizontal: 49,
            alignSelf: 'center',
            marginTop: 79
        },
        inputStyle: {
            paddingTop: 25,
            color: COLOR_MODE(mode).textNewsColor,
        }
    });
    return styles;
}


export default ForgotPasswordScreen;