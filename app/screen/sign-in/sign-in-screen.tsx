import { signInWithEmailAndPassword } from '@firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, KeyboardAvoidingView, ScrollView, StyleSheet, Text as TextRn, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Toast from 'react-native-simple-toast';
import { ParamsList, auth } from '../../../App';
import { Text } from '../../components/Text';
import { TextField } from '../../components/TextField';
import AppleIcon from '../../icons/svg-component/appleIcon';
import FbIcon from '../../icons/svg-component/fbIcon';
import GoogleIcon from '../../icons/svg-component/googleIcon';
import LineIcon from '../../icons/svg-component/lineIcon';
import TwitterIcon from '../../icons/svg-component/twitterIcon';
import { COLOR, headBlackColor } from '../../utils/color';
import { logoLogin } from '../../utils/const';
import { setAccessToken, setEmailApp } from '../../utils/storage';
import { handleValidateEmail, handleValidatePass } from '../../utils/validate';
import { Righticon } from './component/eye-icon';
import { } from '../../i18n/en';
import Loading from '../../components/loading';
import { Category } from '../../database';
import { dataInterests, handleSaveCategory, saveCate } from '../../utils/homeAction';
import { useDispatch } from 'react-redux';
import { addMail } from '../../store/newsSlice';
type NavigationProps = NativeStackNavigationProp<ParamsList, 'BookMark'>

const SignInScreen = () => {
  const insets = useSafeAreaInsets();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const navigation = useNavigation<NavigationProps>()
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()
  const { t } = useTranslation();
  const dataInterest = dataInterests(email)
  const handleSignIn = async () => {
    setIsLoading(true)
   
    try {
      const responseSignIn = await signInWithEmailAndPassword(auth, email, password)
      if (responseSignIn) {
        console.log(responseSignIn);
        await setAccessToken(await responseSignIn.user.getIdToken())
        await setEmailApp(email)
        dispatch(addMail(email))
        saveCate(dataInterest, email)
        navigation.reset({
          index: 0,
          routes: [{ name: 'BottomNavigation' }],
        });
       
        // await handleSaveCategory(email, dataInterest)
        setIsLoading(false)
      }
    } catch (err) {
      const error = JSON.stringify(err)
      console.log(error);
      Toast.show('Email or Password incorrect !', Toast.LONG);
      setIsLoading(false)
    }
  }

  const onChangeEmail = (value: string) => {
    const mailValidate = handleValidateEmail(value)
    if (mailValidate) {
      setEmailError(mailValidate)
    } else {
      setEmailError('')
    }
    setEmail(value)
  }

  const onChangePass = (value: string) => {
    const passValidate = handleValidatePass(value)
    if (passValidate) {
      setPasswordError(passValidate)
    } else {
      setPasswordError('')
    }
    setPassword(value)
  }
  const isValid = () => {
    if (email && password && !emailError && !passwordError) {
      return true;
    }
    return false;
  };
  return (
    <KeyboardAvoidingView style={styles.body} behavior='padding'>
      <Loading isVisible={isLoading} />
      <View>
        <View style={[styles.logo, { marginTop: insets.top + 32 }]}>
          <Image
            source={logoLogin}
          />
          <Text
            style={styles.headerText}
            text={'new24'}
          />
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps={'handled'}>
          <TextField
            value={email}
            onChangeText={onChangeEmail}
            containerStyle={styles.textField}
            style={{ paddingTop: 25, }}
            label={'email'}
            placeholder={'email'}
            helper={emailError}
          />
          <TextField
            value={password}
            onChangeText={onChangePass}
            containerStyle={styles.textField}
            style={{
              paddingTop: 25
            }}
            label={'password'}
            placeholder={'password'}
            secureTextEntry={!isShowPassword}
            RightIcon={<Righticon password={password} handleShowPass={() => { setIsShowPassword(!isShowPassword) }} isShowPassword={isShowPassword} />}
            // RightAccessory={() => Righticon({ password: password, handleShowPass: () => { setIsShowPassword(!isShowPassword) }, isShowPassword })}
            helper={passwordError}
          />
          {
            password && (
              <TouchableOpacity
                style={styles.viewFogotPass}
                onPress={() => navigation.navigate('ForgotPassword')}>
                <Text

                  style={{
                    color: COLOR.fogotPassColor,
                    fontWeight: '500',
                  }}
                  text={'forgotPassword'}
                />
              </TouchableOpacity>
            )
          }
          <TouchableOpacity
            activeOpacity={1}
            disabled={!isValid()}
            onPress={handleSignIn}
            style={[styles.button, {
              backgroundColor: !isValid() ? COLOR.buttonColorInactive : COLOR.buttonColorActive
            }]}>
            <Text
              text={'signIn'}
              style={{
                color: COLOR.white
              }}
            />
          </TouchableOpacity>
          <View style={styles.rowLine}>
            <View style={styles.line}></View>
            <Text text={'orSignInWith'}
              style={{
                marginHorizontal: 10,
                color: COLOR.darkBlack,
              }} />
            <View style={styles.line}></View>
          </View>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignSelf: 'center',
            marginTop: 50
          }}>
            <TouchableOpacity>
              <GoogleIcon />
            </TouchableOpacity>
            <View style={{ width: '5%' }}></View>
            <TouchableOpacity>
              <FbIcon />
            </TouchableOpacity>
            <View style={{ width: '5%' }}></View>
            <TouchableOpacity>
              <TwitterIcon />
            </TouchableOpacity>
            <View style={{ width: '5%' }}></View>
            <TouchableOpacity>
              <AppleIcon />
            </TouchableOpacity>
          </View>
          <View style={styles.viewRegister}>
            <TextRn style={{
              marginHorizontal: 48,
              marginTop: 30,
              textAlign: 'center',
              color: COLOR.darkBlack,
              marginBottom: 50
            }}>
              {t(`${'dontHaveAnAccount'}`)}
              <TextRn
                onPress={() => navigation.navigate('SignUp')}
                // text={`Register`}
                style={{
                  fontWeight: '700',
                  color: COLOR.darkBlack,
                  fontFamily: '',

                }} > {t(`${'register'}`)}</TextRn>
            </TextRn>
          </View>
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
  viewFogotPass: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 46,
    marginTop: 5,
  },
  rowLine: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    marginHorizontal: 46
  },
  line: {
    backgroundColor: COLOR.black,
    height: 1,
    flex: 1,
  },
  viewRegister: {
    marginBottom: 200
  }
});

export default SignInScreen;