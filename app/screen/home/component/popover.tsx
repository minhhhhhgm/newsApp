import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Popover from 'react-native-popover-view';
import {
    Menu,
    MenuOption,
    MenuOptions,
    MenuProvider,
    MenuTrigger,
} from "react-native-popup-menu";
import Share from "react-native-share";
import ShareIcon from '../../../icons/svg-component/ShareIcon';
import BookMarkIcon from '../../../icons/svg-component/bookMarkIcon';



interface ISimpleMenu {
    item?: any,
    saveBookMark?: () => void,
    isRemoveBookmark?: boolean,
    isShareBookMark ?: boolean,
    link? : string 
}

export const SimplePopover = (props: ISimpleMenu) => {
    const { item, saveBookMark, isRemoveBookmark , link } = props
    const shareImage = () => {
        const urlNews: string = link as string
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
    return (
        <Popover
            // mode={PopoverMode.TOOLTIP}
            verticalOffset={-30}
            popoverStyle={{
                width: 129,
                height: 88,
                justifyContent: 'center',
                alignItems: 'center'
            }}
            backgroundStyle={{
                backgroundColor: 'transparent'
            }}
            arrowSize={{
                width: 0,
                height: 0
            }}
            from={(
                <TouchableOpacity>
                    <Text style={{
                        fontSize: 5,
                        color: '#180E19',
                        marginTop: 7
                    }}>●●●</Text>
                </TouchableOpacity>
            )}>
            <View
                style={{
                    backgroundColor: 'white',
                    width: 121,
                    height: 78,
                    shadowColor: 'black',
                    shadowOffset: { width: -2, height: 4 },
                    shadowOpacity: 10,
                    shadowRadius: 30,
                    elevation: 5,
                    borderRadius: 10
                }}
            >
                <View>
                    <TouchableOpacity
                        onPress={shareImage}
                        style={{
                            flexDirection: 'row',
                            paddingLeft: 10,
                            marginTop: 15,
                        }}>
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
                        marginTop: 7,
                        marginBottom: isRemoveBookmark ? -5 : 0
                    }}>
                    </View>
                    <View>
                            <TouchableOpacity
                                onPress={saveBookMark}
                                style={{
                                    flexDirection: 'row',
                                    // justifyContent: 'center',
                                    // alignItems: 'center',
                                    // paddingLeft: 10,
                                    // backgroundColor:'red',
                                    // width: 101
                                    marginTop : 10,
                                    marginLeft : 8

                                }}>
                                <BookMarkIcon fill={isRemoveBookmark ? '#180E19' : 'none'} />
                                <Text
                                    style={{
                                        color: '#180E19',
                                        marginLeft: 5,
                                        fontSize: 12
                                    }}
                                >{isRemoveBookmark ? 'Remove bookmark' : 'Bookmark'}</Text>
                            </TouchableOpacity>

                        </View>
                </View>
            </View>
        </Popover>
    );
};


export const SimpleMenu = (props: ISimpleMenu) => {
    const { item, saveBookMark, isRemoveBookmark ,isShareBookMark} = props
    const shareImage = () => {
        console.log('item' , item);
        let urlNews
        if(isShareBookMark){
            urlNews  = item.url
        }else{
            urlNews  = item.links[0].url
        }
         
        console.log('url', urlNews);
        
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
                            height: 20,
                            justifyContent: 'center'
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
                                    marginTop: 7,
                                    marginBottom: isRemoveBookmark ? -5 : 0

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
                                <BookMarkIcon fill={isRemoveBookmark ? '#180E19' : 'none'} />
                                <Text
                                    style={{
                                        color: '#180E19',
                                        marginLeft: 10,
                                        fontSize: 12
                                    }}
                                >{isRemoveBookmark ? 'Remove bookmark' : 'Bookmark'}</Text>
                            </TouchableOpacity>

                        </View>} />
                </MenuOptions>
            </Menu>
        </MenuProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        // maxWidth: 20,
        // maxHeight: 20,
        alignSelf: 'center',
        justifyContent: 'center'
        // left:10
    },
});