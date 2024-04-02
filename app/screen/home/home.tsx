import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, RefreshControl, StyleSheet, Text as TextRn, TouchableOpacity, View } from 'react-native';
import { Button } from '../../components/Button';
import { defaultImage } from '../../utils/const';
import axios from 'axios';
import moment from 'moment';
import Toast from 'react-native-simple-toast';
import { useDispatch } from 'react-redux';
import { Todos } from '../../database';
import { NewsType } from '../../type/NewsType';
import { getEmail, getInterest } from '../../utils/storage';
import { extractContentInsideBrackets, extractImageUrl, extractString } from '../../utils/validate';
import { Header } from './component/header';
import { SimplePopover } from './component/popover';


export interface IScreen {
    navigation: any
}

const HomeScreen = (props: IScreen) => {
    const [indexItem, setIndexItem] = useState(0)
    const [titleNews, setTitleNews] = useState('For You')
    const [dataInterests, setDataInterests] = React.useState<any[]>([])
    const [email, setEmail] = React.useState<string>('')
    const [feedItems, setFeedItems] = useState<NewsType[]>([])
    const [domain, setDomain] = useState('vnexpress.net')
    const [newsName, setNewsName] = useState('VnExpress')
    const dispatch = useDispatch()

    useEffect(() => {
        getDataInterest()
        getData()
    }, [domain])

    const getDataInterest = async () => {
        const response = await getInterest();
        const email = await getEmail()
        if (response || email) {
            setDataInterests(JSON.parse(response))
            setEmail(email)
        }
    }
   
    const getData = async () => {
        setFeedItems([])
        try {
            const res = await axios.get(`https://${domain}/rss/the-gioi.rss`)
            const items = res.data.match(/<item>(.*?)<\/item>/gs);
            const parsedItems = items?.map((item: string) => ({
                title: extractString(item, '<title>', '</title>'),
                link: extractString(item, '<link>', '</link>'),
                description: extractString(item, '<description>', '</description>'),
                pubDate: extractString(item, '<pubDate>', '</pubDate>'),
                imageUrl: extractImageUrl(item),
            }));
            setFeedItems(parsedItems);
        } catch (error) {
            console.error('Error fetching RSS feed:', error);
        }

    }
    const handleGetDataByTitle = async (endpoint: string) => {
        setFeedItems([])
        try {
            const res = await axios.get(`https://${domain}/rss/${endpoint}.rss`)
            const items = res.data.match(/<item>(.*?)<\/item>/gs);
            const parsedItems = items?.map((item: string) => ({
                title: extractString(item, '<title>', '</title>'),
                link: extractString(item, '<link>', '</link>'),
                description: extractString(item, '<description>', '</description>'),
                pubDate: extractString(item, '<pubDate>', '</pubDate>'),
                imageUrl: extractImageUrl(item),
            }));
            setFeedItems(parsedItems);
        } catch (error) {
            console.error('Error fetching RSS feed:', error);
        }
    }
   
    function handleRefresh() {}

    const handleSaveBookMark = async (type: string, title: string, author: string, time: string, url: string, image: string) => {
        const item1 = await Todos.get({ title: title });
        if (item1) {
            Toast.show('The post has been saved', Toast.LONG);
            return;
        }
        const params = {
            type: type,
            title: title,
            author: author,
            time: time,
            image: image,
            url: url,
            email: email
        }
        Todos.insert(params)
        Toast.show('Saved to bookmark', Toast.LONG);

    }
    const handleNavigateDetailNews = (type: string, title: string, author: string, time: string, url: string, image: string) => {
        props.navigation.navigate('Detail', { link: url, author, time, imageUrl: image, type, title, email })
    }
    const handleChangeVnE = () => {
        setNewsName('VnExpress');
        setDomain('vnexpress.net')
        setIndexItem(0)
        setTitleNews('For You')
    }

    const handleChangeTt = () => {
        setNewsName('Tuổi Trẻ');
        setDomain('tuoitre.vn')
        setIndexItem(0)
        setTitleNews('For You')

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
            <View
                key={index}
                style={styles.viewItem}>
                <View
                    style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                        onPress={() => { handleNavigateDetailNews(titleNews, title, author, time, link, imgSrc) }}>
                        <Image
                            source={{ uri: imgSrc == '' ? defaultImage : imgSrc }}
                            style={styles.imageItem}
                        />
                    </TouchableOpacity>
                    <View
                        style={styles.viewContent}>
                        <TextRn
                            onPress={() => { handleNavigateDetailNews(titleNews, title, author, time, link, imgSrc) }}
                            numberOfLines={3}
                            style={styles.textTitle}
                        >{title}</TextRn>
                        <TextRn style={styles.textAuthor}>{author}</TextRn>
                        <View
                            style={styles.rowContent}>
                            <View
                                style={styles.viewRowContent}
                            >
                                <TextRn style={styles.titleNews}>{titleNews}</TextRn>
                                <TextRn style={styles.bigDot}>⬤</TextRn>
                                <TextRn numberOfLines={1}
                                    style={{
                                        flex: 0.7
                                    }}>{relativeTime}</TextRn>
                            </View>
                            <SimplePopover link={link} item={item} saveBookMark={() => handleSaveBookMark(titleNews, title, author, time, link, imgSrc)} />

                        </View>
                    </View>
                </View>
                <View style={styles.lineHorizotal}></View>
            </View>

        )
    };
    return (
        <View style={styles.body}>
            <Header
                newsName={newsName}
                onChangeVnE={handleChangeVnE}
                onChangeTt={handleChangeTt} />
            <FlatList
                style={{ minHeight: 70 }}
                horizontal
                showsHorizontalScrollIndicator={false}
                refreshControl={<RefreshControl refreshing={false} onRefresh={handleRefresh} />}
                data={dataInterests}
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
                            style={[styles.button, {
                                backgroundColor: index == indexItem ? '#180E19' : '#EEEEEE',
                                marginLeft: index === 0 ? 16 : 0,
                            }]}
                        />
                    )
                }}
            />
            <FlatList
                showsVerticalScrollIndicator={false}
                refreshControl={<RefreshControl refreshing={false} onRefresh={handleRefresh} />}
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
        marginTop: 15
    },
    imageItem: {
        width: 137,
        height: 140
    },
    viewContent: {
        flex: 1,
        marginLeft: 10
    },
    textTitle: {
        flex: 3,
        fontWeight: '700',
        fontFamily: 'SF Pro',
        color: '#180E19'
    },
    textAuthor: {
        flex: 2,
        fontWeight: '500',
        fontFamily: 'SF Pro',
        color: '#909090'
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
        color: '#69BDFD'
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
        backgroundColor: '#EEEEEE',
        marginTop: 30,
        marginBottom: 20
    }
});