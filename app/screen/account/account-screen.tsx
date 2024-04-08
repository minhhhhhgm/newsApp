import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { EmailAuthProvider, User, reauthenticateWithCredential, updatePassword } from 'firebase/auth';
import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Toast from 'react-native-simple-toast';
import { ParamsList, auth } from '../../../App';
import { Text } from '../../components/Text';
import { TextField } from '../../components/TextField';
import LockIcon from '../../icons/svg-component/LockIcon';
import RightChvron from '../../icons/svg-component/RightChvron';
import BackIcon from '../../icons/svg-component/backIcon';
import { COLOR } from '../../utils/color';
import { handleValidatePass } from '../../utils/validate';
import { Righticon } from '../sign-in/component/eye-icon';
import Loading from '../../components/loading';
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
  const onChangePass = (value: string) => {
    const passValidate = handleValidatePass(value)
    if (passValidate) {
      setPasswordError(passValidate)
    } else {
      setPasswordError('')
    }
    setPassword(value)
  }
  const onChangeNewPass = (value: string) => {
    const passValidate = handleValidatePass(value)
    if (passValidate) {
      setNewPasswordError(passValidate)
    } else {
      setNewPasswordError('')
    }
    if (value === password) {
      setNewPasswordError('The new password matches the current password')
    }
    setNewPassword(value)
  }

  const onChangeReNewPass = (value: string) => {
    const passValidate = handleValidatePass(value)
    if (passValidate) {
      setReNewPasswordError(passValidate)
    } else {
      setReNewPasswordError('')
    }
    if (value !== newPassword) {
      setReNewPasswordError('The confirm password not matches the new password')
    }
    setReNewPassword(value)
  }

  const isValid = () => {
    if (reNewPassword && password && newPassword && !reNewPasswordError && !passwordError && !newPasswordError) {
      return true;
    }
    return false;
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
            setIsChangPass(!isChangePass)
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
      <Loading isVisible={isLoading}/>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
        <View style={{ flexDirection: 'row', }}>
          <TouchableOpacity style={{ marginLeft: 10 }}
            onPress={() => { navigation.goBack() }}>
            <BackIcon />
          </TouchableOpacity>
          <Text
            text={'account'}
            style={styles.headerText}
          />
        </View>
        <TouchableOpacity
          onPress={isValid() ? handleChangePass : () => { }}>
          <Text
            text={'save'}
            style={[styles.textSave, { color: isValid() ? COLOR.buttonColorActive : COLOR.buttonColorInactive }]}
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
                }}
              />
            </View>
            <TouchableOpacity
              onPress={() => setIsChangPass(!isChangePass)}
              activeOpacity={0.7}
              style={styles.viewChangePass}>
              <View style={{
                flexDirection: 'row'
              }}>
                <LockIcon />
                <Text
                  style={styles.textChangePass}
                  text={'changePass'}
                />
              </View>
              <RightChvron />
            </TouchableOpacity>
          </View>
          :
          <View>
            <TextField
              value={password}
              onChangeText={onChangePass}
              containerStyle={styles.textField}
              style={{
                paddingTop: 25
              }}
              label={'currentPassword'}
              placeholder={'currentPassword'}
              secureTextEntry={!isShowPassword}
              RightAccessory={() =>
                Righticon({
                  password: password,
                  handleShowPass: () => { setIsShowPassword(!isShowPassword) },
                  isShowPassword,
                  paddingRight: 16
                })}
              helper={passwordError}
            />
            <TextField
              value={newPassword}
              onChangeText={onChangeNewPass}
              containerStyle={styles.textField}
              style={{
                paddingTop: 25
              }}
              label={'newPassword'}
              placeholder={'newPassword'}
              secureTextEntry={!isShowNewPassword}
              RightAccessory={() => Righticon({
                password: newPassword,
                handleShowPass: () => { setIsShownewPassword(!isShowNewPassword) },
                isShowPassword: isShowNewPassword,
                paddingRight: 16
              })}
              helper={newPasswordError}
            />
            <TextField
              value={reNewPassword}
              onChangeText={onChangeReNewPass}
              containerStyle={[styles.textField, { marginTop: 50 }]}
              style={{
                paddingTop: 15,
              }}
              label={'confirmNewPassword'}
              placeholder={'confirmNewPassword'}
              secureTextEntry={!isShowConfirmPassword}
              RightAccessory={() => Righticon({ password: reNewPassword, handleShowPass: () => { setIsShowConfirmPassword(!isShowConfirmPassword) }, isShowPassword: isShowConfirmPassword ,paddingRight: 16})}
              helper={reNewPasswordError}
            />
          </View>
      }
    </View>
  )
}
export default AccountScreen

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: COLOR.backgroundColor,
  },
  headerText: {
    fontWeight: '700',
    fontSize: 18,
    color: COLOR.darkBlack,
    marginLeft: 16,
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
  content: {
    marginTop: 20,
    marginHorizontal: 16
  },
  mailText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLOR.darkBlack,
    alignSelf: 'center'
    // marginTop : 20
  },
  textField: {
    marginLeft: 16,
    marginTop: 40
  },
  textChangePass: {
    color: COLOR.darkBlack,
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



