import { useIsFocused, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ParamsList, auth } from '../../../App';
import { Text } from '../../components/Text';
import { addNews } from '../../store/newsSlice';
import { NewsType } from '../../type/NewsType';
import { COLOR } from '../../utils/color';
import { Category, dataInterest, getDataRss, getDataRssByTitle, handleGetCategory, handleSaveHistory } from '../../utils/homeAction';
import { extractContentInsideBrackets } from '../../utils/validate';
import { Header } from './component/header';
import { ItemNews } from './component/item-news';
import { RootState } from '../../store/store';
import { getEmailApp, getInterest } from '../../utils/storage';
type NavigationProps = NativeStackNavigationProp<ParamsList, 'BottomNavigation'>

const HomeScreen = () => {
    const navigation = useNavigation<NavigationProps>()
    const [indexItem, setIndexItem] = useState(0)
    const [titleNews, setTitleNews] = useState('forYou')
    const [feedItems, setFeedItems] = useState<NewsType[]>([])
    const [domain, setDomain] = useState('vnexpress.net')
    const [endpoint, setEndpoint] = useState('')
    const [refresh, setRefresh] = useState(false)
    const [newsName, setNewsName] = useState('VnExpress')
    const [dataCategory, setDataCategory] = useState<Category[]>([])
    const email = auth.currentUser?.email as string
    const mail = useSelector((state: RootState) => state.newsReducer.mail)
    const isFocused = useIsFocused()
    const dispatch = useDispatch()

    useEffect(() => {
        // getDataCategory()
        getData()
    }, [domain])

    // useEffect(() => {
    //     getDataCategory()
    // }, [isFocused])

    
    const getData = async () => {
        setFeedItems([])
        try {
            const parsedItems = await getDataRss(domain)
            setFeedItems(parsedItems);
            dispatch(addNews(parsedItems))
        } catch (error) {
            console.error('Error fetching RSS feed:', error);
        }
    }
    const handleGetDataByTitle = async (endpoint: string) => {
        setFeedItems([])
        try {
            const parsedItems = await getDataRssByTitle(domain, endpoint)
            setFeedItems(parsedItems);
        } catch (error) {
            console.error('Error fetching RSS feed:', error);
        }
    }
    const handleRefresh = async () => {
        if (indexItem == 0) {
            await getData()
        } else {
            await handleGetDataByTitle(endpoint)
        }
    }

    const handleNavigateDetailNews = async (type: string, title: string, author: string, time: string, url: string, image: string) => {
        const now = moment()
        const mail = auth.currentUser?.email as string
        console.log('email', mail);
        await handleSaveHistory(type, title, author, now.toString(), url, image, mail)
        navigation.navigate('Detail', { link: url, author, time, imageUrl: image, type, title, email: mail })
    }
    const handleChangeVnE = () => {
        setNewsName('VnExpress');
        setDomain('vnexpress.net')
        setIndexItem(0)
        setTitleNews('forYou')
    }

    const handleChangeTt = () => {
        setNewsName('Tuổi Trẻ');
        setDomain('tuoitre.vn')
        setIndexItem(0)
        setTitleNews('forYou')
    }

    const getDataCategory = async () => {

        const mail = await getEmailApp()
        console.log('jasdhjash', mail);
        const data = await getInterest();
        const dataFilter = data.filter((item: any) => item.email === mail);

        console.log(data, dataFilter);

        // const dataFilter = data.filter((item: any) => item.email === mail);
        // console.log('DATAs', dataFilter[0].listCategory);

        if (data) {
            setDataCategory(dataFilter[0].listCategory)

        }
    }





    const renderItem = ({ item, index }: { item: any, index: number }) => {
        const imgSrcRegex = /<img src="([^"]+)"/;
        const imgSrcMatch = item.description.match(imgSrcRegex);
        let imgSrc = '';
        if (imgSrcMatch && imgSrcMatch[1]) {
            imgSrc = imgSrcMatch[1];
        }
        const time = newsName === 'VnExpress' ? item.pubDate : extractContentInsideBrackets(item.pubDate)
        const relativeTime = moment(newsName === 'VnExpress' ? item.pubDate : extractContentInsideBrackets(item.pubDate), 'ddd, DD MMM YYYY HH:mm:ss Z').fromNow();
        const title = newsName === 'VnExpress' ? item.title : extractContentInsideBrackets(item.title)
        const link = newsName === 'VnExpress' ? item.link : extractContentInsideBrackets(item.link)
        const author = newsName === 'Tuổi Trẻ' ? 'Tuổi Trẻ' : 'VnExpress'
        return (
            <>
                <ItemNews
                    index={index}
                    handleNavigateDetailNews={() => { handleNavigateDetailNews(titleNews, title, author, time, link, imgSrc) }}
                    imgSrc={imgSrc}
                    title={title}
                    relativeTime={relativeTime}
                    link={link}
                    titleNews={titleNews}
                    time={time}
                    author={author}
                />
            </>
        )
    };
    return (
        <View style={styles.body} >
            <Header
                newsName={newsName}
                onChangeVnE={handleChangeVnE}
                onChangeTt={handleChangeTt} />
            <FlatList
                style={{ minHeight: 70 }}
                horizontal
                showsHorizontalScrollIndicator={false}
                refreshControl={<RefreshControl refreshing={false} onRefresh={handleRefresh} />}
                data={dataInterest}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity
                            activeOpacity={1}
                            key={index}
                            onPress={() => {
                                setIndexItem(index);
                                setTitleNews(item.text);
                                if (index != 0) {
                                    handleGetDataByTitle(item.endpoint);
                                    setEndpoint(item.endpoint)
                                } else {
                                    getData()
                                }
                            }}
                            style={[styles.button, {
                                backgroundColor: index == indexItem ? COLOR.focusColor : COLOR.buttonColorInactive,
                                marginLeft: index === 0 ? 16 : 0,
                            }]}>
                            <Text
                                text={item.text}
                                style={{
                                    color: index == indexItem ? COLOR.white : COLOR.authorColor
                                }} />
                        </TouchableOpacity>

                    )
                }}
                ListEmptyComponent={() => {
                    return (
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <ActivityIndicator />
                        </View>
                    )
                }}
            />
            <FlatList
                showsVerticalScrollIndicator={false}
                refreshControl={<RefreshControl refreshing={refresh} onRefresh={handleRefresh} />}
                data={feedItems}
                renderItem={renderItem}
                ListEmptyComponent={() => {
                    return (
                        <View>
                            <ActivityIndicator size={'large'} />
                        </View>
                    )
                }}
            />

        </View>

    )
}
export default HomeScreen
const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: COLOR.backgroundColor,
    },
    headerText: {
        fontWeight: '700',
        fontSize: 18,
        marginTop: 20,
        color: COLOR.darkBlack,
        marginLeft: 16,
        marginBottom: 41
    },
    button: {
        marginTop: 30,
        justifyContent: 'center',
        paddingVertical: 4,
        paddingHorizontal: 15,
        borderRadius: 30,
        alignSelf: 'flex-start',
        marginRight: 10,
    },
    viewItem: {
        paddingHorizontal: 16,
        marginTop: 15,
    },
    imageItem: {
        width: 137,
        height: 140
    },
    viewContent: {
        flex: 1,
        marginLeft: 10,
    },
    textTitle: {
        flex: 3,
        fontWeight: '700',
        fontFamily: 'SF Pro',
        color: COLOR.focusColor
    },
    textAuthor: {
        flex: 2,
        fontWeight: '500',
        fontFamily: 'SF Pro',
        color: COLOR.authorColor
    },
    rowContent: {
        flexDirection: 'row',
        paddingBottom: 5
    },
    viewRowContent: {
        flex: 1,
        flexDirection: 'row',
    },
    titleNews: {
        fontWeight: '700',
        fontFamily: 'SF Pro',
        color: COLOR.textTypeColor
    },
    bigDot: {
        fontSize: 10,
        color: '#909090',
        alignSelf: 'flex-start',
        marginTop: 3,
        marginHorizontal: 10
    },
    lineHorizotal: {
        height: 1,
        backgroundColor: COLOR.buttonColorInactive,
        marginTop: 30,
        marginBottom: 20
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
        // bottom: -25,
        // top:245.09091186523438,
        zIndex: 10,
        right: 15,
    },
    popOverLine: {
        height: 1,
        backgroundColor: COLOR.buttonColorInactive,
        marginLeft: 10,
        marginTop: 7,
    }
});