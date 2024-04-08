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
import { COLOR, headBlackColor } from '../../utils/color';
import { logoLogin } from '../../utils/const';
import { handleValidateEmail, handleValidatePass } from '../../utils/validate';
import { Righticon } from '../sign-in/component/eye-icon';

const SignUpScreen = () => {
  const insets = useSafeAreaInsets();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [userName, setUserName] = useState('')
  const [userNameError, setUserNameError] = useState('')
  const auth = FirebaseAuth
  const navigation = useNavigation()
  const { t, i18n } = useTranslation();

  const onChangeUserName = (value: string) => {
    if (!value) {
      setUserNameError('Username is required')
    } else {
      setUserNameError('')
    }
    setUserName(value)
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
    if (email && password && userName && !emailError && !passwordError && !userNameError) {
      return true;
    }
    return false;
  };
  const handleSignIn = async () => {
    try {
      const responseSignUp = await createUserWithEmailAndPassword(auth, email, password)
      console.log(responseSignUp);
      const update = {
        displayName: userName,
        photoURL: 'https://my-cdn.com/assets/user/123.png',
      };
      if (responseSignUp) {
        const responeUpadte = await updateProfile(responseSignUp.user, update);
        Toast.show('Create account success', Toast.LONG);
      }
    } catch (err) {
      console.log(err);
      Toast.show('Error !', Toast.LONG);
    }
  }
  return (
    <View style={styles.body}>
      <View style={[styles.logo, { marginTop: insets.top + 32 }]}>
        <Image
          source={logoLogin}
        />
        <Text
          style={{
            fontWeight: '700',
            fontSize: 18,
            marginTop: 20,
            color: headBlackColor
          }}
          text={'new24'}
        />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={'handled'}>
        <TextField
          value={userName}
          onChangeText={onChangeUserName}
          containerStyle={{
            marginHorizontal: 46,
          }}
          style={{
            paddingTop: 25
          }}
          label={'username'}
          placeholder={'username'}
          helper={userNameError}
        />
        <TextField
          value={email}
          onChangeText={onChangeEmail}
          containerStyle={styles.textField}
          style={{ paddingTop: 25 }}
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
          RightAccessory={() => Righticon({ password: password, handleShowPass: () => { setIsShowPassword(!isShowPassword) }, isShowPassword })}
          helper={passwordError}
        />

        <TouchableOpacity
          activeOpacity={1}
          disabled={!isValid()}
          onPress={handleSignIn}
          style={[styles.button, {
            backgroundColor: !isValid() ? COLOR.buttonColorInactive : COLOR.buttonColorActive
          }]}>
          <Text
            text={'signUp'}
            style={{
              color: COLOR.white
            }}
          />
        </TouchableOpacity>
        <View style={styles.lineView}>
          <LineIcon />
          <Text text={'orSignInWith'} style={{
            marginHorizontal: 10,
            color: COLOR.black
          }} />
          <LineIcon />
        </View>
        <View style={styles.lineView}>
          <TouchableOpacity onPress={() => navigation.navigate('SignIn' as never)}>
            <GmailIcon />
          </TouchableOpacity>
          <TouchableOpacity>
            <GoogleIcon />
          </TouchableOpacity>
          <TouchableOpacity>
            <FbIcon />
          </TouchableOpacity>
          <TouchableOpacity>
            <TwitterIcon />
          </TouchableOpacity>
          <TouchableOpacity>
            <AppleIcon />
          </TouchableOpacity>
        </View>
        <TextRn style={{
          marginHorizontal: 48,
          marginTop: 30,
          textAlign: 'center',
          color: COLOR.darkBlack
        }}>
          {t(`${'bySigningUpToNews24YouAreAcceptingOur'}`)}
          <Text text={' ' + t(`${'termsAndConditions'}`)} style={{
            fontWeight: '700',
            color: COLOR.darkBlack
          }} />
        </TextRn>
      </ScrollView>
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
  lineView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 50
  }
});

export default SignUpScreen;