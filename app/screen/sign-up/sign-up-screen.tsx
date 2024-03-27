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
import Toast from 'react-native-simple-toast';
import { useTranslation } from 'react-i18next';

const SignUpScreen = () => {
  const insets = useSafeAreaInsets();
  const { locale, changeLanguage } = useLanguage();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const auth = FirebaseAuth
  const navigation = useNavigation()
  const { t, i18n } = useTranslation();

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
      const responseSignUp = await createUserWithEmailAndPassword(auth, watch('email'), watch('password'))
      // const responseSignIn = await signInWithEmailAndPassword(auth, watch('email'), watch('password'))
      console.log(responseSignUp); 
      const update = {
        displayName: watch('username'),
        photoURL: 'https://my-cdn.com/assets/user/123.png',
      };
      if (responseSignUp){
        const responeUpadte = await updateProfile(responseSignUp.user, update);
        Toast.show('Create account success', Toast.LONG);
        // navigation.navigate('HomeNews' as never)
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
          text='new24'
        />

        {/* <TouchableOpacity
          onPress={() => changeLanguage('vi')}>
          <Text text='clouds' />
        </TouchableOpacity> */}
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
              containerStyle={{
                marginHorizontal: 46,
              }}
              style={{
                paddingTop: 25
              }}
              label='Username'
              placeholder='Username'
              helper={errors?.username?.message}
            />
          )}
          defaultValue={""}
          name="username"
          rules={{
            required: "Username is required",
          }}
        />
        <Controller
          control={control}
          render={({ field: { onChange, value, onBlur } }) => (
            <TextField
              value={value}
              onChangeText={onChange}
              containerStyle={{
                marginHorizontal: 46,
                marginTop: 25
              }}
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
              containerStyle={{
                marginHorizontal: 46,
                marginTop: 25
              }}
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

       
        <Button
          disabled={!isValid}
          onPress={handleSignIn}
          style={{
            backgroundColor: !isValid ? '#EEEEEE' :'#180E19',
            borderRadius: 30,
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 10,
            paddingHorizontal: 49,
            alignSelf: 'center',
            marginTop: 79
          }}
          textStyle={{
            color:'#FFFFFF'
          }}
          text='Sign Up'
        />
        <View style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignSelf: 'center',
          marginTop: 50
        }}>
          <LineIcon />
          <Text text='or sign in with' style={{
            marginHorizontal: 10
          }} />
          <LineIcon />
        </View>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignSelf: 'center',
          marginTop: 50
        }}>
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
          color: '#000000'
        }}>
          {t('By signing up to News24 you are accepting our')}
          <Text text={`Terms & Conditions`} style={{
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
  }
});

export default SignUpScreen;