import { useIsFocused, useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import { ParamsList, auth } from '../../../App';
import { Text } from '../../components/Text';
import { Viewed } from '../../database';
import { COLOR } from '../../utils/color';
import { ItemNews } from '../home/component/item-news';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { ItemNewsBookmark } from '../bookmark/component/item-news';
type NavigationProps = NativeStackNavigationProp<ParamsList, 'BookMark'>
interface IViewed {
    type: string,
    title: string,
    author: string,
    timeWatched: string,
    image: string,
    url: string,
    email: string
}
const ViewedScreen = () => {

    const navigation = useNavigation<NavigationProps>()
    const isFocused = useIsFocused()
    const [data, setData] = useState<IViewed[]>([])
    // const [loading, setLoading] = useState<boolean>(true)
    const email = useSelector((state: RootState) => state.newsReducer.mail)

    // console.log('loading', loading);
    
    const getdata = () => {
        // setLoading(true);
        if (email && isFocused) {
            const newData = Viewed.filter((item: IViewed) => item.email === email).data();
            newData.sort((a: { timeWatched: string }, b: { timeWatched: string }) => {
                return new Date(b.timeWatched).getTime() - new Date(a.timeWatched).getTime();
            });
            // if (newData) {
            //     setData(newData);
            //     setLoading(false);
            // }
            const isDataChanged = JSON.stringify(newData) !== JSON.stringify(data);
            if (isDataChanged) {
                console.log('isDataChanged', isDataChanged);
                // setLoading(true);
                if (newData) {
                    setData(newData);
                    const isDataChanged = JSON.stringify(newData) !== JSON.stringify(data);
                    if (isDataChanged){
                        // setLoading(false)
                    }
                }
            } else {
                // setLoading(false);
            }
        }
    };

    const handleNavigate = (title: string, link: string, author: string, time: string, image: string, type: string) => {
        navigation.navigate('Detail', { link, author, time, imageUrl: image, type, title, email })
    }

    useEffect(() => {
        getdata()
    }, [isFocused])


    const renderItem = ({ item, index }: { item: IViewed, index: number }) => {
        const formattedTime = moment(new Date(item.timeWatched)).format('YYYY-MM-DD');
        // console.log(item);

        return (
            <View key={index} style={{ marginTop: 25 }}>
                <ItemNewsBookmark
                    style={{
                        marginTop: 0
                    }}
                    index={index}
                    handleNavigateDetailNews={() => { handleNavigate(item.title, item.url, item.author, formattedTime, item.image, item.type) }}
                    imgSrc={item.image}
                    title={item.title}
                    relativeTime={formattedTime}
                    link={item.url}
                    titleNews={item.type}
                    time={formattedTime}
                    author={item.author}
                />
            </View>
        )
    };
    return (
        <View style={styles.body}>
            <View>
                <Text
                    text={'viewed'}
                    style={styles.headerText}
                />
            </View>
            {
                <FlatList
                    // ListHeaderComponent={() => {
                    //     return (
                    //         // loading ? <ActivityIndicator size={'small'} /> : null
                    //     )
                    // }}
                    showsVerticalScrollIndicator={false}
                    refreshControl={<RefreshControl refreshing={false} onRefresh={() => { }} />}
                    data={data}
                    renderItem={renderItem}
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
});

export default ViewedScreen;