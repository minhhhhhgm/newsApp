import { createUserWithEmailAndPassword, updateProfile, } from '@firebase/auth';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, ScrollView, StyleSheet, Text as TextRn, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Toast from 'react-native-simple-toast';
import { Text } from '../../components/Text';
import { TextField } from '../../components/TextField';
import { FirebaseAuth } from '../../firebase/config';
import AppleIcon from '../../icons/svg-component/appleIcon';
import FbIcon from '../../icons/svg-component/fbIcon';
import GmailIcon from '../../icons/svg-component/gmailIcon';
import GoogleIcon from '../../icons/svg-component/googleIcon';
import LineIcon from '../../icons/svg-component/lineIcon';
import TwitterIcon from '../../icons/svg-component/twitterIcon';
import { COLOR, COLOR_MODE, headBlackColor } from '../../utils/color';
import { logoLogin } from '../../utils/const';
import { handleValidateEmail, handleValidatePass } from '../../utils/validate';
import { Righticon } from '../sign-in/component/eye-icon';
import Loading from '../../components/loading';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const SignUpScreen = () => {
  const insets = useSafeAreaInsets();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [userName, setUserName] = useState('')
  const [userNameError, setUserNameError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const auth = FirebaseAuth
  const navigation = useNavigation()
  const { t } = useTranslation();
  const mode = useSelector((state: RootState) => state.newsReducer.darkMode)
  const stroke = mode ? COLOR.white : null
  const styles = useSignUpStyles(mode)

  const onChangeUserName = (value: string) => {
    setUserName(value);
    setUserNameError(value ? '' : 'Username is required');
  };



  const onChangeEmail = (value: string) => {
    setEmail(value);
    setEmailError(handleValidateEmail(value) || '');
  };


  const onChangePass = (value: string) => {
    setPassword(value);
    setPasswordError(handleValidatePass(value) || '');
  };


  const isValid = () => email && password && userName && !emailError && !passwordError && !userNameError;


  const handleSignUp = async () => {
    setIsLoading(true)
    try {
      const responseSignUp = await createUserWithEmailAndPassword(auth, email, password)
      console.log(responseSignUp);
      const update = {
        displayName: userName,
        photoURL: 'https://as2.ftcdn.net/v2/jpg/05/49/98/39/1000_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg',
      };
      if (responseSignUp) {
        await updateProfile(responseSignUp.user, update);
        Toast.show('Create account success', Toast.LONG);
        setIsLoading(false)
      }
    } catch (err) {
      console.log(err);
      Toast.show('Error !', Toast.LONG);
      setIsLoading(false)
    }
  }

  
  return (
    <View style={styles.body}>
      <Loading isVisible={isLoading} />
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
          value={userName}
          onChangeText={onChangeUserName}
          containerStyle={{
            marginHorizontal: 46,
          }}
          style={styles.inputStyle}
          label={'username'}
          placeholder={'username'}
          helper={userNameError}
        />
        <TextField
          mode={mode}
          value={email}
          onChangeText={onChangeEmail}
          containerStyle={styles.textField}
          style={{ paddingTop: 25 }}
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
            />
          }
          helper={passwordError}
        />

        <TouchableOpacity
          activeOpacity={1}
          disabled={!isValid()}
          onPress={handleSignUp}
          style={[styles.button, {
            backgroundColor: !isValid() ? COLOR.buttonColorInactive : COLOR_MODE(mode).titleText
          }]}>
          <Text
            text={'signUp'}
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
        <View style={styles.lineView}>
          <TouchableOpacity onPress={() => navigation.navigate('SignIn' as never)}>
            <GmailIcon stroke={stroke} />
          </TouchableOpacity>
          <TouchableOpacity>
            <GoogleIcon stroke={stroke} />
          </TouchableOpacity>
          <TouchableOpacity>
            <FbIcon stroke={stroke} />
          </TouchableOpacity>
          <TouchableOpacity>
            <TwitterIcon stroke={stroke} />
          </TouchableOpacity>
          <TouchableOpacity>
            <AppleIcon stroke={stroke} />
          </TouchableOpacity>
        </View>
        <TextRn style={{
          marginHorizontal: 48,
          marginTop: 30,
          textAlign: 'center',
          color: COLOR_MODE(mode).textNewsColor
        }}>
          {t(`${'bySigningUpToNews24YouAreAcceptingOur'}`)}
          <Text text={' ' + t(`${'termsAndConditions'}`)} style={{
            fontWeight: '700',
            color: COLOR_MODE(mode).textNewsColor
          }} />
        </TextRn>
      </ScrollView>
    </View>
  );
};




const useSignUpStyles = (mode: boolean) => {
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
    lineView: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignSelf: 'center',
      marginTop: 50
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

export default SignUpScreen;