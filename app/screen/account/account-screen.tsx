import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { EmailAuthProvider, User, reauthenticateWithCredential, updatePassword } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Toast from 'react-native-simple-toast';
import { ParamsList, auth } from '../../../App';
import { Text } from '../../components/Text';
import { TextField } from '../../components/TextField';
import LockIcon from '../../icons/svg-component/LockIcon';
import RightChvron from '../../icons/svg-component/RightChvron';
import BackIcon from '../../icons/svg-component/backIcon';
import { COLOR, COLOR_MODE } from '../../utils/color';
import { handleValidatePass } from '../../utils/validate';
import { Righticon } from '../sign-in/component/eye-icon';
import Loading from '../../components/loading';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
type NavigationProps = NativeStackNavigationProp<ParamsList, 'Account'>


const AccountScreen = () => {

  const navigation = useNavigation<NavigationProps>()
  const [isChangePass, setIsChangPass] = useState(false)
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowNewPassword, setIsShownewPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [reNewPassword, setReNewPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [newPasswordError, setNewPasswordError] = useState('')
  const [reNewPasswordError, setReNewPasswordError] = useState('')
  const [isLoading, setIsLoading] = useState(false);
  const insets = useSafeAreaInsets();
  const mode = useSelector((state: RootState) => state.newsReducer.darkMode)
  const styles = useAccountStyles(mode)
  const stroke = mode ? COLOR.white : null


  useEffect(() => {
    if (newPassword && password) {
      if (newPassword === password) {
        setNewPasswordError('theNewPasswordMatchesTheCurrentPassword')
      } else if (newPassword.length >= 6) {
        setNewPasswordError('')
      }
    }
  }, [newPassword, password])


  useEffect(() => {
    if (reNewPassword && newPassword) {
      if (reNewPassword !== newPassword) {
        setReNewPasswordError('theConfirmPasswordNotMatchesTheNewPassword')
      } else if (reNewPassword.length >= 6) {
        setReNewPasswordError('')
      }
    }
  }, [reNewPassword, newPassword])


  const onChangePass = (value: string) => {
    const passValidate = handleValidatePass(value);
    setPasswordError(passValidate || '');
    setPassword(value);
  };


  const onChangeNewPass = (value: string) => {
    const passValidate = handleValidatePass(value);
    setNewPasswordError(passValidate || '');
    if (value === password) {
      setNewPasswordError('theNewPasswordMatchesTheCurrentPassword');
    }
    setNewPassword(value);
  };


  const onChangeReNewPass = (value: string) => {
    if (!value) {
      setReNewPasswordError('passwordIsRequired');
    }
    setReNewPassword(value);
  };


  const isValid = () => {
    return reNewPassword && password && newPassword && !reNewPasswordError && !passwordError && !newPasswordError;
  };

  

  const handleChangePass = async () => {
    setIsLoading(true)
    const credential = EmailAuthProvider.credential(
      auth.currentUser?.email as string,
      password
    );
    reauthenticateWithCredential(auth.currentUser as User, credential)
      .then((result) => {
        updatePassword(auth.currentUser as User, reNewPassword)
          .then((value) => {
            console.log(value);
            Toast.show('Change password successfully !', Toast.LONG);
            setPassword('')
            setNewPassword('')
            setReNewPassword('')
            setIsChangPass(false)
            setIsLoading(false)
          })
          .catch((error) => {
            console.log(error);
            setIsLoading(false)
          })
      })
      .catch((error) => {
        Toast.show('Incorrect current password !', Toast.LONG);
        console.log(error)
        setIsLoading(false)
      });
  }



  return (
    <View style={[styles.body, { paddingTop: 22 + insets.top }]}>
      <Loading isVisible={isLoading} />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
        <View style={{ flexDirection: 'row', }}>
          <TouchableOpacity style={{ marginLeft: 10 }}
            onPress={() => { navigation.goBack() }}>
            <BackIcon stroke={stroke} />
          </TouchableOpacity>
          <Text
            text={'account'}
            style={styles.headerText}
          />
        </View>
        <TouchableOpacity
          activeOpacity={1}
          onPress={isValid() ? handleChangePass : () => { }}>
          <Text
            text={'save'}
            style={[styles.textSave, { color: isValid() ? COLOR_MODE(mode).textActive : COLOR_MODE(mode).textInActive }]}
          />
        </TouchableOpacity>
      </View>
      {

        !isChangePass ?
          <View style={styles.content}>
            <View style={{ flexDirection: 'row' }}>
              <Text
                text={'email'}
                style={styles.mailText}
              />
              <TextInput
                value={auth.currentUser?.email?.toString()}
                style={{
                  borderBottomWidth: 1,
                  flex: 1,
                  borderBottomColor: COLOR.buttonColorInactive,
                  marginLeft: 20,
                  color : COLOR_MODE(mode).textNewsColor,
                }}
              />
            </View>
            <TouchableOpacity
              onPress={() => setIsChangPass(true)}
              activeOpacity={0.7}
              style={styles.viewChangePass}>
              <View style={{
                flexDirection: 'row'
              }}>
                <LockIcon stroke={stroke}/>
                <Text
                  style={styles.textChangePass}
                  text={'changePass'}
                />
              </View>
              <RightChvron stroke={stroke}/>
            </TouchableOpacity>
          </View>
          :
          <View>
            <TextField
              mode={mode}
              value={password}
              onChangeText={onChangePass}
              containerStyle={styles.textField}
              style={styles.inputStyle}
              label={'currentPassword'}
              placeholder={'currentPassword'}
              secureTextEntry={!isShowPassword}
              RightIcon={
                <Righticon
                  password={password}
                  handleShowPass={() => { setIsShowPassword(!isShowPassword) }}
                  isShowPassword={isShowPassword}
                  paddingRight={16}
                  mode={mode}
                />
              }
              helper={passwordError}
            />
            <TextField
              mode={mode}
              value={newPassword}
              onChangeText={onChangeNewPass}
              containerStyle={styles.textField}
              style={styles.inputStyle}
              label={'newPassword'}
              placeholder={'newPassword'}
              secureTextEntry={!isShowNewPassword}
              RightIcon={
                <Righticon
                  password={newPassword}
                  handleShowPass={() => { setIsShownewPassword(!isShowNewPassword) }}
                  isShowPassword={isShowNewPassword}
                  paddingRight={16}
                  mode={mode}
                />
              }
              helper={newPasswordError}
            />
            <TextField
              mode={mode}
              value={reNewPassword}
              onChangeText={onChangeReNewPass}
              containerStyle={[styles.textField, { marginTop: 50 }]}
              style={styles.inputStyle}
              label={'confirmNewPassword'}
              placeholder={'confirmNewPassword'}
              secureTextEntry={!isShowConfirmPassword}
              RightIcon={
                <Righticon
                  password={reNewPassword}
                  handleShowPass={() => { setIsShowConfirmPassword(!isShowConfirmPassword) }}
                  isShowPassword={isShowConfirmPassword}
                  paddingRight={16}
                  mode={mode}
                />
              }
              helper={reNewPasswordError}
            />
          </View>
      }
    </View>
  )
}
export default AccountScreen

const useAccountStyles = (mode: boolean) => {
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
    content: {
      marginTop: 20,
      marginHorizontal: 16
    },
    headerText: {
      fontWeight: '700',
      fontSize: 18,
      color: COLOR_MODE(mode).textNewsColor,
      marginLeft: 16,

    },
    contentText: {
      fontWeight: '500',
      fontSize: 14,
      marginTop: 20,
      color: COLOR_MODE(mode).textNewsColor,
      marginHorizontal: 46
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
    },
    mailText: {
      fontSize: 14,
      fontWeight: '700',
      color: COLOR_MODE(mode).textNewsColor,
      alignSelf: 'center'
      // marginTop : 20
    },
    textField: {
      marginLeft: 16,
      marginTop: 40
    },
    textChangePass: {
      color: COLOR_MODE(mode).textNewsColor,
      marginLeft: 10,
      fontWeight: '500'
    },
    viewChangePass: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 30
    },
    textSave: {
      fontWeight: '700',
      fontSize: 15,
      marginRight: 16
    }
  });
  return styles;
}





