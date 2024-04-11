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
type NavigationProps = NativeStackNavigationProp<ParamsList, 'BookMark'>
const BookMarkScreen = () => {

    const navigation = useNavigation<NavigationProps>()
    const isFocused = useIsFocused()
    const [data, setData] = useState([])
    const [indexItem, setIndexItem] = useState(0)
    const [type, setType] = useState('forYou')

    const getdata = async () => {
        const email = auth.currentUser?.email as string
        console.log(email);
        if (email) {
            let data = await Bookmark.filter((item: any) => item.type === 'forYou' && item.email === email).data();
            console.log('dataF', data);
            setData(data)
        }
    }
    const getdataByType = async (type: string) => {
        const email = auth.currentUser?.email as string
        if (email) {
            let data = await Bookmark.filter((item: any) => item.type === type && item.email === email).data();
            console.log('dataE', data);
            setData(data)
        }
    }
    const removeBookmark = async (id: string, type: string, index: number) => {
        const item1 = await Bookmark.get({ id: id });
        await Bookmark.remove(item1)
        setTimeout(() => {
            if (type === 'forYou') {
                getdata()
            } else {
                getdataByType(type)
            }
        }, 100);
    }

    const handleNavigate = async (title: string, link: string, author: string, time: string, image: string, type: string) => {
        const email = auth.currentUser?.email as string
        const now = moment()
        await handleSaveHistory(type, title, author, now.toString(), link, image, email)
        navigation.navigate('Detail', { link, author, time, imageUrl: image, type, title, email })
    }


    useEffect(() => {
        if (type === 'forYou') {
            getdata()
        } else {
            getdataByType(type)
        }
    }, [isFocused])


    const renderItem = ({ item, index }: { item: any, index: number }) => {
        const relativeTime = moment(item.time, 'ddd, DD MMM YYYY HH:mm:ss Z').fromNow();
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
                relativeTime={relativeTime}
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
                        dataInterest.map((item: any, index) => {
                            return (
                                <TouchableOpacity
                                    activeOpacity={1}
                                    key={index}
                                    onPress={() => {
                                        setIndexItem(index);
                                        setType(item.text)
                                        if (index != 0) {
                                            getdataByType(item.text)
                                        } if (index == 0) {
                                            getdataByType('forYou')
                                        }
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
                    ListEmptyComponent={() => {
                        return (
                            <View>
                            </View>
                        )
                    }}
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