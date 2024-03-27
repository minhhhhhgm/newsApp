import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity, View, Text as TextRn } from 'react-native';
import { logoLogin } from '../../utils/const';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '../../components/Text';
import { headBlackColor } from '../../utils/color';
import { i18n, useLanguage } from '../../i18n/i18n';
import { TextField } from '../../components/TextField';
import EyeIcon from '../../icons/svg-component/eyeIcon';
import EyeOffIcon from '../../icons/svg-component/eyeOffIcon';
import { Button } from '../../components/Button';
import LineIcon from '../../icons/svg-component/lineIcon';
import GmailIcon from '../../icons/svg-component/gmailIcon';
import GoogleIcon from '../../icons/svg-component/googleIcon';
import FbIcon from '../../icons/svg-component/fbIcon';
import TwitterIcon from '../../icons/svg-component/twitterIcon';
import AppleIcon from '../../icons/svg-component/appleIcon';
import { FirebaseAuth } from '../../firebase/config';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from '@firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { Controller, useForm } from "react-hook-form"
import { getAccessToken, setAccessToken, setEmail } from '../../utils/storage';
import Toast from 'react-native-simple-toast';
import { useTranslation } from 'react-i18next';

const SignInScreen = (props : any) => {
  const insets = useSafeAreaInsets();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const auth = FirebaseAuth
  const navigation = useNavigation()
  const { t } = useTranslation();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: 'all'
  })
  const Righticon = () => {
    return (
      watch('password') &&
      <TouchableOpacity
        onPress={() => {
          setIsShowPassword(!isShowPassword)
        }}
        style={{
          justifyContent: 'center',
          paddingTop: 25
        }}>
        {
          !isShowPassword ? <EyeIcon /> : <EyeOffIcon />
        }
      </TouchableOpacity>
    )
  }

  const handleSignIn = async () => {
    try {
      const responseSignIn = await signInWithEmailAndPassword(auth, watch('email'), watch('password'))
      if (responseSignIn) {
        console.log(responseSignIn);
        await setAccessToken(await responseSignIn.user.getIdToken())
        await setEmail(watch('email'))
        console.log(await getAccessToken());
        const isBack = false
        const isHome = true
        props.navigation.replace('Interests', { isBack, isHome })
        
      }
      // console.log( await responseSignIn.user.getIdToken());

    } catch (err) {
      const error = JSON.stringify(err)
      console.log(error);
      Toast.show('Email or Password incorrect !', Toast.LONG);

    }

  }
  return (
    <View style={styles.body}>
      <View style={[styles.logo, { marginTop: insets.top + 32 }]}>
        <Image
          source={logoLogin}
        />
        <Text
          style={styles.headerText}
          text='new24'
        />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={'handled'}>
        <Controller
          control={control}
          render={({ field: { onChange, value, onBlur } }) => (
            <TextField
              value={value}
              onChangeText={onChange}
              containerStyle={styles.textField}
              style={{
                paddingTop: 25
              }}
              label='Email'
              placeholder='Email'
              helper={errors?.email?.message}
            />
          )}
          defaultValue={""}
          name="email"
          rules={{
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: 'Invalid Email'
            }
          }}
        />

        <Controller
          control={control}
          render={({ field: { onChange, value, onBlur } }) => (
            <TextField
              value={value}
              onChangeText={onChange}
              containerStyle={styles.textField}
               style={{
                paddingTop: 25
              }}
              label='Password'
              placeholder='Password'
              secureTextEntry={!isShowPassword}
              RightAccessory={Righticon}
              helper={errors?.password?.message}
            />
          )}
          defaultValue={""}
          name="password"
          rules={{
            required: "Password is required",
            validate: value => value.length < 6 ? 'Password to short' : undefined,
          }}
        />
        {
          watch('password') && (
            <View style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              paddingHorizontal: 46,
              marginTop: 5,

            }}>
              <Text
                style={{
                  color: '#180E19',
                  fontWeight: '500',
                }}
                text='Forgot password?'
              />
            </View>
          )
        }
        <Button
          disabled={!isValid}
          onPress={handleSignIn}
          style={[styles.button, {
            backgroundColor: !isValid ? '#EEEEEE' : '#180E19'
          }]}
          textStyle={{
            color: '#FFFFFF'
          }}
          text='Sign In'
        />
        <View style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignSelf: 'center',
          marginTop: 50
        }}>
          <LineIcon />
          <Text text='or sign in with'
            style={{
              marginHorizontal: 10,
              color: '#000000'
            }} />
          <LineIcon />
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
        <TextRn style={{
          marginHorizontal: 48,
          marginTop: 30,
          textAlign: 'center',
          color: '#000000'
        }}>
          {t('Don’t have an account?')}
          <Text
            // onPress={() => props.navigation.navigate('BottomNavigation', { screen: 'Home', params: { data: data } })}
            onPress={() => props.navigation.navigate('SignUp')}
            text={`Register`}
            style={{
              fontWeight: '700',
              color: '#000000'
            }} />
        </TextRn>
      </ScrollView>
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
  }
});

export default SignInScreen;