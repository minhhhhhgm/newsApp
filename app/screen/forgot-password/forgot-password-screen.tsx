import { sendPasswordResetEmail } from 'firebase/auth';
import React, { useState } from 'react';
import { Image, KeyboardAvoidingView, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Toast from 'react-native-simple-toast';
import { Text } from '../../components/Text';
import { TextField } from '../../components/TextField';
import { FirebaseAuth } from '../../firebase/config';
import BackIcon from '../../icons/svg-component/backIcon';
import { COLOR, headBlackColor } from '../../utils/color';
import { logoLogin } from '../../utils/const';
import { handleValidateEmail } from '../../utils/validate';
import { useNavigation } from '@react-navigation/native';

const ForgotPasswordScreen = () => {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation()
    const auth = FirebaseAuth
    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState('')

    const onChangeEmail = (value: string) => {
        const mailValidate = handleValidateEmail(value)
        if (mailValidate) {
            setEmailError(mailValidate)
        } else {
            setEmailError('')
        }
        setEmail(value)
    }
    const isValid = () => {
        if (email && !emailError) {
            return true;
        }
        return false;
    };
    const handleReset = async () => {
        try {
            sendPasswordResetEmail(auth, email).then(function (user) {
                console.log('res', user);
                Toast.show('Email sent. Please check your email to reset your password', Toast.LONG);
            }).catch(function (e) {
                console.log(e)
            })
        } catch (err) {
            const error = JSON.stringify(err)
            console.log(error);
            Toast.show('Email or Password incorrect !', Toast.LONG);
        }
    }
    return (
        <KeyboardAvoidingView style={styles.body} behavior='padding'>
            <View>
                <View style={{ marginTop: insets.top + 32 }}>
                    <TouchableOpacity style={{ marginLeft: 10 }}
                        onPress={() => { navigation.goBack() }}>
                        <BackIcon />
                    </TouchableOpacity>
                </View>
                <View style={[styles.logo,]}>
                    <Image
                        source={logoLogin}
                    />
                    <Text
                        style={styles.headerText}
                        text='new24'
                    />
                    <Text
                        style={styles.contentText}
                        text='Enter your email to be sent a reset password link.'
                    />
                </View>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps={'handled'}>
                    <TextField
                        value={email}
                        onChangeText={onChangeEmail}
                        containerStyle={styles.textField}
                        style={{ paddingTop: 25 }}
                        label='Email'
                        placeholder='Email'
                        helper={emailError}
                    />
                    <TouchableOpacity
                        activeOpacity={1}
                        disabled={!isValid()}
                        onPress={handleReset}
                        style={[styles.button, {
                            backgroundColor: !isValid() ? COLOR.buttonColorInactive : COLOR.buttonColorActive
                        }]}>
                        <Text
                            text='Sign Up'
                            style={{
                                color: COLOR.white
                            }}
                        />
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </KeyboardAvoidingView>
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
    headerText: {
        fontWeight: '700',
        fontSize: 18,
        marginTop: 20,
        color: headBlackColor
    },
    contentText: {
        fontWeight: '500',
        fontSize: 14,
        marginTop: 20,
        color: headBlackColor,
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

});

export default ForgotPasswordScreen;