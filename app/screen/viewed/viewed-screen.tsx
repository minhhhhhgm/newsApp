import { useIsFocused, useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import { ParamsList } from '../../../App';
import { Text } from '../../components/Text';
import { Viewed } from '../../database';
import { RootState } from '../../store/store';
import { COLOR, COLOR_MODE } from '../../utils/color';
import { ItemNews } from '../home/component/item-news';
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
    const navigation = useNavigation<NavigationProps>();
    const isFocused = useIsFocused();
    const [data, setData] = useState<IViewed[]>([]);
    const email = useSelector((state: RootState) => state.newsReducer.mail);
    const mode = useSelector((state: RootState) => state.newsReducer.darkMode)
    const styles = useViewedStyles(mode)



    useEffect(() => {
        getdata();
    }, [isFocused]);


    const getdata = () => {
        if (email && isFocused) {
            const newData = Viewed.filter((item: IViewed) => item.email === email).data();
            newData.sort((a: { timeWatched: string }, b: { timeWatched: string }) => {
                return new Date(b.timeWatched).getTime() - new Date(a.timeWatched).getTime();
            });
            setData(newData);
        }
    }


    const handleNavigate = (item: IViewed) => {
        const formattedTime = moment(new Date(item.timeWatched)).format('YYYY-MM-DD');
        navigation.navigate('Detail',
            {
                link: item.url,
                author: item.author,
                time: formattedTime,
                imageUrl: item.image,
                type: item.type,
                title: item.title,
                email
            });
    };


    const renderItem = ({ item, index }: { item: IViewed, index: number }) => {
        const formattedTime = moment(new Date(item.timeWatched)).format('YYYY-MM-DD');
        return (
            <View key={index} style={{ marginTop: 25 }}>
                <ItemNews
                    index={index}
                    handleNavigateDetailNews={() => handleNavigate(item)}
                    imgSrc={item.image}
                    title={item.title}
                    relativeTime={formattedTime}
                    link={item.url}
                    titleNews={item.type}
                    time={formattedTime}
                    author={item.author}
                    mode={mode}
                />
            </View>
        );
    };

    return (
        <View style={styles.body}>
            <View>
                <Text text={'viewed'} style={styles.headerText} />
            </View>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={data}
                renderItem={renderItem}
            />
        </View>
    );
};


const useViewedStyles = (mode: boolean) => {
    const styles = StyleSheet.create({
        body: {
            flex: 1,
            backgroundColor: COLOR_MODE(mode).backgroundColor,
        },
        headerText: {
            fontWeight: '700',
            color: COLOR_MODE(mode).textColor,
            fontSize: 15,
            marginTop: 55,
            marginLeft: 16
        },
    });
    return styles;
}


export default ViewedScreen;