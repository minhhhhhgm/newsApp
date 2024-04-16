import { useIsFocused, useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ParamsList, auth } from '../../../App';
import { Text } from '../../components/Text';
import { Bookmark } from '../../database';
import { COLOR } from '../../utils/color';
import { dataInterest, handleSaveHistory } from '../../utils/homeAction';
import { ItemNews } from '../home/component/item-news';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
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
    const email = useSelector((state: RootState) => state.newsReducer.mail)

    useEffect(() => {
        getdataByType(type)
    }, [isFocused])


    const getdataByType = (type: string) => {
        if (email) {
            let data = Bookmark.filter((item: IBookmark) => item.type === type && item.email === email).data();
            setData(data)
        }
    }
    const removeBookmark = (id: string, type: string, index: number) => {
        const item1 = Bookmark.get({ id: id });
        Bookmark.remove(item1)
        // setTimeout(() => {
        //     getdataByType(type)
        // }, 100);
        Bookmark.onChange(()=>{
            getdataByType(type)
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
            <View>
                <Text
                    text={'bookmarked'}
                    style={styles.headerText}
                />
            </View>
            <View style={{ height: 90 }}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {
                        dataInterest.map((item, index) => {
                            return (
                                <TouchableOpacity
                                    activeOpacity={1}
                                    key={index}
                                    onPress={() => {
                                        setIndexItem(index);
                                        setType(item.text)
                                        getdataByType(item.text)
                                    }}
                                    style={[styles.buttonCategory, {
                                        backgroundColor: index == indexItem ? COLOR.focusColor : COLOR.buttonColorInactive,
                                        marginLeft: index === 0 ? 16 : 0,
                                    }]}
                                >
                                    <Text
                                        text={item.text}
                                        style={{
                                            color: index == indexItem ? COLOR.white : COLOR.authorColor
                                        }}
                                    />
                                </TouchableOpacity>
                            )
                        })
                    }
                </ScrollView>
            </View>
            {
                data && <FlatList
                    showsVerticalScrollIndicator={false}
                    refreshControl={<RefreshControl refreshing={false} onRefresh={() => { }} />}
                    data={data}
                    renderItem={renderItem}
                />
            }
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
        marginTop: 55,
        marginLeft: 16
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
    },

});

export default BookMarkScreen;