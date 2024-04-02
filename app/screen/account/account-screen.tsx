import React, { useState } from 'react';
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '../../components/Text';
import LockIcon from '../../icons/svg-component/LockIcon';
import RightChvron from '../../icons/svg-component/RightChvron';
import BackIcon from '../../icons/svg-component/backIcon';
import Toast from 'react-native-simple-toast';
import { auth } from '../../../App';
import { TextField } from '../../components/TextField';
import EyeIcon from '../../icons/svg-component/eyeIcon';
import EyeOffIcon from '../../icons/svg-component/eyeOffIcon';
import { EmailAuthProvider, User, reauthenticateWithCredential, updatePassword } from 'firebase/auth';


const AccountScreen = (props: any) => {

    // console.log('user', auth.currentUser);
    const [isChangePass, setIsChangPass] = useState(false)
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isShowNewPassword, setIsShownewPassword] = useState(false);
    const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);

    const insets = useSafeAreaInsets();
    const {
        control,
        handleSubmit,
        watch,
        setValue,
        formState: { errors, isValid, isDirty },
    } = useForm({
        mode: 'all'
    })
    console.log(isValid);
    
    const handledValidateNewPass = (value: string) => {
        if (value.length < 6) {
            return 'Password to short'
        }
        else if (value === watch('password')) {
            return 'The new password matches the current password'
        }
        else
            return undefined
    }
    const handledValidateReNewPass = (value: string) => {
        if (value.length < 6) {
            return 'Password to short'
        }
        else if (value !== watch('newpassword')) {
            return 'The confirm password not matches the new password'
        }
        else
            return undefined
    }

    const handleChangePass = async () => {
        const credential = EmailAuthProvider.credential(
            auth.currentUser?.email as string,
            watch('password')
        );
        reauthenticateWithCredential(auth.currentUser as User, credential)
            .then((result) => {
                updatePassword(auth.currentUser as User, watch('renewpassword'))
                    .then((value) => {
                        console.log(value);
                        Toast.show('Change password successfully !', Toast.LONG);
                        setValue('password','')
                        setValue('newpassword','')
                        setValue('renewpassword','')
                        
                        setIsChangPass(!isChangePass)

                    }
                    )
                    .catch((error) => {
                        console.log(error);
                    })
            })
            .catch((error) => {
                Toast.show('Incorrect current password !', Toast.LONG);
                console.log(error)
            });

    }


    const Righticon = (isShow: boolean, setIsShow: any, value: string) => {
        return (
            value &&
            <TouchableOpacity
                onPress={() => {
                    setIsShow(!isShow)
                }}
                style={{
                    justifyContent: 'center',
                    paddingTop: 25,
                    paddingRight: 16
                }}>
                {
                    !isShow ? <EyeIcon /> : <EyeOffIcon />
                }
            </TouchableOpacity>
        )
    }
    return (
        <View style={[styles.body, { paddingTop: 22 + insets.top }]}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                <View style={{ flexDirection: 'row', }}>
                    <TouchableOpacity style={{ marginLeft: 10 }}
                        onPress={() => { props.navigation.goBack()}}>
                        <BackIcon />
                    </TouchableOpacity>
                    <Text
                        text='Account'
                        style={styles.headerText}
                    />
                </View>
                <Text
                    onPress={isValid && isDirty ? handleChangePass : () => { console.log('Log');
                     }}
                    text={'Save'.toLocaleUpperCase()}
                    style={[styles.textSave, { color: isValid && isDirty ? '#180E19' : '#EEEEEE' }]}
                />
            </View>
            {

                !isChangePass ?
                    <View style={styles.content}>
                        <View style={{ flexDirection: 'row' }}>

                            <Text
                                text='Email'
                                style={styles.mailText}
                            />
                            <Controller
                                control={control}
                                render={({ field: { onChange, value, onBlur } }) => (
                                    <TextInput
                                        value={auth.currentUser?.email?.toString()}
                                        style={{
                                            borderBottomWidth: 1,
                                            flex: 1,
                                            borderBottomColor: '#EEEEEE',
                                            marginLeft: 20,
                                        }}
                                    />
                                )}
                                defaultValue={""}
                                name="password"
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
                                    label='Current password'
                                    placeholder='Current password'
                                    secureTextEntry={!isShowPassword}
                                    RightAccessory={() => Righticon(isShowPassword, setIsShowPassword, value)}
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
                                    label='New password'
                                    placeholder='New password'
                                    secureTextEntry={!isShowNewPassword}
                                    RightAccessory={() => Righticon(isShowNewPassword, setIsShownewPassword, value)}
                                    helper={errors?.newpassword?.message}
                                />
                            )}
                            defaultValue={""}
                            name="newpassword"
                            rules={{
                                required: "Password is required",
                                validate: handledValidateNewPass,
                            }}
                        />
                        <Controller
                            control={control}
                            render={({ field: { onChange, value, onBlur } }) => (
                                <TextField
                                    value={value}
                                    onChangeText={onChange}
                                    containerStyle={[styles.textField, { marginTop: 65 }]}
                                    style={{
                                        paddingTop: 25,
                                    }}
                                    label='Confirm new password'
                                    placeholder='Confirm new password'
                                    secureTextEntry={!isShowConfirmPassword}
                                    RightAccessory={() => Righticon(isShowConfirmPassword, setIsShowConfirmPassword, value)}
                                    helper={errors?.renewpassword?.message}
                                />
                            )}
                            defaultValue={""}
                            name="renewpassword"
                            rules={{
                                required: "Password is required",
                                validate: handledValidateReNewPass,
                            }}
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
        backgroundColor: 'white',
    },
    headerText: {
        fontWeight: '700',
        fontSize: 18,
        color: '#000000',
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
        color: '#000000',
        alignSelf: 'center'
        // marginTop : 20
    },
    textField: {
        marginLeft: 16,
        marginTop: 40
    },
    textChangePass: {
        color: '#000000',
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