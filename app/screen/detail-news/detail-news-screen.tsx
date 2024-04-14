import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Share from "react-native-share";
import Toast from 'react-native-simple-toast';
import WebView from 'react-native-webview';
import { ParamsList } from '../../../App';
import { Bookmark } from '../../database';
import ShareIcon from '../../icons/svg-component/ShareIcon';
import BackIcon from '../../icons/svg-component/backIcon';
import BookMarkIcon from '../../icons/svg-component/bookMarkIcon';
import { COLOR } from '../../utils/color';
import type { RouteProp } from '@react-navigation/native';
import { handleSaveBookMark } from '../../utils/homeAction';
import moment from 'moment';
type NavigationProps = NativeStackNavigationProp<ParamsList, 'Detail'>


const DetailScreen = () => {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation<NavigationProps>()
    const route = useRoute<RouteProp<ParamsList, 'Detail'>>();
    const [isSaveBookMark, setIsSaveBookMark] = useState(false)
    const { link, author, time, imageUrl, type, title, email } = route.params;
    useEffect(() => {
        handleCheckIsSave()
    }, [])

    const handleShareNews = () => {
        const options = {
            url: link,
        }
        Share.open(options)
            .then((r) => {
                console.log(r)
            })
            .catch((e) => {
                e && console.log(e)
            })
    }
    const handleCheckIsSave = async () => {
        const item1 = await Bookmark.get({ title: title, email: email });
        console.log('ITEM', item1);

        if (item1) {
            setIsSaveBookMark(!isSaveBookMark)
            return item1;
        } else {
            return null
        }
    }
    const onSave = async () => {
        
        handleSaveBookMark(type as string, title as string, author as string, time as string, link, imageUrl as string, email as string)
        setIsSaveBookMark(true)
    }
    const onRemove = async () => {
        const item1 = await Bookmark.get({ title: title });
        await Bookmark.remove(item1)
        setIsSaveBookMark(false)
        Toast.show('The post has been remove', Toast.SHORT);
    }
    const Header = () => {
        return (
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: 16,
                marginTop: 55,
                marginBottom: 10,
            }}>

                <TouchableOpacity
                    onPress={() => navigation.goBack()}>
                    <BackIcon />
                </TouchableOpacity>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={!isSaveBookMark ? onSave : onRemove}
                        style={{
                            marginRight: 15
                        }}>
                        <BookMarkIcon fill={isSaveBookMark ? COLOR.focusColor : 'none'} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={handleShareNews}>
                        <ShareIcon width={24} height={24} />
                    </TouchableOpacity>

                </View>
            </View>
        )
    }
    return (
        <View style={{
            flex: 1,
            backgroundColor: 'white'
        }}>
            <Header />
            <WebView
                startInLoadingState={true}
                renderLoading={() =>
                    <ActivityIndicator
                        style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, backgroundColor: 'transparent' }}
                        size="large" color={'blue'} />}
                source={{ uri: link }} />
        </View>
    );
};


export default DetailScreen;

function RouteProp<T, U>() {
    throw new Error('Function not implemented.');
}
