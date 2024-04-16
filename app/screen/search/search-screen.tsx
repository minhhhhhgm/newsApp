import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, RefreshControl, StyleSheet, Text as TextRn, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ParamsList } from '../../../App';
import { TextField } from '../../components/TextField';
import Loading from '../../components/loading';
import SearchNewsIcons from '../../icons/svg-component/SearchNewsIcon';
import CancelIcon from '../../icons/svg-component/cancelcon';
import { Article } from '../../type/NewsType';
import { extractContentTuoiTre, extractImageUrl, extractString, searchData } from '../../utils/validate';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
// import { SimpleMenu } from '../home/component/popover';

type NavigationProps = NativeStackNavigationProp<ParamsList, 'Search'>

const SearchScreen = () => {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation<NavigationProps>()
    const [dataRss, setDataRss] = React.useState<Article[]>([])
    const [dataRssFilter, setDataRssFilter] = React.useState<Article[]>([])
    const [dataRssAll, setDataRssAll] = React.useState<any>()
    const [search, setSearch] = useState('')
    const data = useSelector((state: RootState) => state.newsReducer.data)
    console.log('data', data);
    // console.log('naksdnasss', extractContentInsideBrackets('<![CDATA[https://tuoitre.vn/chay-no-lon-kho-dan-o-ngoai-o-thu-do-indonesia-20240330224612123.htm]]>'));

    // const data = [1, 2, 4, 5, 6, 7, 78, 64, 45, 22, 55, 662, 243, 4343, 124, 234, 53, 54, 345, 3453, 65, 2]
    // const APP_NAME = process.env.APP_NAME;
    console.log(process.env.apiKey);

    const fetchRSSFeed = async () => {
        try {
            const res = await axios.get('https://tuoitre.vn/rss/the-gioi.rss')
            //   const response = await fetch('https://vnexpress.net/rss/the-gioi.rss');
            //   const text = await response.text();
            const items = res.data.match(/<item>(.*?)<\/item>/gs);
            const parsedItems = items?.map((item: string) => ({
                title: extractString(item, '<title>', '</title>'),
                link: extractString(item, '<link>', '</link>'),
                description: extractString(item, '<description>', '</description>'),
                pubDate: extractString(item, '<pubDate>', '</pubDate>'),
                imageUrl: extractImageUrl(item),
            }));
            console.log('data - ', extractContentTuoiTre(parsedItems[0].title));

            //   setFeedItems(parsedItems);
        } catch (error) {
            console.error('Error fetching RSS feed:', error);
        }
    };



    const getData = async () => {
        // const res = await axios.get('https://vnexpress.net/rss/the-gioi.rss')
        // console.log('ress', res.data.channel);



        // await fetch('https://vnexpress.net/rss/tin-moi-nhat.rss')
        //     .then((response) => response.text())
        //     .then((responseData) => console.log(responseData)
        //     )
        //     // .then((rss) => {
        //     //     if (rss) {
        //     //         setDataRss(rss.items)
        //     //         setDataRssAll(rss)

        //     //     }
        //     // });
        // await fetch('https://vnexpress.net/rss/kinh-doanh.rss')
        //     .then((response) => response.text())
        //     .then((responseData) => rssParser.parse(responseData))
        //     .then((rss) => {
        //         if (rss) {
        //             // console.log(rss.items);

        //             setDataRss(prev => [...prev, ...rss.items])
        //             setDataRssAll((prev: any) => ({
        //                 ...prev,
        //                 ...rss
        //             }));
        //         }
        //     });
    }
    useEffect(() => {
        getData()
        fetchRSSFeed()
    }, [])

    const _onChangeText = (text: string) => {
        // console.log(dataRss);

        const arrFilter = searchData(data, text)
        text !== "" ? setDataRssFilter(arrFilter) : setDataRssFilter([])
        console.log(arrFilter);

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
                    }}>
                    <TouchableOpacity
                        onPress={() => {
                            const link = item.links[0].url
                            navigation.navigate('Detail', { link: link })
                        }}>
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
                                }}>
                                <TextRn style={{
                                    fontWeight: '700',
                                    fontFamily: 'SF Pro',
                                    color: '#69BDFD'
                                }}>{'titleNews'}</TextRn>
                                <TextRn style={{
                                    fontSize: 10,
                                    color: '#909090',
                                    alignSelf: 'flex-start',
                                    marginTop: 3,
                                    marginHorizontal: 10,
                                }}>⬤</TextRn>
                                <TextRn
                                    numberOfLines={1}
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
                                zIndex: 100
                            }}>
                                {/* <SimpleMenu item={item} /> */}
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
        <View style={[styles.body, { paddingTop: insets.top }]}>
            <Loading />
            <TextField
                inputWrapperStyle={{
                    borderBottomWidth: 0,
                }}
                value={search}
                onChangeText={(text) => { setSearch(text); }}
                containerStyle={styles.textField}
                label=''
                placeholder={'search'}
                helper={""}
                LeftIcon={
                    <TouchableOpacity
                        onPress={() => {
                            console.log('aksjdkas');
                        }}
                        style={{
                            justifyContent: 'center',
                            marginLeft: 18,
                            marginRight: 10
                        }}>
                        <SearchNewsIcons />
                    </TouchableOpacity>}
                RightIcon={
                    <TouchableOpacity
                        onPress={() => {
                            setSearch('');
                            setDataRssFilter([])
                        }}
                        style={{
                            justifyContent: 'center',
                            marginRight: 18
                        }}>
                        <CancelIcon stroke={search ? '#180E19' : '#919191'} />
                    </TouchableOpacity>}
            />
            {
                dataRss && <FlatList
                    showsVerticalScrollIndicator={false}
                    refreshControl={<RefreshControl refreshing={false} onRefresh={() => { setDataRssFilter([]) }} />}
                    data={dataRssFilter}
                    renderItem={renderItem}
                    ListEmptyComponent={() => {
                        return (
                            <View>
                                {/* <ActivityIndicator size={'large'} /> */}
                            </View>
                        )
                    }}

                />
            }
        </View>
    )
}
export default SearchScreen

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: 'white',
    },
    textField: {
        marginHorizontal: 16,
        marginTop: 25,
        backgroundColor: '#EEEEEE',
        borderRadius: 40,
    }
});