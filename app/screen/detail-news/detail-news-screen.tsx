import type { RouteProp } from '@react-navigation/native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, TouchableOpacity, View } from 'react-native';
import Share from "react-native-share";
import Toast from 'react-native-simple-toast';
import WebView from 'react-native-webview';
import { ParamsList } from '../../../App';
import { Bookmark, Viewed } from '../../database';
import ShareIcon from '../../icons/svg-component/ShareIcon';
import BackIcon from '../../icons/svg-component/backIcon';
import BookMarkIcon from '../../icons/svg-component/bookMarkIcon';
import { COLOR, COLOR_MODE } from '../../utils/color';
import { handleSaveBookMark, shareImage } from '../../utils/homeAction';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
type NavigationProps = NativeStackNavigationProp<ParamsList, 'Detail'>


const DetailScreen = () => {
    const navigation = useNavigation<NavigationProps>()
    const route = useRoute<RouteProp<ParamsList, 'Detail'>>();
    const [isSaveBookMark, setIsSaveBookMark] = useState(false)
    const { link, author, time, imageUrl, type, title, email } = route.params;
    const mode = useSelector((state: RootState) => state.newsReducer.darkMode)
    const styles = useDetailStyles(mode)

    useEffect(() => {
        const isViewed = Viewed.get({ title: title, email: email });
        if (isViewed) {
            const now = moment();
            const formattedTime = moment(now).format('YYYY-MM-DD HH:mm:ss');
            Viewed.update(isViewed, { timeWatched: formattedTime })
        }
        handleCheckIsSave()
    }, [])

    const handleCheckIsSave = async () => {
        const item = await Bookmark.get({ title: title, email: email });
        if (item) {
            setIsSaveBookMark(true)
        }
    }

    const onSave = () => {
        handleSaveBookMark(type as string, title as string, author as string, time as string, link, imageUrl as string, email as string)
        setIsSaveBookMark(true)
    }

    const onRemove = () => {
        const item = Bookmark.get({ title: title });
        const isRemove = Bookmark.remove(item)
        if (isRemove) {
            setIsSaveBookMark(false)
            // Toast.show('The post has been remove', Toast.SHORT);
        }
    }


    const Header = () => {
        const strokeColor = COLOR_MODE(!mode).backgroundColor
        const stroke = mode ? COLOR.white : null
        const saveColor = mode ? COLOR.white : COLOR.focusColor
        return (
            <View style={styles.viewHeader}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}>
                    <BackIcon stroke={strokeColor} />
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
                        <BookMarkIcon fill={isSaveBookMark ? saveColor : 'none'} stroke={stroke} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => shareImage(link)}>
                        <ShareIcon width={24} height={24} stroke={stroke} />
                    </TouchableOpacity>

                </View>
            </View>
        )
    }


    return (
        <View style={styles.body}>
            <Header />
            <WebView
                startInLoadingState={true}
                renderLoading={() =>
                    <ActivityIndicator
                        style={styles.activityIndicator}
                        size="large" color={'blue'} />}
                source={{ uri: link }} />
        </View>
    );
};


export default DetailScreen;

const useDetailStyles = (mode: boolean) => {
    const styles = StyleSheet.create({
        body: {
            flex: 1,
            backgroundColor: COLOR_MODE(mode).backgroundColor
        },
        activityIndicator: {
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            backgroundColor: 'transparent'
        },
        viewHeader: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 16,
            marginTop: 55,
            marginBottom: 10,
        }
    });
    return styles;
}

