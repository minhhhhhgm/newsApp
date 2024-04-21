import React from 'react';
import { ActivityIndicator, FlatList, RefreshControl, View } from 'react-native';
import { NewsType } from '../../../type/NewsType';
import { RegexImage, TUOITRE, VNEXPRESS } from '../../../utils/const';
import moment from 'moment';
import { extractContentTuoiTre } from '../../../utils/validate';
import { ItemNews } from './item-news';
import { ParamsList, auth } from '../../../../App';
import { handleSaveHistory } from '../../../utils/homeAction';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
type NavigationProps = NativeStackNavigationProp<ParamsList, 'BottomNavigation'>

interface INewsList {
    feedItems: NewsType[]
    refresh: boolean
    handleRefresh: () => Promise<void>
    newsName: string
    titleNews: string
    mode :boolean
}



const NewsList = (props: INewsList) => {

    const { feedItems, refresh, handleRefresh, titleNews, newsName, mode } = props
    const navigation = useNavigation<NavigationProps>()



    const handleNavigateDetailNews = async (type: string, title: string, author: string, time: string, url: string, image: string) => {
        const now = moment()
        const formattedTime = moment(now).format('YYYY-MM-DD HH:mm:ss')
        const mail = auth.currentUser?.email as string
        handleSaveHistory(type, title, author, formattedTime, url, image, mail)
        navigation.navigate('Detail', { link: url, author, time: formattedTime, imageUrl: image, type, title, email: mail })
    }



    const renderItem = ({ item, index }: { item: NewsType, index: number }) => {
        const imgSrcRegex = RegexImage;
        const imgSrcMatch = item.description.match(imgSrcRegex);
        let imgSrc = '';
        if (imgSrcMatch && imgSrcMatch[1]) {
            imgSrc = imgSrcMatch[1];
        }
        const time = newsName === VNEXPRESS ? item.pubDate : extractContentTuoiTre(item.pubDate)
        const relativeTime = moment(newsName === VNEXPRESS ? item.pubDate : extractContentTuoiTre(item.pubDate), 'ddd, DD MMM YYYY HH:mm:ss Z').fromNow();
        const title = newsName === VNEXPRESS ? item.title : extractContentTuoiTre(item.title)
        const link = newsName === VNEXPRESS ? item.link : extractContentTuoiTre(item.link)
        const author = newsName === TUOITRE ? TUOITRE : VNEXPRESS
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
                mode={mode}
            />
        )
    }


    return (
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
    )
}

export default NewsList