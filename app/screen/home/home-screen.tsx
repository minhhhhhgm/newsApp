import React from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { WebView } from 'react-native-webview';
import {
    Menu,
    MenuProvider,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from "react-native-popup-menu";
import { useRoute } from '@react-navigation/native';
import HomeSelectedIcon from '../../icons/svg-component/homeSelectedIcon';
import BookMarkIcon from '../../icons/svg-component/bookMarkIcon';
import ShareIcon from '../../icons/svg-component/ShareIcon';
import Share from "react-native-share"
import { Article } from '../home';

const HomeNewsScreen = (props: any) => {
    const route = useRoute();
    // const { data } = route?.params as any

    // console.log(data);

    const data2 = [
        1, 2, 3, 4, 5
    ]
    const open = () => {

    }
    const renderItem = ({ item, index }: { item: any, index: any }) => {
        return (
            <View style={{ height: 200, marginVertical: 10, justifyContent: 'flex-end', backgroundColor: 'pink' }} key={index}>
                <Text style={{ color: 'white' }}>{item}</Text>
                <TouchableOpacity style={{ backgroundColor: "white" }}>
                    <Text>a....</Text>
                </TouchableOpacity>
                <SimpleMenu />
            </View>
        )
    }



    return (
        <>
            <View style={{

            }}>
                <FlatList
                    data={data2}
                    renderItem={renderItem}

                />
            </View>
        </>

    )
}
export default HomeNewsScreen

const styles = StyleSheet.create({
    container: {
        // maxWidth: 20,
        // maxHeight: 20,
        alignSelf: 'center',
        justifyContent: 'center'
        // left:10
    },
});
interface ISimpleMenu {
    item?: any,
    saveBookMark?: () => void
}
export const SimpleMenu = (props: ISimpleMenu) => {
    const { item, saveBookMark } = props
    const shareImage = () => {
        const urlNews: string = item.item.links[0].url
        const options = {
            url: urlNews,
        }
        Share.open(options)
            .then((r) => {
                console.log(r)
            })
            .catch((e) => {
                e && console.log(e)
            })
    }
    const save = async () => {
        console.log("aksd");

        await saveBookMark?.();
    }
    return (
        <MenuProvider
            backHandler
            skipInstanceCheck style={styles.container} >
            <Menu
                onOpen={() => {
                    console.log("open");
                }}
                style={{

                    width: 200,
                }}>
                <MenuTrigger
                    customStyles={{
                        triggerWrapper: {
                            width: 100,
                        },
                        triggerOuterWrapper: {
                            marginLeft: 150
                        }
                    }}
                    children={<Text style={{
                        fontSize: 5,
                        alignSelf: 'center',
                        color: '#180E19'
                    }}>●●●</Text>}
                />


                <MenuOptions customStyles={{
                    optionsContainer: {
                        borderRadius: 8,
                        width: 130,
                        height: 78,
                        shadowColor: 'black',
                        shadowOffset: { width: -2, height: 4 },
                        shadowOpacity: 10,
                        shadowRadius: 30,
                        right: 10,
                        borderWidth: 1,
                        borderColor: '#EEEEEE',
                        backgroundColor: 'white',
                    },
                    optionsWrapper: {
                        backgroundColor: 'white',
                        justifyContent: 'flex-end',
                        width: 78,
                        borderRadius: 8,
                        shadowColor: 'red',
                        shadowOffset: { width: -2, height: 4 },
                        shadowOpacity: 10,
                        shadowRadius: 30,
                    }
                }}>
                    <MenuOption
                        children={
                            <View>
                                <TouchableOpacity
                                    onPress={shareImage}
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        paddingLeft: 10,
                                        marginTop: 5,


                                    }}>
                                    {/* <BookMarkIcon /> */}
                                    <ShareIcon />
                                    <Text
                                        style={{
                                            color: '#180E19',
                                            marginLeft: 10,
                                            fontSize: 12
                                        }}
                                    >Share</Text>
                                </TouchableOpacity>
                                <View style={{
                                    height: 1,
                                    backgroundColor: '#EEEEEE',
                                    width: 131,
                                    marginLeft: 5,
                                    marginTop: 13

                                }}>

                                </View>
                            </View>}
                    />
                    <MenuOption children={
                        <View>
                            <TouchableOpacity
                                onPress={saveBookMark}
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    // paddingLeft: 10,
                                    // backgroundColor:'red',
                                    width: 101

                                }}>
                                <BookMarkIcon />
                                <Text
                                    style={{
                                        color: '#180E19',
                                        marginLeft: 10,
                                        fontSize: 12
                                    }}
                                >Bookmark</Text>
                            </TouchableOpacity>

                        </View>} />
                </MenuOptions>
            </Menu>
        </MenuProvider>
    );
};