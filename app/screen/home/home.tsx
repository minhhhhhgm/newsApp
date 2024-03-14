import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, Image, RefreshControl, StyleSheet, Text as TextRn, TouchableOpacity, View } from 'react-native';

import { logoLogin } from '../../utils/const';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '../../components/Text';
import BellIcon from '../../icons/svg-component/BellIcon';
import { Button } from '../../components/Button';
//@ts-ignore
import * as rssParser from 'react-native-rss-parser';
import moment from 'moment';
import { SimpleMenu, SimplePopover } from './home-screen';
import { getEmail, getInterest, removeAccessToken, setNews } from '../../utils/storage';
import { Todos } from '../../database';
import { convertUrl } from '../../utils/validate';
import Popover, { PopoverMode, PopoverPlacement } from 'react-native-popover-view';
import { i18n } from '../../i18n/i18n';
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from '../../store/counterSlice';
import { RootState } from '../../store/store';
import Toast from 'react-native-simple-toast';

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
export interface IScreen {
    navigation: any
}

const HomeScreen = (props: IScreen) => {
    const insets = useSafeAreaInsets();
    const [indexItem, setIndexItem] = useState(0)
    const [titleNews, setTitleNews] = useState('For You')
    const [dataInterests, setDataInterests] = React.useState<any[]>([])
    const [email, setEmail] = React.useState<string>('')

    const [dataRss, setDataRss] = React.useState<Article[]>([])
    const [dataRssAll, setDataRssAll] = React.useState<any>()
    const [domain, setDomain] = useState('vnexpress.net')
    const [newsName, setNewsName] = useState('VnExpress')
    const count = useSelector((state: RootState) => state.counter.value)
    const dispatch = useDispatch()

    const modalRef = useRef({
        visible: false
    });
    const getDataInterest = async () => {
        const response = await getInterest();
        const email = await getEmail()
        if (response || email) {
            setDataInterests(JSON.parse(response))
            setEmail(email)
        }
    }
    const PopoverBell = () => {
        return (
            <Popover
                animationConfig={{ duration: 0 }}
                // isVisible={modalRef.current.visible}
                onRequestClose={() => modalRef.current.visible = false}
                // mode={PopoverMode.TOOLTIP}
                verticalOffset={-30}
                popoverStyle={{
                    width: 129,
                    height: 88,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'white'
                }}
                backgroundStyle={{
                    backgroundColor: 'transparent'
                }}
                arrowSize={{
                    width: 10,
                    height: 10
                }}
                from={(
                    <TouchableOpacity
                        onPress={() => () => modalRef.current.visible = true}
                        style={{
                            paddingRight: 16,
                            justifyContent: 'center',
                        }}>
                        <BellIcon />

                    </TouchableOpacity>
                )}>
                <View
                    style={{
                        backgroundColor: 'white',
                        width: 121,
                        height: 78,
                        shadowColor: 'black',
                        shadowOffset: { width: -2, height: 4 },
                        shadowOpacity: 10,
                        shadowRadius: 30,
                        elevation: 5,
                        borderRadius: 10
                    }}
                >
                    <View>
                        <TouchableOpacity
                            onPress={() => {
                                setNewsName('VnExpress'); setDomain('vnexpress.net')
                            }}
                            style={{
                                paddingLeft: 10,
                                marginTop: 15,
                            }}>
                            <TextRn
                                style={{
                                    color: '#000000',
                                    fontSize: 12
                                }}
                            >VnExpress</TextRn>
                        </TouchableOpacity>
                        <View style={{
                            height: 1,
                            backgroundColor: '#EEEEEE',
                            width: 151,
                            marginTop: 7,
                            marginBottom: 0
                        }}>
                        </View>
                        <View>
                            <TouchableOpacity
                                onPress={() => {
                                    setNewsName('Tuổi Trẻ'); setDomain('tuoitre.vn')
                                }}
                                style={{
                                    marginTop: 10,
                                    marginLeft: 8
                                }}>
                                <TextRn
                                    style={{
                                        color: '#000000',
                                        marginLeft: 5,
                                        fontSize: 12
                                    }}
                                >Tuổi Trẻ </TextRn>
                            </TouchableOpacity>

                        </View>
                    </View>
                </View>
            </Popover>
        )
    }
    const setNewsApp = async () => {
        await setNews('VnExpress')
    }
    const getData = async () => {
        // await removeAccessToken()
        setDataRss([])
        fetch(`https://${domain}/rss/kinh-doanh.rss`)
            .then((response) => response.text())
            .then((responseData) => rssParser.parse(responseData))
            .then((rss) => {
                if (rss) {
                    console.log(rss);

                    setDataRss(rss.items)
                    setDataRssAll(rss)
                }
            });
    }
    const handleGetDataByTitle = (endpoint: string) => {
        setDataRss([])
        fetch(`https://${domain}/rss/${endpoint}.rss`)
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
    }, [domain])

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
                        onPress={() => dispatch(increment())}
                        text={newsName.toString()}
                        style={{
                            fontWeight: '700',
                            fontSize: 15,
                            color: '#180E19',
                            marginLeft: 10
                        }}
                    />
                    {/* <TextRn>{count}</TextRn> */}
                </View>
                {/* <TouchableOpacity style={{
                    paddingRight: 16,
                    justifyContent: 'center',
                }}>
                    <BellIcon />

                </TouchableOpacity> */}
                <PopoverBell />
            </View>
        )
    }

    function handleOrderMerchant() {

    }
    const handleSaveBookMark = async (item: Article, type: string) => {
        const imageUrl = convertUrl(item)
        const item1 = await Todos.get({ title: item.title });
        if (item1) {
            Toast.show('The post has been saved', Toast.LONG);
            return;
        }
        const params = {
            type: type,
            title: item.title,
            author: newsName === 'Tuổi Trẻ' ? dataRssAll.copyright : dataRssAll.description,
            time: item.published,
            image: imageUrl,
            url: item.links[0].url,
            email: email
        }
        Todos.insert(params)
        Toast.show('Saved to bookmark', Toast.LONG);

    }
    const handleNavigateDetailNews = (item: Article) => {
        const link = item.links[0].url
        const author = newsName === 'Tuổi Trẻ' ? dataRssAll.copyright : dataRssAll.description
        const time = item.published
        const imageUrl = convertUrl(item)
        const type = titleNews
        const title = item.title


        props.navigation.navigate('Detail', { link: link, author, time, imageUrl, type, title, email })
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
                    <TouchableOpacity
                        onPress={() => { handleNavigateDetailNews(item) }}
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
                    </TouchableOpacity>

                    <View
                        style={{
                            flex: 1,
                            marginLeft: 10
                        }}>
                        <TextRn
                            onPress={() => { handleNavigateDetailNews(item) }}
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
                                }}>{newsName === 'Tuổi Trẻ' ? dataRssAll.copyright : dataRssAll.description}</TextRn>
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
                            <SimplePopover item={item} saveBookMark={() => handleSaveBookMark(item, titleNews)} />

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
                                if (index != 0) {
                                    handleGetDataByTitle(item.endpoint);
                                } else {
                                    getData()
                                }

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