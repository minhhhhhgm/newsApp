import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Share from "react-native-share";
import Toast from 'react-native-simple-toast';
import WebView from 'react-native-webview';
import { ParamsList } from '../../../App';
import { Todos } from '../../database';
import ShareIcon from '../../icons/svg-component/ShareIcon';
import BackIcon from '../../icons/svg-component/backIcon';
import BookMarkIcon from '../../icons/svg-component/bookMarkIcon';
import { COLOR } from '../../utils/color';
type NavigationProps = NativeStackNavigationProp<ParamsList, 'Detail'>

const DetailScreen = () => {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation<NavigationProps>()
    const route = useRoute();
    const [isSaveBookMark, setIsSaveBookMark] = useState(false)
    const { link, author, time, imageUrl, type, title, email } = route.params as any;

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
        const item1 = await Todos.get({ title: title });
        if (item1) {
            setIsSaveBookMark(!isSaveBookMark)
            return item1;
        } else {
            return null
        }
    }
    const handleSaveBookMark = async () => {
        const item1 = await Todos.get({ title: title });
        if (item1) {
            setIsSaveBookMark(true)
            Toast.show('The post has been saved', Toast.LONG);
            return;
        }
        const params = {
            type: type,
            title: title,
            author: author,
            time: time,
            image: imageUrl,
            url: link,
            email
        }
        Todos.insert(params)
        Toast.show('Saved to bookmark', Toast.LONG);
        console.log('Save DB OK',);
        setIsSaveBookMark(true)
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
                        onPress={handleSaveBookMark}
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
            <WebView source={{ uri: link }} />
        </View>
    );
};


export default DetailScreen;