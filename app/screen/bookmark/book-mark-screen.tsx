import { useIsFocused, useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, FlatList, Modal, RefreshControl, ScrollView, StyleSheet, TouchableOpacity, View, Text as TextRn } from 'react-native';
import { ParamsList, auth } from '../../../App';
import { Text } from '../../components/Text';
import { Bookmark } from '../../database';
import { COLOR } from '../../utils/color';
import { dataInterest, handleSaveHistory } from '../../utils/homeAction';
import { ItemNews } from '../home/component/item-news';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import BellIcon from '../../icons/svg-component/BellIcon';
import { changeNews } from '../../store/newsSlice';
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
    const navigation = useNavigation<NavigationProps>()
    const isFocused = useIsFocused()
    const [data, setData] = useState([])
    const [indexItem, setIndexItem] = useState(0)
    const [type, setType] = useState('forYou')
    const [offset, setOffset] = React.useState({ x: 0, y: 0 });
    const [isVisible, setIsVisible] = useState(false)
    const email = useSelector((state: RootState) => state.newsReducer.mail)
    const news = useSelector((state: RootState) => state.newsReducer.newsName)
    const dispatch = useDispatch()

    console.log(news);

    const ref = useRef<TouchableOpacity>(null);

    useEffect(() => {
        getdataByType()
    }, [isFocused, news])
    const onPress = () => {
        setIsVisible(!isVisible)
        ref.current?.measureInWindow((x, y) => {
            console.log(x, y);
            setOffset({ x, y });
        })
    }

    const getdataByType = () => {
        if (email) {
            const author = news == 'tuoitre' ? 'Tuổi Trẻ' : 'VnExpress'
            const data = Bookmark.filter((item: IBookmark) => item.author === author && item.email === email).data();
            console.log(data);
            
            setData(data)
        }
    }
    const removeBookmark = (id: string, type: string, index: number) => {
        const item1 = Bookmark.get({ id: id });
        Bookmark.remove(item1)
        // setTimeout(() => {
        //     getdataByType(type)
        // }, 100);
        Bookmark.onChange(() => {
            getdataByType()
        })
    }

    const handleNavigate = async (title: string, link: string, author: string, time: string, image: string, type: string) => {
        const email = auth.currentUser?.email as string
        const now = moment()
        handleSaveHistory(type, title, author, now.toString(), link, image, email)
        navigation.navigate('Detail', { link, author, time, imageUrl: image, type, title, email })
    }


    const renderItem = ({ item, index }: { item: IBookmark, index: number }) => {
        const relativeTime = moment(item.time, 'ddd, DD MMM YYYY HH:mm:ss Z').fromNow();
        const formattedTime = moment(item.time).format('YYYY-MM-DD');
        const time = moment((new Date(item.time))).format('ddd, DD MMM YYYY HH:mm:ss Z');
        return (
            <ItemNews
                handleRemoveBookmark={() => { removeBookmark(item.id, item.type, index) }}
                isRemoveBookMark
                style={{
                    marginTop: 0
                }}
                index={index}
                handleNavigateDetailNews={() => { handleNavigate(item.title, item.url, item.author, time, item.image, item.type) }}
                imgSrc={item.image}
                title={item.title}
                relativeTime={formattedTime}
                link={item.url}
                titleNews={item.type}
                time={item.time}
                author={item.author}
            />
        )
    };
    return (
        <View style={styles.body}>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 55,
                marginHorizontal: 16
            }}>
                <Text
                    text={'bookmarked'}
                    style={styles.headerText}
                />
                <TouchableOpacity
                    ref={ref}
                    onPress={onPress}>
                    <BellIcon />
                </TouchableOpacity>
            </View>

            {
                data && <FlatList
                    style={{ marginTop: 30 }}
                    showsVerticalScrollIndicator={false}
                    refreshControl={<RefreshControl refreshing={false} onRefresh={() => { }} />}
                    data={data}
                    renderItem={renderItem}
                />
            }
            <Modal
                visible={isVisible}
                animationType='fade'
                onRequestClose={() => setIsVisible(false)}
                transparent={true}
            >
                <TouchableOpacity style={styles.main}
                    onPress={() => setIsVisible(false)}
                    activeOpacity={1}
                >
                    <View style={[styles.content, {
                        top: offset.y + 30,
                        left: offset.x + 30
                    }]}>
                        <View
                            style={[styles.viewPopOver]}>
                            <View style={{
                                justifyContent: 'center'
                            }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        dispatch(changeNews('VnExpress'))
                                    }}
                                    style={styles.btnVnE}>
                                    <TextRn style={styles.textVnE}>VnExpress</TextRn>
                                </TouchableOpacity>
                                <View style={styles.popOverLine}>
                                </View>
                                <View>
                                    <TouchableOpacity
                                        onPress={() => {
                                            dispatch(changeNews('tuoitre'))
                                        }}
                                        style={styles.btnTt}>
                                        <TextRn
                                            style={styles.textTt}
                                        >Tuổi Trẻ</TextRn>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: COLOR.backgroundColor,
    },
    headerText: {
        fontWeight: '700',
        color: COLOR.darkBlack,
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

export default BookMarkScreen;