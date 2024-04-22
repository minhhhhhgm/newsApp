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
import TwitterIcon from '../../icons/svg-component/twitterIcon';
import { COLOR, COLOR_MODE, headBlackColor } from '../../utils/color';
import { logoLogin } from '../../utils/const';
import { setAccessToken, setEmailApp, setNews } from '../../utils/storage';
import { handleValidateEmail, handleValidatePass } from '../../utils/validate';
import { Righticon } from './component/eye-icon';
import Loading from '../../components/loading';
import { useDispatch, useSelector } from 'react-redux';
import { addMail, changeStatusLogin } from '../../store/newsSlice';
import { dataCategoryTuoiTre, dataCategoryVnEpress, handleSaveCategory } from '../../utils/categoryManagement';
import { RootState } from '../../store/store';
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
  const mode = useSelector((state: RootState) => state.newsReducer.darkMode)
  const stroke = mode ? COLOR.white : null
  const styles = useSignInStyles(mode)

  
  const onChangeEmail = (value: string) => {
    const mailValidate = handleValidateEmail(value);
    setEmailError(mailValidate ?? '');
    setEmail(value);
  };


  const onChangePass = (value: string) => {
    const passValidate = handleValidatePass(value);
    setPasswordError(passValidate ?? '');
    setPassword(value);
  };


  const isValid = () => email && password && !emailError && !passwordError;


  const handleSignIn = async () => {
    setIsLoading(true)
    const dataVnE = JSON.stringify(dataCategoryVnEpress())
    const dataTt = JSON.stringify(dataCategoryTuoiTre())
    try {
      const responseSignIn = await signInWithEmailAndPassword(auth, email, password)
      if (responseSignIn) {
        console.log(responseSignIn);
        await setAccessToken(await responseSignIn.user.getIdToken())
        await setEmailApp(email)
        await setNews('VnExpress')
        dispatch(addMail(email))
        handleSaveCategory(dataVnE, dataTt, email)
        dispatch(changeStatusLogin(true))
        setIsLoading(false)
      }
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
        <View style={[styles.logo, { marginTop: insets.top + 32 }]}>
          <Image
            style={styles.image}
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
            mode={mode}
            value={email}
            onChangeText={onChangeEmail}
            containerStyle={styles.textField}
            style={styles.inputStyle}
            label={'email'}
            placeholder={'email'}
            helper={emailError}
          />
          <TextField
            mode={mode}
            value={password}
            onChangeText={onChangePass}
            containerStyle={styles.textField}
            style={styles.inputStyle}
            label={'password'}
            placeholder={'password'}
            secureTextEntry={!isShowPassword}
            RightIcon={
              <Righticon
                password={password}
                handleShowPass={() => { setIsShowPassword(!isShowPassword) }}
                isShowPassword={isShowPassword}
                mode={mode}
              />}
            helper={passwordError}
          />
          {
            password && (
              <TouchableOpacity
                style={styles.viewFogotPass}
                onPress={() => navigation.navigate('ForgotPassword')}>
                <Text

                  style={{
                    color: COLOR_MODE(mode).textNewsColor,
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
              backgroundColor: !isValid() ? COLOR.buttonColorInactive : COLOR_MODE(mode).titleText
            }]}>
            <Text
              text={'signIn'}
              style={{
                color: COLOR_MODE(mode).backgroundColor
              }}
            />
          </TouchableOpacity>
          <View style={styles.rowLine}>
            <View style={styles.line}></View>
            <Text text={'orSignInWith'}
              style={{
                marginHorizontal: 10,
                color: COLOR_MODE(mode).textNewsColor
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
              <GoogleIcon stroke={stroke} />
            </TouchableOpacity>
            <View style={{ width: '5%' }}></View>
            <TouchableOpacity>
              <FbIcon stroke={stroke} />
            </TouchableOpacity>
            <View style={{ width: '5%' }}></View>
            <TouchableOpacity>
              <TwitterIcon stroke={stroke} />
            </TouchableOpacity>
            <View style={{ width: '5%' }}></View>
            <TouchableOpacity>
              <AppleIcon stroke={stroke} />
            </TouchableOpacity>
          </View>
          <View style={styles.viewRegister}>
            <TextRn style={{
              marginHorizontal: 48,
              marginTop: 30,
              textAlign: 'center',
              color: COLOR_MODE(mode).textNewsColor,
              marginBottom: 50
            }}>
              {t(`${'dontHaveAnAccount'}`)}
              <TextRn
                onPress={() => navigation.navigate('SignUp')}
                // text={`Register`}
                style={{
                  fontWeight: '700',
                  color: COLOR_MODE(mode).textNewsColor,
                  fontFamily: '',

                }} > {t(`${'register'}`)}</TextRn>
            </TextRn>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

const useSignInStyles = (mode: boolean) => {
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
      backgroundColor: COLOR_MODE(mode).textNewsColor,
      height: 1,
      flex: 1,
    },
    viewRegister: {
      marginBottom: 200
    },
    inputStyle: {
      paddingTop: 25,
      color: COLOR_MODE(mode).textNewsColor,
    }
  });
  return styles;
}



export default SignInScreen;