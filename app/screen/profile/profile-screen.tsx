import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { User, updateProfile } from 'firebase/auth';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import React from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ParamsList, auth } from '../../../App';
import { Text } from '../../components/Text';
import { storage } from '../../firebase/config';
import BackIcon from '../../icons/svg-component/backIcon';
import { COLOR } from '../../utils/color';
type NavigationProps = NativeStackNavigationProp<ParamsList, 'Profile'>


const ProfileScreen = () => {
    const navigation = useNavigation<NavigationProps>()
    const insets = useSafeAreaInsets();
    console.log(auth.currentUser);
    
    const handleChangePass = async () => {
        console.log('asjdi');
        const metadata = {
            contentType: 'image/jpeg'
        };
        const storageRef = ref(storage, 'images/' + Date.now());
        const uri = 'https://blog.logrocket.com/wp-content/uploads/2021/08/deep-dive-react-native-flatlist-1.png';
        try {
            const response = await fetch(uri);
            const blob = await response.blob();
            const uploadTask = uploadBytesResumable(storageRef, blob, metadata);
            uploadTask.on('state_changed',
                (snapshot) => {
                    console.log(snapshot);
                },
                (error) => {
                    console.log(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        console.log('File available at', downloadURL);
                        const update = {
                            photoURL: downloadURL,
                        };
                        await updateProfile(auth.currentUser as User, update);
                    });
                }
            );

        } catch (error) {
            console.error('Error uploading image:', error);
        }
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
                    onPress={handleChangePass}
                    activeOpacity={1}>
                    <Text

                        text={'SAVE'}
                        style={[styles.textSave, { color: COLOR.buttonColorActive }]}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.content}>
                <View style={{ flexDirection: 'row' }}>
                    <Text
                        text='Email'
                        style={styles.mailText}
                    />
                    <TextInput
                        value={auth.currentUser?.email}
                        style={{
                            borderBottomWidth: 1,
                            flex: 1,
                            borderBottomColor: '#EEEEEE',
                            marginLeft: 20,
                        }}
                    />
                </View>
            </View>
        </View>
    )
}
export default ProfileScreen

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