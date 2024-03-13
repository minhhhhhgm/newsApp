import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '../../components/Text';
import { headBlackColor } from '../../utils/color';
import { logoLogin } from '../../utils/const';
import WebView from 'react-native-webview';
import { useRoute } from '@react-navigation/native';
import BackIcon from '../../icons/svg-component/backIcon';
import BookMarkIcon from '../../icons/svg-component/bookMarkIcon';
import ShareIcon from '../../icons/svg-component/ShareIcon';
import Share from "react-native-share"
import { Todos } from '../../database';

const DetailScreen = (props: any) => {
    const insets = useSafeAreaInsets();
    const route = useRoute();
    const { link, author, time, imageUrl, type, title } = route.params as any;
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
    const handleSaveBookMark = () => {
        const params = {
            type: type,
            title: title,
            author: author,
            time: time,
            image: imageUrl,
            url : link
        }
        Todos.insert(params)
        console.log('Save DB OK',);
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
                    onPress={() => props.navigation.goBack()}>
                    <BackIcon />
                </TouchableOpacity>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <TouchableOpacity
                        onPress={handleSaveBookMark}
                        style={{
                            marginRight: 15
                        }}>
                        <BookMarkIcon />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleShareNews}>
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