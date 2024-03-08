import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity, View, Text as TextRn } from 'react-native';
import { logoLogin } from '../utils/const';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '../components/Text';
import { headBlackColor } from '../utils/color';
import { i18n, useLanguage } from '../i18n/i18n';
import { TextField } from '../components/TextField';
import EyeIcon from '../icons/svg-component/eyeIcon';
import EyeOffIcon from '../icons/svg-component/eyeOffIcon';
import { Button } from '../components/Button';
import LineIcon from '../icons/svg-component/lineIcon';
import GmailIcon from '../icons/svg-component/gmailIcon';
import GoogleIcon from '../icons/svg-component/googleIcon';
import FbIcon from '../icons/svg-component/fbIcon';
import TwitterIcon from '../icons/svg-component/twitterIcon';
import AppleIcon from '../icons/svg-component/appleIcon';
import auth from '@react-native-firebase/auth';

const LoginScreen = () => {
  const insets = useSafeAreaInsets();
  const { locale, changeLanguage } = useLanguage();
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isShowPassword, setIsShowPassword] = useState(false);

  const Righticon = () => {
    return (
      password &&
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

  const handleSignIn =()=>{
    auth()
  .createUserWithEmailAndPassword('jane.doe@example.com', 'SuperSecretPassword!')
  .then(() => {
    console.log('User account created & signed in!');
  })
  .catch(error => {
    if (error.code === 'auth/email-already-in-use') {
      console.log('That email address is already in use!');
    }

    if (error.code === 'auth/invalid-email') {
      console.log('That email address is invalid!');
    }

    console.error(error);
  });
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
        <TextField
          value={userName}
          onChangeText={setUserName}
          containerStyle={{
            marginHorizontal: 46
          }}
          label='new24'
          placeholder='Username'
          helper={userName}
        />
        <TextField
          value={email}
          onChangeText={setEmail}
          containerStyle={{
            marginHorizontal: 46,
            marginTop: 25
          }}
          label='new24'
          placeholder='Email'
        />
        <TextField
          value={password}
          onChangeText={setPassword}
          containerStyle={{
            marginHorizontal: 46,
            marginTop: 25
          }}
          label='new24'
          placeholder='Password'
          secureTextEntry={!isShowPassword}
          RightAccessory={Righticon}
        />
        <Button
          onPress={handleSignIn}
          style={{
            backgroundColor: '#EEEEEE',
            borderRadius: 30,
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 10,
            paddingHorizontal: 49,
            alignSelf: 'center',
            marginTop: 79
          }}
          text='clouds'
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
          <TouchableOpacity>
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
          {i18n.t('By signing up to News24 you are accepting our')}
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

export default LoginScreen;