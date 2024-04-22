import { useIsFocused, useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, FlatList, Modal, RefreshControl, StyleSheet, Text as TextRn, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ParamsList } from '../../../App';
import { Text } from '../../components/Text';
import { Bookmark } from '../../database';
import BellIcon from '../../icons/svg-component/BellIcon';
import { changeNews, changeNewsBookmark } from '../../store/newsSlice';
import { RootState } from '../../store/store';
import { COLOR, COLOR_MODE } from '../../utils/color';
import { CHANGE_BOOKMARK_TUOITRE, CHANGE_BOOKMARK_VN_EXPRESS, TUOITRE, VNEXPRESS } from '../../utils/const';
import { handleSaveHistory } from '../../utils/homeAction';
import { ItemNews } from '../home/component/item-news';
import DialogChangeNews from './component/dialog-change-news';
const { width, height } = Dimensions.get('screen');

type NavigationProps = NativeStackNavigationProp<ParamsList, 'BookMark'>
interface IBookmark {
    type: string,
    title: string,
    author: string,
    time: string,
    image: string,
    url: string,
    email: string,
    id: string
}

const BookMarkScreen = () => {
    const navigation = useNavigation<NavigationProps>();
    const isFocused = useIsFocused();
    const [data, setData] = useState<IBookmark[]>([]);
    const [type, setType] = useState('')
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [isVisible, setIsVisible] = useState(false);
    const email = useSelector((state: RootState) => state.newsReducer.mail);
    const news = useSelector((state: RootState) => state.newsReducer.newsName);
    const bookmarkChange = useSelector((state: RootState) => state.newsReducer.bookmark);
    const mode = useSelector((state: RootState) => state.newsReducer.darkMode)
    const dispatch = useDispatch();
    const ref = useRef<TouchableOpacity>(null);
    const styles = useBookmarkStyles(mode)

    useEffect(() => {
        getBookmarkData();
    }, [isFocused, type, news, bookmarkChange]);

    const onPress = () => {
        setIsVisible(!isVisible)
        ref.current?.measureInWindow((x, y) => {
            setOffset({ x, y });
        });
    };

    const getBookmarkData = () => {
        if (email) {
            const author = news === TUOITRE ? TUOITRE : VNEXPRESS;
            const data = Bookmark.filter((item: IBookmark) => item.author === author && item.email === email).data();
            setData(data);
        }
    };

    const removeBookmark = (id: string) => {
        const item = Bookmark.get({ id });
        Bookmark.remove(item);
        Bookmark.onRemove(() => {
            getBookmarkData();
        });
    };


    const handleNavigate = async (item: IBookmark) => {
        const formattedTime = moment(item.time).format('YYYY-MM-DD');
        const { title, url, author, image, type } = item;
        const now = moment();
        handleSaveHistory(type, title, author, now.toString(), url, image, email as string);
        navigation.navigate('Detail', { link: url, author, time: formattedTime, imageUrl: image, type, title, email });
    };


    const handleChangeNews = (selectedNews: string, bookmarkType: string) => {
        if (news === selectedNews) {
            setIsVisible(false);
            return
        }
        setIsVisible(false);
        dispatch(changeNewsBookmark(bookmarkType));
        dispatch(changeNews(selectedNews));
        setType(selectedNews);
    };

    const renderItem = ({ item, index }: { item: IBookmark; index: number }) => {
        const formattedTime = moment(item.time).format('YYYY-MM-DD');
        return (
            <ItemNews
                onRemove={() => removeBookmark(item.id)}
                index={index}
                handleNavigateDetailNews={() => handleNavigate(item)}
                imgSrc={item.image}
                title={item.title}
                relativeTime={formattedTime}
                link={item.url}
                titleNews={item.type}
                time={item.time}
                author={item.author}
                mode={mode}
            />
        );
    };



    return (
        <View style={styles.body}>
            <View style={styles.headerContainer}>
                <Text text={'bookmarked'} style={styles.headerText} />
                <TouchableOpacity ref={ref} onPress={onPress}>
                    <BellIcon darkMode={mode} />
                </TouchableOpacity>
            </View>
            {data && (
                <FlatList
                    style={{ marginTop: 30 }}
                    showsVerticalScrollIndicator={false}
                    refreshControl={<RefreshControl refreshing={false} onRefresh={() => { }} />}
                    data={data}
                    renderItem={renderItem}
                />
            )}
            <Modal visible={isVisible} animationType='fade' onRequestClose={() => setIsVisible(false)} transparent={true}>

                <DialogChangeNews
                    left={offset.x + 30}
                    top={offset.y + 30}
                    onPressOut={() => setIsVisible(false)}
                    news={news}
                    onPressTuoiTre={() => handleChangeNews(TUOITRE, CHANGE_BOOKMARK_TUOITRE)}
                    onPressVnExpress={() => handleChangeNews(VNEXPRESS, CHANGE_BOOKMARK_VN_EXPRESS)}
                />

            </Modal>
        </View>
    );
};


const useBookmarkStyles = (mode: boolean) => {
    const styles = StyleSheet.create({
        body: {
            flex: 1,
            backgroundColor: COLOR_MODE(mode).backgroundColor,
        },
        headerContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 55,
            marginHorizontal: 16
        },
        headerText: {
            fontWeight: '700',
            color: COLOR_MODE(mode).textColor,
            fontSize: 15,

        },
        buttonCategory: {
            marginTop: 30,
            justifyContent: 'center',
            paddingVertical: 4,
            paddingHorizontal: 15,
            borderRadius: 30,
            alignSelf: 'flex-start',
            marginRight: 10,
            marginBottom: 20
        }, main: {
            backgroundColor: 'transparent',
            width: width,
            height: height,
            flex: 1
        },
        content: {
            position: 'absolute',
            bottom: 22,
            alignSelf: 'center',
        },
        btnVnE: {
            flexDirection: 'row',
            paddingLeft: 10,
            marginTop: 15,
        },
        textVnE: {
            color: COLOR.focusColor,
            marginLeft: 5,
            fontSize: 12
        },
        btnTt: {
            flexDirection: 'row',
            marginTop: 10,
            marginLeft: 8,
        },
        textTt: {
            flex: 1,
            color: COLOR.focusColor,
            marginLeft: 5,
            fontSize: 12,
            alignSelf: 'center',
        },
        popOverLine: {
            height: 1,
            backgroundColor: COLOR.buttonColorInactive,
            marginTop: 7,
        },
        viewPopOver: {
            backgroundColor: COLOR.backgroundColor,
            width: 121,
            height: 78,
            shadowColor: COLOR.black,
            shadowOffset: { width: -2, height: 4 },
            shadowOpacity: 10,
            shadowRadius: 30,
            elevation: 5,
            borderRadius: 10,
            position: 'absolute',
            zIndex: 10,
            right: 15,
        },
    });
    return styles;
}


export default BookMarkScreen;