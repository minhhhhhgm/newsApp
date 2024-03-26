import React, { useCallback, useEffect } from 'react';
import { ScrollView, StyleSheet, Switch, TextInput, TouchableOpacity, View, Text as TextRn, FlatList, RefreshControl, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '../../components/Button';
import { Text } from '../../components/Text';
import { Controller, useForm } from 'react-hook-form';
import { TextField } from '../../components/TextField';
import SearchIcons from '../../icons/svg-component/searchIcon';
import SearchNewsIcons from '../../icons/svg-component/SearchNewsIcon';
import CancelIcon from '../../icons/svg-component/cancelcon';
//@ts-ignore
import * as rssParser from 'react-native-rss-parser';
import { Article } from '../home/home';
import { searchData } from '../../utils/validate';
import { SimpleMenu } from '../home/home-screen';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import { useLanguage } from '../../i18n/i18n';
const SearchScreen = (props: any) => {
    const insets = useSafeAreaInsets();
    const [dataRss, setDataRss] = React.useState<Article[]>([])
    const [dataRssFilter, setDataRssFilter] = React.useState<Article[]>([])
    const [dataRssAll, setDataRssAll] = React.useState<any>()
    const navigation = useNavigation()
    const {
        control,
        handleSubmit,
        watch,
        setValue,
        formState: { errors, isValid },
    } = useForm({
        mode: 'all'
    })
    const getData = async () => {
        await fetch('https://vnexpress.net/rss/tin-moi-nhat.rss')
            .then((response) => response.text())
            .then((responseData) => rssParser.parse(responseData))
            .then((rss) => {
                if (rss) {
                    setDataRss(rss.items)
                    setDataRssAll(rss)

                }
            });
        await fetch('https://vnexpress.net/rss/kinh-doanh.rss')
            .then((response) => response.text())
            .then((responseData) => rssParser.parse(responseData))
            .then((rss) => {
                if (rss) {
                    console.log(rss);

                    setDataRss(prev => [...prev, ...rss.items])
                    setDataRssAll((prev: any) => ({
                        ...prev,
                        ...rss
                    }));
                }
            });
    }
    useEffect(() => {
        getData()
    }, [])

    const _onChangeText = (text: string) => {
        console.log(dataRss);

        const arrFilter = searchData(dataRss, text)
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
                    }}
                >
                    <TouchableOpacity
                        onPress={() => {
                            const link = item.links[0].url
                            props.navigation.navigate('Detail', { link: link })
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
                                }}
                            >
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
                                <SimpleMenu item={item} />
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
    const { changeLanguage } = useLanguage()
    return (
        <View style={[styles.body, { paddingTop: insets.top }]}>
            <Controller
                control={control}
                render={({ field: { onChange, value, onBlur } }) => (
                    <TextField
                        inputWrapperStyle={{
                            borderBottomWidth: 0,
                        }}
                        value={value}
                        onChangeText={(text) => { onChange(text); _onChangeText(text) }}
                        containerStyle={styles.textField}
                        label=''
                        placeholder='Search'
                        helper={errors?.email?.message}
                        LeftAccessory={() => {
                            return (
                                <TouchableOpacity
                                    onPress={() => changeLanguage('vi')}
                                    style={{
                                        justifyContent: 'center',
                                        marginLeft: 18,
                                        marginRight: 10
                                    }}>
                                    <SearchNewsIcons />
                                </TouchableOpacity>
                            )
                        }}
                        RightAccessory={() => {
                            return (
                                <TouchableOpacity
                                    onPress={() => { onChange(''); setValue('search', ''); setDataRssFilter([]) }}
                                    style={{
                                        justifyContent: 'center',
                                        marginRight: 18
                                    }}>
                                    <CancelIcon stroke={watch('search') ? '#180E19' : '#919191'} />
                                </TouchableOpacity>

                            )
                        }}
                    />
                )}
                defaultValue={""}
                name="search"
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