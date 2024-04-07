import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, RefreshControl, ScrollView, StyleSheet, Text as TextRn, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ParamsList } from '../../../App';
import { Text } from '../../components/Text';
import { Todos } from '../../database';
import { COLOR } from '../../utils/color';
import { getEmail, getInterest } from '../../utils/storage';
import { SimpleMenu } from '../home/component/popover';
import { dataInterest } from '../../utils/homeAction';
type NavigationProps = NativeStackNavigationProp<ParamsList, 'BookMark'>
const BookMarkScreen = () => {

    const insets = useSafeAreaInsets();
    const navigation = useNavigation<NavigationProps>()
    const [data, setData] = useState([])
    const [countDelete, setCountDelete] = useState(0)
    // const [dataInterests, setDataInterests] = React.useState<any[]>([])
    const [indexItem, setIndexItem] = useState(0)
    const getDataInterest = async () => {
        const response = await getInterest();
        if (response) {
            // setDataInterests(JSON.parse(response))
        }
    }
    const getdata = async () => {
        const email = await getEmail()
        if (email) {
            let todos = await Todos.filter((item: any) => item.type === 'For You' && item.email === email).data();
            console.log('tode', todos);
            setData(todos)
        }
    }
    const getdataByType = async (type: string) => {
        const email = await getEmail()
        if (email) {
            let todos = await Todos.filter((item: any) => item.type === type && item.email === email).data();
            console.log('tode', todos);
            setData(todos)
        }
    }
    function delayTime() {
        return new Promise<void>((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, 100);
        });
    }
    const testDb = async (id: string, type: string) => {
        const item1 = await Todos.get({ id: id });
        await Todos.remove(item1)
        const todos = await Todos.data();
        // setData(todos)
        delayTime().then(() => {
            if (type === 'For You') {
                getdata()
            } else {
                getdataByType(type)
            }
        }).catch((error) => {
            console.error("Đã xảy ra lỗi:", error);
        });
    }
    const handleNavigate = (title: string, link: string) => {
        navigation.navigate('Detail', { link, title })
    }

    useEffect(() => {
        getdata()
        getDataInterest()
        // testDb()
    }, [])
    // useEffect(() => {
    // }, [countDelete])

    const renderItem = ({ item, index }: { item: any, index: number }) => {
        const relativeTime = moment(item.time, 'ddd, DD MMM YYYY HH:mm:ss Z').fromNow();
        return (
            <TouchableOpacity
                activeOpacity={1}
                onPress={() => handleNavigate(item.title, item.url)}
                style={styles.viewItem} key={index}>
                <View
                    style={{ flexDirection: 'row' }}>
                    <Image
                        source={{ uri: item.image }}
                        style={styles.image}
                    />
                    <View style={styles.viewContentItem}>
                        <TextRn
                            numberOfLines={3}
                            style={styles.textTitle}
                        >{item.title}</TextRn>
                        <TextRn style={styles.textAuthor}>{item.author}</TextRn>
                        <View style={styles.viewRightContent}>
                            <View style={styles.rowContent}>
                                <TextRn style={styles.textType}>{item.type}</TextRn>
                                <TextRn style={styles.bigDot}>⬤</TextRn>
                                <TextRn numberOfLines={1}
                                    style={{
                                        flex: 0.7
                                    }}>{relativeTime}</TextRn>
                            </View>
                            <View style={styles.viewPopover}>
                                <SimpleMenu
                                    isShareBookMark={true}
                                    isRemoveBookmark
                                    item={item}
                                    saveBookMark={() => { testDb(item.id, item.type) }}
                                />
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{
                    height: 1,
                    backgroundColor: COLOR.buttonColorInactive,
                    marginTop: 30,
                    marginBottom: 20
                }}></View>
            </TouchableOpacity>
        )
    };
    return (
        <View style={styles.body}>
            <View>
                <Text
                    text='Bookmarked'
                    style={styles.headerText}
                />
            </View>
            {
                data && <FlatList
                    showsVerticalScrollIndicator={false}
                    refreshControl={<RefreshControl refreshing={false} onRefresh={() => { }} />}
                    data={data}
                    extraData={data}
                    ListHeaderComponent={() => {
                        return (
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
                                                        getdataByType(item.text)
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
                        )
                    }}
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
        marginTop: 15
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