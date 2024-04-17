import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Dimensions, FlatList, RefreshControl, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ParamsList, auth } from '../../../App';
import { Text } from '../../components/Text';
import { CategoryManagementModel } from '../../database';
import { changeNews, setVnExpress } from '../../store/newsSlice';
import { RootState } from '../../store/store';
import { NewsType } from '../../type/NewsType';
import { COLOR } from '../../utils/color';
import { Category, getDataRssByTitle, handleSaveHistory } from '../../utils/homeAction';
import { getEmailApp, getNews, setNews } from '../../utils/storage';
import { extractContentTuoiTre } from '../../utils/validate';
import { Header } from './component/header';
import { ItemNews } from './component/item-news';
const { width } = Dimensions.get('window')
type NavigationProps = NativeStackNavigationProp<ParamsList, 'BottomNavigation'>
const HomeScreen = () => {


    const navigation = useNavigation<NavigationProps>()
    const [indexItem, setIndexItem] = useState(0)
    const [titleNews, setTitleNews] = useState('forYou')
    const [feedItems, setFeedItems] = useState<NewsType[]>([])
    const [domain, setDomain] = useState('')
    const [endpoint, setEndpoint] = useState('')
    const [refresh, setRefresh] = useState(false)
    const [newsName, setNewsName] = useState('')
    const [dataCategory, setDataCategory] = useState<Category[]>([])
    const dispatch = useDispatch()
    const cate = useSelector((state: RootState) => state.newsReducer.changeCategory)
    const textRef = useRef<string>('')
    const news = useSelector((state: RootState) => state.newsReducer.newsName)
    const domainA = useSelector((state: RootState) => state.newsReducer.domain)
    // useEffect(() => {
    //     getDataCategory()
    // }, [domain])
    useEffect(() => {
        handleGetDataWhenCategoryChange()
    }, [cate, domain])
    useEffect(() => {
        console.log('RUn', news);
        if (news) {
            if (news == 'VnExpress') {
                handleChangeVnE()
            } else {
                handleChangeTt()
            }
        }

    }, [news])
    useEffect(() => {
        getNewsApp()
    }, [newsName])
    const getNewsApp = async () => {
        const newsName = await getNews()
        console.log('NEWSSSSS', newsName);

        setNewsName(newsName)
    }
    const handleGetDataWhenCategoryChange = async () => {
        const mail = await getEmailApp();
        const newsName = await getNews()
        console.log('newsName', newsName);

        let newsData;
        let dataFilter;
        let firstItem;
        if (newsName === 'VnExpress') {

            newsData = JSON.parse(CategoryManagementModel.get({ email: mail }).vnExpress);
            console.log('VnExpress Data', newsData);
        } else {

            newsData = JSON.parse(CategoryManagementModel.get({ email: mail }).tuoiTre);
            console.log('TT Data', newsData);
        }
        dataFilter = newsData.filter((item: Category) => item.isShow);
        firstItem = dataFilter.find(() => true);
        const isExistItem = dataFilter.find((item: Category) => item.text === textRef.current);
        if (isExistItem === undefined) {
            if (newsName == 'VnExpress') {
                await handleGetDataByTitle(firstItem.endpoint, 'vnexpress.net');
                textRef.current = firstItem.text;
                setIndexItem(0);
                setTitleNews(firstItem.text);
                setDomain('vnexpress.net')
                setEndpoint(firstItem.endpoint)
            } else {
                await handleGetDataByTitle(firstItem.endpoint, 'tuoitre.vn');
                textRef.current = firstItem.text;
                setIndexItem(0);
                setTitleNews(firstItem.text);
                setDomain('tuoitre.vn')
                setEndpoint(firstItem.endpoint)
            }

        }
        setDataCategory(dataFilter);
    };

    const handleGetDataByTitleTest = async (endpoint: string) => {
        setFeedItems([])
        try {
            const parsedItems = await getDataRssByTitle(domain, endpoint)
            setFeedItems(parsedItems);
        } catch (error) {
            console.error('Error fetching RSS feed:', error);
        }
    }
    const handleGetDataByTitle = async (endpoint: string, domain: string) => {
        setFeedItems([])
        try {
            const parsedItems = await getDataRssByTitle(domain, endpoint)
            setFeedItems(parsedItems);
        } catch (error) {
            console.error('Error fetching RSS feed:', error);
        }
    }
    const handleRefresh = async () => {
        await handleGetDataByTitle(endpoint, domain)
    }

    const handleNavigateDetailNews = async (type: string, title: string, author: string, time: string, url: string, image: string) => {
        const now = moment();
        const formattedTime = moment(now).format('YYYY-MM-DD HH:mm:ss');
        const mail = auth.currentUser?.email as string
        handleSaveHistory(type, title, author, formattedTime, url, image, mail)
        navigation.navigate('Detail', { link: url, author, time: formattedTime, imageUrl: image, type, title, email: mail })
    }
    const handleChangeVnE = async () => {
        // setDataCategory([])
        console.log(news);
        if (news == 'VnExpress')
            return
        else
            setNewsName('VnExpress')
        setDomain('vnexpress.net')
        setIndexItem(0)
        setTitleNews('forYou')
        dispatch(changeNews('VnExpress'))
        !(newsName == 'VnExpress') ? textRef.current = '' : null
        !(newsName == 'VnExpress') ? setDataCategory([]) : null
        await setNews('VnExpress')
        // setDataCategory([])
    }

    const handleChangeTt = async () => {
        console.log(news);
        if (news == 'tuoitre')
            return
        else
            setNewsName('Tuổi Trẻ');
        setDomain('tuoitre.vn')
        setIndexItem(0)
        setTitleNews('forYou')
        dispatch(changeNews('tuoitre'))
        textRef.current = ''
        newsName == 'Tuổi Trẻ' ? textRef.current = '' : null
        newsName == 'Tuổi Trẻ' ? null : setDataCategory([])
        await setNews('Tuổi Trẻ')
    }

    const renderItem = ({ item, index }: { item: NewsType, index: number }) => {
        const imgSrcRegex = /<img src="([^"]+)"/;
        const imgSrcMatch = item.description.match(imgSrcRegex);
        let imgSrc = '';
        if (imgSrcMatch && imgSrcMatch[1]) {
            imgSrc = imgSrcMatch[1];
        }
        const time = newsName === 'VnExpress' ? item.pubDate : extractContentTuoiTre(item.pubDate)
        const relativeTime = moment(newsName === 'VnExpress' ? item.pubDate : extractContentTuoiTre(item.pubDate), 'ddd, DD MMM YYYY HH:mm:ss Z').fromNow();
        const title = newsName === 'VnExpress' ? item.title : extractContentTuoiTre(item.title)
        const link = newsName === 'VnExpress' ? item.link : extractContentTuoiTre(item.link)
        const author = newsName === 'Tuổi Trẻ' ? 'Tuổi Trẻ' : 'VnExpress'
        return (
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
        )
    };
    return (
        <View style={styles.body} >
            <Header
                newsName={newsName}
                onChangeVnE={handleChangeVnE}
                onChangeTt={handleChangeTt} />
            {
                dataCategory &&
                <FlatList
                    style={{ minHeight: 70 }}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    refreshControl={<RefreshControl refreshing={false} onRefresh={handleRefresh} />}
                    data={dataCategory}
                    renderItem={({ item, index }) => {
                        return (

                            item.isShow == 1 || item.isShow == true ?
                                <TouchableOpacity
                                    activeOpacity={1}
                                    key={index}
                                    onPress={() => {
                                        setIndexItem(index);
                                        setTitleNews(item.text);
                                        handleGetDataByTitle(item.endpoint, domain);
                                        setEndpoint(item.endpoint)
                                        textRef.current = item.text
                                    }}
                                    style={[styles.button, {
                                        backgroundColor: item.text == textRef.current ? COLOR.focusColor : COLOR.buttonColorInactive,
                                        marginLeft: index === 0 ? 16 : 0,
                                    }]}>
                                    <Text
                                        text={item.text}
                                        style={{
                                            color: item.text == textRef.current ? COLOR.white : COLOR.authorColor
                                        }} />
                                </TouchableOpacity>
                                : null

                        )
                    }}
                    ListEmptyComponent={() => {
                        return (
                            <View style={{ alignSelf: 'center', width: width }}>
                                {/* <ActivityIndicator /> */}
                            </View>
                        )
                    }}
                />
            }
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