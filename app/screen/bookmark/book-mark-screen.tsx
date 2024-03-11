import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, RefreshControl, ScrollView, StyleSheet, Text as TextRn, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { headBlackColor } from '../../utils/color';
import Vasern from 'vasern';
import { Todos } from '../../database';
import { SimpleMenu } from '../home/home-screen';
import moment from 'moment';
import { getInterest } from '../../utils/storage';
import { Button } from '../../components/Button';
import { Text } from '../../components/Text';
// export const TodoSchema = {
//     name: "Todos",
//     props: {
//         type: "string",
//         title: "string",
//         author: "string",
//         time: "string"
//     },
//     assignTo: "#Users"
// };
// export const VasernDB = new Vasern({
//     schemas: [TodoSchema],
//     version: 1
// })
// export const { Todos } = VasernDB as any;
const BookMarkScreen = (props: any) => {
    const insets = useSafeAreaInsets();
    const [data, setData] = useState([])
    const [countDelete, setCountDelete] = useState(0)
    const [dataInterests, setDataInterests] = React.useState<any[]>([])
    const [indexItem, setIndexItem] = useState(0)
    const getDataInterest = async () => {
        const response = await getInterest();
        if (response) {
            setDataInterests(JSON.parse(response))
        }
    }
    const getdata = async () => {
        let todos = await Todos.filter((item: any) => item.type === 'For You').data();
        console.log('tode', todos);
        setData(todos)
    }
    const getdataByType = async (type: string) => {
        let todos = await Todos.filter((item: any) => item.type === type).data();
        console.log('tode', todos);
        setData(todos)
    }
    function delayTime() {
        return new Promise<void>((resolve, reject) => {
            setTimeout(() => {
                resolve(); 
            }, 100);
        });
    }
    const testDb = async (id: string , type : string) => {
        setCountDelete(countDelete + 1)
        const item1 = await Todos.get({ id: id });
        await Todos.remove(item1)
        const todos = await Todos.data();
        // setData(todos)
        delayTime().then(() => {
            if(type === 'For You'){
                getdata()
            }else{
                getdataByType(type)
            }
            
        }).catch((error) => {
            console.error("Đã xảy ra lỗi:", error);
        }); 
        console.log('nhay day');
               
        
    }
    useEffect(() => {
        getdata()
        getDataInterest()
        // testDb()
    }, [])
    useEffect(() => {
    }, [countDelete])




    const renderItem = ({ item, index }: { item: any, index: number }) => {

        const relativeTime = moment(item.time, 'ddd, DD MMM YYYY HH:mm:ss Z').fromNow();
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
                    <Image
                        source={{
                            uri: item.image
                        }}
                        style={{
                            width: 137,
                            height: 140
                        }}
                    />
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
                        <TextRn style={{
                            flex: 2,
                            fontWeight: '500',
                            fontFamily: 'SF Pro',
                            color: '#909090'
                        }}>{item.author}</TextRn>
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
                                }}>{item.type}</TextRn>
                                <TextRn style={{
                                    fontSize: 10,
                                    color: '#909090',
                                    alignSelf: 'flex-start',
                                    marginTop: 3,
                                    marginHorizontal: 10
                                }}>⬤</TextRn>
                                <TextRn numberOfLines={1}
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
                                zIndex: 10
                            }}>
                                <SimpleMenu isRemoveBookmark item={item} saveBookMark={() => { testDb(item.id, item.type) }} />
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
        <View style={styles.body}>
            <View>
                <Text
                    text='Bookmarked'
                    style={{
                        fontWeight: '700',
                        color: '#000000',
                        fontSize: 15,
                        marginTop: 55,
                        marginLeft: 16
                    }}
                />
            </View>
            {/* <FlatList
                style={{ minHeight: 70}}
                horizontal
                showsHorizontalScrollIndicator={false}
                data={dataInterests}
                ListEmptyComponent={() => {
                    return (
                        <></>
                    )
                }}
                renderItem={({ item, index }) => {
                    return (
                        <Button
                            key={index}
                            onPress={() => {
                                setIndexItem(index);
                                testDb()
                                // setTitleNews(item.text);
                                // handleGetDataByTitle(item.endpoint);

                            }}
                            text={item.text}
                            textStyle={{
                                color: index == indexItem ? '#FFFFFF' : '#909090'
                            }}
                            style={{
                                marginTop: 30,
                                justifyContent: 'center',
                                paddingVertical: 4,
                                paddingHorizontal: 15,
                                backgroundColor: index == indexItem ? '#180E19' : '#EEEEEE',
                                borderRadius: 30,
                                alignSelf: 'flex-start',
                                marginRight: 10,
                                marginLeft: index === 0 ? 16 : 0,

                            }}
                        />
                    )
                }}
            /> */}


            {
                data && <FlatList
                    showsVerticalScrollIndicator={false}
                    refreshControl={<RefreshControl refreshing={false} onRefresh={() => { }} />}
                    data={data}
                    extraData={data}
                    ListHeaderComponent={() => {
                        return (
                            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                {
                                    dataInterests.map((item: any, index) => {
                                        return (
                                            <Button
                                                key={index}
                                                onPress={() => {
                                                    setIndexItem(index);
                                                    if(index != 0){
                                                        getdataByType(item.text)
                                                    }if(index == 0){
                                                        getdataByType(item.text)
                                                    }
                                                }}
                                                text={item.text}
                                                textStyle={{
                                                    color: index == indexItem ? '#FFFFFF' : '#909090'
                                                }}
                                                style={{
                                                    marginTop: 30,
                                                    justifyContent: 'center',
                                                    paddingVertical: 4,
                                                    paddingHorizontal: 15,
                                                    backgroundColor: index == indexItem ? '#180E19' : '#EEEEEE',
                                                    borderRadius: 30,
                                                    alignSelf: 'flex-start',
                                                    marginRight: 10,
                                                    marginLeft: index === 0 ? 16 : 0,
                                                    marginBottom: 20

                                                }}
                                            />
                                        )
                                    })
                                }
                            </ScrollView>
                        )
                    }}
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
    );
};

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: 'white',
    },
    logo: {
        alignItems: 'center',
    },
    headerText: {
        fontWeight: '700',
        fontSize: 18,
        marginTop: 20,
        color: headBlackColor
    },
    textField: {
        marginHorizontal: 46,
        marginTop: 25
    },
    button: {
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 49,
        alignSelf: 'center',
        marginTop: 79
    }
});

export default BookMarkScreen;