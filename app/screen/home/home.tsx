import React, { useEffect, useRef, useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Text } from '../../components/Text';
import { CategoryManagementModel } from '../../database';
import { changeNews, changeNewsBookmark } from '../../store/newsSlice';
import { RootState } from '../../store/store';
import { NewsType } from '../../type/NewsType';
import { COLOR } from '../../utils/color';
import { CHANGE_BOOKMARK_TUOITRE, CHANGE_BOOKMARK_VN_EXPRESS, TUOITRE, VNEXPRESS, tuoiTreDomain, vnExpressDomain } from '../../utils/const';
import { Category, getDataRssByTitle } from '../../utils/homeAction';
import { getEmailApp, getNews, setNews } from '../../utils/storage';
import { Header } from './component/header';
import NewsList from './component/news-list';
import { useHomeStyles } from './styles';
const HomeScreen = () => {
    const [titleNews, setTitleNews] = useState('forYou')
    const [feedItems, setFeedItems] = useState<NewsType[]>([])
    const [domain, setDomain] = useState('')
    const [endpoint, setEndpoint] = useState('')
    const [refresh, setRefresh] = useState(false)
    const [newsName, setNewsName] = useState('')
    const [dataCategory, setDataCategory] = useState<Category[]>([])
    const textRef = useRef<string>('')
    const dispatch = useDispatch()
    const cate = useSelector((state: RootState) => state.newsReducer.changeCategory)
    const news = useSelector((state: RootState) => state.newsReducer.newsName)
    const nameNewsChange = useSelector((state: RootState) => state.newsReducer.nameNewsChange)
    const mode = useSelector((state: RootState) => state.newsReducer.darkMode)

    const styles = useHomeStyles(mode)


    // GET CATEGORY AND NEWS DATA
    useEffect(() => {
        handleGetDataWhenCategoryChange()
    }, [cate, domain])


    // GET NEWS WHEN OPEN APP
    useEffect(() => {
        const getNewsApp = async () => {
            const newsName = await getNews()
            setNewsName(newsName)
        }
        getNewsApp()
    }, [newsName])


    // LISTEN NEWS CHANGE 
    useEffect(() => {
        const handleListenNewsChangeFromBookmark = async () => {
            if (nameNewsChange) {
                if (nameNewsChange == CHANGE_BOOKMARK_VN_EXPRESS) {
                    await handleChangeNews(vnExpressDomain, VNEXPRESS, CHANGE_BOOKMARK_VN_EXPRESS);
                } else {
                    await handleChangeNews(tuoiTreDomain, TUOITRE, CHANGE_BOOKMARK_TUOITRE);
                }
            }
        }
        handleListenNewsChangeFromBookmark()

    }, [nameNewsChange])


    const handleGetDataWhenCategoryChange = async () => {
        const mail = await getEmailApp()
        const newsName = await getNews()
        let newsData;
        let dataFilter;
        let firstItem;
        if (newsName === VNEXPRESS) {
            newsData = JSON.parse(CategoryManagementModel.get({ email: mail }).vnExpress)
        } else {
            newsData = JSON.parse(CategoryManagementModel.get({ email: mail }).tuoiTre)
        }
        dataFilter = newsData.filter((item: Category) => item.isShow)
        firstItem = dataFilter.find(() => true)
        const isExistItem = dataFilter.find((item: Category) => item.text === textRef.current)
        if (!isExistItem) {
            if (newsName == VNEXPRESS) {
                await handleGetData(firstItem.endpoint, vnExpressDomain)
                setDomain(vnExpressDomain)
            } else {
                await handleGetData(firstItem.endpoint, tuoiTreDomain)
                setDomain(tuoiTreDomain)
            }
            textRef.current = firstItem.text
            setTitleNews(firstItem.text)
            setEndpoint(firstItem.endpoint)
        }
        setDataCategory(dataFilter)
    };


    const handleGetData = async (endpoint: string, domain: string) => {
        setFeedItems([])
        try {
            const parsedItems = await getDataRssByTitle(domain, endpoint)
            setFeedItems(parsedItems);
        } catch (error) {
            console.error('Error fetching RSS feed:', error)
        }
    }


    const handleRefresh = async () => {
        await handleGetData(endpoint, domain)
    }


    const onClickVnExpress = async () => {
        if (news == VNEXPRESS) {
            return
        }
        else {
            await handleChangeNews(vnExpressDomain, VNEXPRESS, CHANGE_BOOKMARK_VN_EXPRESS);
        }
    }

    const onClickTuoiTre = async () => {
        if (news == TUOITRE)
            return
        else {
            await handleChangeNews(tuoiTreDomain, TUOITRE, CHANGE_BOOKMARK_TUOITRE);
        }
    }

    const handleChangeNews = async (domain: string, news: string, bookmarkType: string) => {
        setFeedItems([]);
        dispatch(changeNews(news));
        setNewsName(news);
        setDomain(domain);
        dispatch(changeNewsBookmark(bookmarkType))
        textRef.current = '';
        if (newsName !== news) {
            setDataCategory([]);
        }
        await setNews(news);
    }


    const onClickCategory = (title: string, endpoint: string) => {
        setTitleNews(title);
        setEndpoint(endpoint)
        textRef.current = title
        handleGetData(endpoint, domain);
    }


    return (
        <View style={styles.body} >
            <Header
                newsName={newsName}
                onChangeVnE={onClickVnExpress}
                onChangeTt={onClickTuoiTre}
            />
            <FlatList
                style={{ minHeight: 70 }}
                horizontal
                showsHorizontalScrollIndicator={false}
                data={dataCategory}
                renderItem={({ item, index }) => {
                    const isFocus = item.text == textRef.current
                    return (
                        item.isShow == true ?
                            <TouchableOpacity
                                activeOpacity={1}
                                key={index}
                                onPress={() => { onClickCategory(item.text, item.endpoint) }}
                                style={[styles.button, {
                                    backgroundColor: isFocus ? mode ? COLOR.white : COLOR.focusColor : COLOR.buttonColorInactive,
                                    marginLeft: index === 0 ? 16 : 0,
                                }]}>
                                <Text
                                    text={item.text}
                                    style={{
                                        color: isFocus ? mode ? COLOR.focusColor : COLOR.white : COLOR.authorColor
                                    }} />
                            </TouchableOpacity>
                            : null
                    )
                }}
            />
            <NewsList
                feedItems={feedItems}
                refresh={refresh}
                handleRefresh={handleRefresh}
                newsName={newsName}
                titleNews={titleNews}
                mode={mode}
            />
        </View>

    )
}
export default HomeScreen
// const styles = StyleSheet.create({
//     body: {
//         flex: 1,
//         backgroundColor: COLOR.backgroundColor,
//     },
//     headerText: {
//         fontWeight: '700',
//         fontSize: 18,
//         marginTop: 20,
//         color: COLOR.darkBlack,
//         marginLeft: 16,
//         marginBottom: 41
//     },
//     button: {
//         marginTop: 30,
//         justifyContent: 'center',
//         paddingVertical: 4,
//         paddingHorizontal: 15,
//         borderRadius: 30,
//         alignSelf: 'flex-start',
//         marginRight: 10,
//     },
//     viewItem: {
//         paddingHorizontal: 16,
//         marginTop: 15,
//     },
//     imageItem: {
//         width: 137,
//         height: 140
//     },
//     viewContent: {
//         flex: 1,
//         marginLeft: 10,
//     },
//     textTitle: {
//         flex: 3,
//         fontWeight: '700',
//         fontFamily: 'SF Pro',
//         color: COLOR.focusColor
//     },
//     textAuthor: {
//         flex: 2,
//         fontWeight: '500',
//         fontFamily: 'SF Pro',
//         color: COLOR.authorColor
//     },
//     rowContent: {
//         flexDirection: 'row',
//         paddingBottom: 5
//     },
//     viewRowContent: {
//         flex: 1,
//         flexDirection: 'row',
//     },
//     titleNews: {
//         fontWeight: '700',
//         fontFamily: 'SF Pro',
//         color: COLOR.textTypeColor
//     },
//     bigDot: {
//         fontSize: 10,
//         color: '#909090',
//         alignSelf: 'flex-start',
//         marginTop: 3,
//         marginHorizontal: 10
//     },
//     lineHorizotal: {
//         height: 1,
//         backgroundColor: COLOR.buttonColorInactive,
//         marginTop: 30,
//         marginBottom: 20
//     },
//     viewPopOver: {
//         backgroundColor: COLOR.backgroundColor,
//         width: 121,
//         height: 78,
//         shadowColor: COLOR.black,
//         shadowOffset: { width: -2, height: 4 },
//         shadowOpacity: 10,
//         shadowRadius: 30,
//         elevation: 5,
//         borderRadius: 10,
//         position: 'absolute',
//         // bottom: -25,
//         // top:245.09091186523438,
//         zIndex: 10,
//         right: 15,
//     },
//     popOverLine: {
//         height: 1,
//         backgroundColor: COLOR.buttonColorInactive,
//         marginLeft: 10,
//         marginTop: 7,
//     }
// });