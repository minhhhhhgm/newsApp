import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ParamsList, auth } from '../../../App';
import { Text } from '../../components/Text';
import { Bookmark } from '../../database';
import { COLOR } from '../../utils/color';
import { dataInterest } from '../../utils/homeAction';
import { getEmail } from '../../utils/storage';
import { ItemNews } from '../home/component/item-news';
type NavigationProps = NativeStackNavigationProp<ParamsList, 'BookMark'>
const BookMarkScreen = () => {

    const navigation = useNavigation<NavigationProps>()
    const [data, setData] = useState([])
    const [indexItem, setIndexItem] = useState(0)

    const getdata = async () => {
        const email = auth.currentUser?.email as string
        if (email) {
            let data = await Bookmark.filter((item: any) => item.type === 'forYou'  && item.email === email).data();
            console.log('data', data);
            setData(data)
        }
    }
    const getdataByType = async (type: string) => {
        const email = await getEmail()
        if (email) {
            let data = await Bookmark.filter((item: any) => item.type === type && item.email === email).data();
            console.log('data', data);
            setData(data)
        }
    }
    const removeBookmark = async (id: string, type: string) => {
        const item1 = await Bookmark.get({ id: id });
        await Bookmark.remove(item1)
        Bookmark.onChange(() => {
            if (type ===  'forYou') {
                getdata()
            } else {
                getdataByType(type)
            }
        })
    }
    
    const handleNavigate = (title: string, link: string) => {
        navigation.navigate('Detail', { link, title })
    }

    useEffect(() => {
        getdata()
    }, [])


    const renderItem = ({ item, index }: { item: any, index: number }) => {
        const relativeTime = moment(item.time, 'ddd, DD MMM YYYY HH:mm:ss Z').fromNow();
        return (
            <ItemNews
                handleRemoveBookmark={() => { removeBookmark(item.id, item.type) }}
                isRemoveBookMark
                style={{
                    marginTop: 0
                }}
                index={index}
                handleNavigateDetailNews={() => { handleNavigate(item.title, item.url) }}
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
                                        if (index != 0) {
                                            getdataByType(item.text)
                                        } if (index == 0) {
                                            getdata()
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
    viewItem: {
        paddingHorizontal: 16,
    },
    image: {
        width: 137,
        height: 140
    },
    viewContentItem: {
        flex: 1,
        marginLeft: 10
    },
    textTitle: {
        flex: 3,
        fontWeight: '700',
        fontFamily: 'SF Pro',
        color: COLOR.buttonColorActive
    },
    textAuthor: {
        flex: 2,
        fontWeight: '500',
        fontFamily: 'SF Pro',
        color: COLOR.authorColor
    },
    viewRightContent: {
        flexDirection: 'row',
        paddingBottom: 5
    },
    rowContent: {
        flex: 1,
        flexDirection: 'row',
    },
    textType: {
        fontWeight: '700',
        fontFamily: 'SF Pro',
        color: COLOR.textTypeColor
    },
    bigDot: {
        fontSize: 10,
        color: COLOR.authorColor,
        alignSelf: 'flex-start',
        marginTop: 3,
        marginHorizontal: 10
    },
    viewPopover: {
        position: 'absolute',
        width: 200,
        height: 100,
        alignSelf: 'center',
        alignItems: 'center',
        zIndex: 10
    }
});

export default BookMarkScreen;