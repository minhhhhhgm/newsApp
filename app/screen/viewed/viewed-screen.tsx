import { useIsFocused, useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import { ParamsList, auth } from '../../../App';
import { Text } from '../../components/Text';
import { Viewed } from '../../database';
import { COLOR } from '../../utils/color';
import { ItemNews } from '../home/component/item-news';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
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
    const [data, setData] = useState([])
    // const email = auth.currentUser?.email as string
    const email = useSelector((state: RootState) => state.newsReducer.mail)

    console.log('email', email);

    const getdata = () => {
        if (email) {
            const data = Viewed.filter((item: IViewed) => item.email === email).data();
            setData(data.reverse())
        }
    }

    const removeBookmark = async (id: string) => {
        const item1 = await Viewed.get({ id: id });
        await Viewed.remove(item1)
        Viewed.onChange(() => {
            console.log('DATA CHANGE');
            getdata()
        })
    }

    const handleNavigate = (title: string, link: string, author: string, time: string, image: string, type: string) => {
        navigation.navigate('Detail', { link, author, time, imageUrl: image, type, title, email })
    }

    useEffect(() => {
        getdata()
    }, [isFocused])


    const renderItem = ({ item, index }: { item: IViewed, index: number }) => {
        const formattedTime = moment(new Date(item.timeWatched)).format('YYYY-MM-DD');
        const time = moment((new Date(item.timeWatched))).format('ddd, DD MMM YYYY HH:mm:ss Z');
        const relativeTime = moment(formattedTime, 'YYYY-MM-DD').fromNow()
        console.log(item.timeWatched);
        
        return (
            <View style={{ marginTop: 25 }}>
                <ItemNews
                    // handleRemoveBookmark={() => { removeBookmark(item.id) }}
                    // isRemoveBookMark
                    style={{
                        marginTop: 0
                    }}
                    index={index}
                    handleNavigateDetailNews={() => { handleNavigate(item.title, item.url, item.author, time, item.image, item.type) }}
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
                data && <FlatList
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