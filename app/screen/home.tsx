import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, RefreshControl, StyleSheet, Text as TextRn, TouchableOpacity, View } from 'react-native';

import { logoLogin } from '../utils/const';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '../components/Text';
import BellIcon from '../icons/svg-component/BellIcon';
import { Button } from '../components/Button';
//@ts-ignore
import * as rssParser from 'react-native-rss-parser';
import moment from 'moment';
import { SimpleMenu } from './home/home-screen';
import { getInterest } from '../utils/storage';
import { Todos } from '../database';
export interface Article {
    authors: any[];
    categories: any[];
    content?: string;
    description: string;
    enclosures: any[];
    id: string;
    itunes: {
        authors: any[];
        block?: boolean;
        duration?: number;
        explicit?: boolean;
        image?: string;
        isClosedCaptioned?: boolean;
        order?: number;
        subtitle?: string;
        summary?: string;
    };
    links: Array<{
        rel: string;
        url: string;
    }>;
    published: string;
    title: string;
}


const HomeScreen = (props: any) => {
    // const route = useRoute();
    // // const { data } = route.params as any;
    const insets = useSafeAreaInsets();
    const [indexItem, setIndexItem] = useState(0)
    const [titleNews, setTitleNews] = useState('For You')
    const [dataInterests, setDataInterests] = React.useState<any[]>([])
    const [dataRss, setDataRss] = React.useState<Article[]>([])
    const [dataRssAll, setDataRssAll] = React.useState<any>()
    const getDataInterest = async () => {
        const response = await getInterest();
        if (response) {
            setDataInterests(JSON.parse(response))
        }
    }
    const getData = () => {
        fetch('https://vnexpress.net/rss/kinh-doanh.rss')
            .then((response) => response.text())
            .then((responseData) => rssParser.parse(responseData))
            .then((rss) => {
                if (rss) {
                    setDataRss(rss.items)
                    setDataRssAll(rss)
                }
            });
    }
    const handleGetDataByTitle = (endpoint: string) => {
        setDataRss([])
        fetch(`https://vnexpress.net/rss/${endpoint}.rss`)
            .then((response) => response.text())
            .then((responseData) => rssParser.parse(responseData))
            .then((rss) => {
                if (rss) {
                    setDataRss(rss.items)
                    setDataRssAll(rss)
                }
            });
    }
    useEffect(() => {
        getDataInterest()
        getData()
    }, [])

    const Header = () => {
        return (
            <View style={{
                flexDirection: 'row',
                marginTop: 20 + insets.top,
                justifyContent: 'center',
            }}>
                <View style={{ paddingLeft: 16 }}></View>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        flex: 1
                    }}>
                    <Image
                        source={logoLogin}
                        style={{
                            width: 24,
                            height: 24
                        }}
                    />
                    <Text
                        text='new24'
                        style={{
                            fontWeight: '700',
                            fontSize: 15,
                            color: '#180E19',
                            marginLeft: 10
                        }}
                    />
                </View>
                <TouchableOpacity style={{
                    paddingRight: 16,
                    justifyContent: 'center',
                }}>
                    <BellIcon />

                </TouchableOpacity>
            </View>
        )
    }

    function handleOrderMerchant() {

    }
    const handleSaveBookMark = async () => {
        
        const params = {
            type: 'Test4',
            title: 'Test4',
            author: 'Test4',
            time: '0001'
        }
        await Todos.insert(params)
        console.log('OK');
    }
    const renderItem = ({ item, index }: { item: Article, index: number }) => {
        const imgSrcRegex = /<img src="([^"]+)"/;
        const imgSrcMatch = item.description.match(imgSrcRegex);
        let imgSrc = '';
        if (imgSrcMatch && imgSrcMatch[1]) {
            imgSrc = imgSrcMatch[1];
        }
        const relativeTime = moment(item.published, 'ddd, DD MMM YYYY HH:mm:ss Z').fromNow();
        const textContent = item.description.replace(/<\/?[^>]+(>|$)/g, "");
        return (
            <View style={{
                paddingHorizontal: 16,
                marginTop: 15
            }}>
                <View
                    style={{

                        flexDirection: 'row'
                    }}
                >
                    <Image
                        source={{
                            uri: imgSrc == '' ? 'https://th.bing.com/th/id/OIP.t0Hjn9yoQiiquA_S_a0ZfwHaEK?rs=1&pid=ImgDetMain' : imgSrc
                        }}
                        style={{
                            width: 137,
                            height: 140
                        }}
                    />
                    <View
                        style={{
                            flex: 1,
                            marginLeft: 10
                        }}>
                        <TextRn
                            numberOfLines={3}
                            style={{
                                flex: 3,
                                fontWeight: '700',
                                fontFamily: 'SF Pro',
                                color: '#180E19'
                            }}
                        >{item.title}</TextRn>
                        {
                            dataRssAll && (
                                <TextRn style={{
                                    flex: 2,
                                    fontWeight: '500',
                                    fontFamily: 'SF Pro',
                                    color: '#909090'
                                }}>{dataRssAll.description}</TextRn>
                            )
                        }
                        <View
                            style={{
                                flexDirection: 'row',
                                paddingBottom: 5
                            }}>
                            <View
                                style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                }}
                            >
                                <TextRn style={{

                                    fontWeight: '700',
                                    fontFamily: 'SF Pro',
                                    color: '#69BDFD'
                                }}>{titleNews}</TextRn>
                                <TextRn style={{
                                    fontSize: 10,
                                    color: '#909090',
                                    alignSelf: 'flex-start',
                                    marginTop: 3,
                                    marginHorizontal: 10
                                }}>⬤</TextRn>
                                <TextRn numberOfLines={1}
                                    style={{
                                        flex: 0.7
                                    }}>{relativeTime}</TextRn>
                            </View>
                            {/* <TextRn style={{
                                fontSize: 5,
                                alignSelf: 'center',
                                color: '#180E19'
                            }}>●●●</TextRn> */}
                            <View style={{
                                position: 'absolute',
                                width: 200,
                                height: 100,
                                alignSelf: 'center',
                                alignItems: 'center',
                                zIndex: 10
                            }}>
                                <SimpleMenu item={item} saveBookMark={handleSaveBookMark} />
                            </View>

                        </View>
                    </View>
                </View>
                <View style={{
                    height: 1,
                    backgroundColor: '#EEEEEE',
                    marginTop: 30,
                    marginBottom: 20
                }}></View>
            </View>

        )
    };
    return (
        // <>
        //     <View style={{
        //         height: 50,
        //         backgroundColor: 'red'
        //     }}>
        //         <Text>akjsdkasjdka</Text>
        //     </View>
        //     <WebView source={{ uri: 'https://vnexpress.net/khach-nem-xu-cau-may-vao-dong-co-may-bay-trung-quoc-4719885.html' }} />
        // </>
        <View style={styles.body}>
            <Header />

            <FlatList
                style={{ minHeight: 70 }}
                horizontal
                showsHorizontalScrollIndicator={false}
                refreshControl={<RefreshControl refreshing={false} onRefresh={handleOrderMerchant} />}
                data={dataInterests}
                ListEmptyComponent={() => {
                    return (
                        <></>
                    )
                }}
                renderItem={({ item, index }) => {
                    return (
                        <Button
                            key={index}
                            onPress={() => {
                                setIndexItem(index);
                                setTitleNews(item.text);
                                handleGetDataByTitle(item.endpoint);

                            }}
                            text={item.text}
                            textStyle={{
                                color: index == indexItem ? '#FFFFFF' : '#909090'
                            }}
                            style={{
                                marginTop: 30,
                                justifyContent: 'center',
                                paddingVertical: 4,
                                paddingHorizontal: 15,
                                backgroundColor: index == indexItem ? '#180E19' : '#EEEEEE',
                                borderRadius: 30,
                                alignSelf: 'flex-start',
                                marginRight: 10,
                                marginLeft: index === 0 ? 16 : 0,

                            }}
                        />
                    )
                }}
            />


            {
                dataRss && <FlatList
                    showsVerticalScrollIndicator={false}
                    refreshControl={<RefreshControl refreshing={false} onRefresh={handleOrderMerchant} />}
                    data={dataRss}
                    renderItem={renderItem}
                    ListEmptyComponent={() => {
                        return (
                            <View>
                                <ActivityIndicator size={'large'} />
                            </View>
                        )
                    }}

                />
            }

        </View>

    )
}
export default HomeScreen
const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: 'white',
    },
    headerText: {
        fontWeight: '700',
        fontSize: 18,
        marginTop: 20,
        color: '#000000',
        marginLeft: 16,
        marginBottom: 41
    },
    button: {
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 49,
        alignSelf: 'center',
        marginTop: 79
    }
});