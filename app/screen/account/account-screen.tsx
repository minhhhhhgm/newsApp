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
import { handleValidatePass } from '../../utils/validate';
import { Righticon } from '../sign-in/component/eye-icon';
import { COLOR } from '../../utils/color';
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
          })
          .catch((error) => {
            console.log(error);
          })
      })
      .catch((error) => {
        Toast.show('Incorrect current password !', Toast.LONG);
        console.log(error)
      });
  }



  return (
    <View style={[styles.body, { paddingTop: 22 + insets.top }]}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
        <View style={{ flexDirection: 'row', }}>
          <TouchableOpacity style={{ marginLeft: 10 }}
            onPress={() => { navigation.goBack() }}>
            <BackIcon />
          </TouchableOpacity>
          <Text
            text='Account'
            style={styles.headerText}
          />
        </View>
        <TouchableOpacity
          onPress={isValid() ? handleChangePass : () => {}}>
          <Text
            text={'Save'}
            style={[styles.textSave, { color: isValid() ? COLOR.buttonColorActive : COLOR.buttonColorInactive }]}
          />
        </TouchableOpacity>
      </View>
      {

        !isChangePass ?
          <View style={styles.content}>
            <View style={{ flexDirection: 'row' }}>
              <Text
                text='Email'
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
                  text='Change Password'
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
              label='Current password'
              placeholder='Current password'
              secureTextEntry={!isShowPassword}
              RightAccessory={() => Righticon({ password: password, handleShowPass: () => { setIsShowPassword(!isShowPassword) }, isShowPassword })}
              helper={passwordError}
            />
            <TextField
              value={newPassword}
              onChangeText={onChangeNewPass}
              containerStyle={styles.textField}
              style={{
                paddingTop: 25
              }}
              label='New password'
              placeholder='New password'
              secureTextEntry={!isShowNewPassword}
              RightAccessory={() => Righticon({ password: newPassword, handleShowPass: () => { setIsShownewPassword(!isShowNewPassword) }, isShowPassword: isShowNewPassword })}
              helper={newPasswordError}
            />
            <TextField
              value={reNewPassword}
              onChangeText={onChangeReNewPass}
              containerStyle={[styles.textField, { marginTop: 65 }]}
              style={{
                paddingTop: 25,
              }}
              label='Confirm new password'
              placeholder='Confirm new password'
              secureTextEntry={!isShowConfirmPassword}
              RightAccessory={() => Righticon({ password: reNewPassword, handleShowPass: () => { setIsShowConfirmPassword(!isShowConfirmPassword) }, isShowPassword: isShowConfirmPassword })}
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




// import React from "react";
// import { Button, Image, StyleSheet, Text, View, FlatList, TouchableOpacity } from "react-native";
// import { News, Users } from "../../database";
// import { nanoid } from "@reduxjs/toolkit";

// function App() {
//   return <MessageList />;
// }

// const MessageList = () => {
//   const messages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
//   const renderItem = ({ item, index }: any) => {
//     return <Message isLast={index === 0} />;
//   };

//   console.log(Users.data(), News.data());
//   const handleInsert = () => {
//     const params = {
//       id: nanoid(),
//       email: 'email'
//     }
//     // Users.insert(params, save = true)
//     var todoItem = Users.get({ id: "gcB8LILnTtbBWpmdqPfoYS" });

//     console.log(Users);
//   }

//   return (
//     <View style={{ flex: 1 }}>

//       <TouchableOpacity
//         onPress={handleInsert}
//         style={{
//           marginTop: 50
//         }}>
//         <Text>ADDDDD</Text>
//       </TouchableOpacity>
//       {/* <FlatList
//         data={messages}
//         // inverted
//         // style={{ flex: 1, paddingHorizontal: 16, paddingBottom: 16 }}
//         renderItem={renderItem}
//         ItemSeparatorComponent={() => <View style={{ marginVertical: 6 }} />}
//       /> */}
//     </View>
//   );
// };

// const Message = (props: any) => {
//   return (
//     <View
//       style={{
//         // marginBottom:10,
//         zIndex: props.isLast ? 20 : 10,
//         // backgroundColor: "green", padding: 20 
//         // position: props.isLast ? "relative" : "absolute"
//       }}
//     >
//       <Text style={{}}>
//         Message here
//       </Text>
//       {props.isLast ? (
//         <View
//           style={{
//             backgroundColor: "orange",
//             position: "absolute",
//             bottom: 50,
//             left: 0,
//             right: 0,
//             top: 20,
//             zIndex: 20,
//             height: 50
//           }}
//         >
//           <Text>Absolute Positioned</Text>
//         </View>
//       ) : null}
//     </View>
//   );
// };

// export default App;
