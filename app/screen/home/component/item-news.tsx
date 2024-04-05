import React, { memo, useRef } from 'react';
import { Image, StyleSheet, Text as TextRn, TouchableOpacity, View } from 'react-native';
import { defaultImage } from '../../../utils/const';
import { COLOR } from '../../../utils/color';

interface IItemNews {
    index: number,
    handleNavigateDetailNews: () => void,
    imgSrc: string,
    title: string,
    relativeTime: any,
    link: string,
    titleNews: string,
    visible: boolean,
    author: string,
    handleToggleVisible: () => void,
    shareImage: () => void,
    saveBookMark: () => void,
    setPosition: (x: number, y: number) => void
}

export const ItemNews = memo((props: IItemNews) => {
    const [offset, setOffset] = React.useState({ x: 0, y: 0 });
    const newRef = useRef<TouchableOpacity>(null);
    console.log('render');

    const {
        index,
        handleNavigateDetailNews,
        imgSrc,
        title,
        relativeTime,
        link,
        titleNews,
        visible,
        handleToggleVisible,
        author,
        shareImage,
        saveBookMark,
        setPosition
    } = props
    const onButtonPress = () => {
        console.log('Press');
        newRef.current?.measureInWindow((fx, fy, width, height) => {
            setPosition(fx, fy)
        });
        handleToggleVisible();
    };

    return (
        <View
            key={index}
            style={[styles.viewItem, { zIndex: 10, }]}>
            <View
                style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={visible ? handleToggleVisible : handleNavigateDetailNews}>
                    <Image
                        source={{ uri: imgSrc == '' ? defaultImage : imgSrc }}
                        style={styles.imageItem}
                    />
                </TouchableOpacity>
                <View
                    style={styles.viewContent}>
                    <TextRn
                        // onPress={handleNavigateDetailNews}
                        numberOfLines={3}
                        style={styles.textTitle}>
                        {title}
                    </TextRn>
                    <TextRn style={styles.textAuthor}>
                        {author}
                    </TextRn>
                    <View style={styles.rowContent}>
                        <View style={styles.viewRowContent}>
                            <TextRn style={styles.titleNews}>{titleNews}</TextRn>
                            <TextRn style={styles.bigDot}>⬤</TextRn>
                            <TextRn numberOfLines={1}
                                style={{
                                    flex: 1,
                                }}>{relativeTime}</TextRn>
                        </View>
                        <TouchableOpacity
                            ref={newRef}
                            style={{ paddingHorizontal: 5, }}
                            // activeOpacity={1}
                            // onPress={handleToggleVisible}
                            onPress={onButtonPress}
                        >
                            <TextRn
                                style={{
                                    fontSize: 5,
                                    color: '#180E19',
                                    marginTop: 7
                                }}>●●●</TextRn>
                        </TouchableOpacity>
                        {/* <SimplePopover link={link} item={item} saveBookMark={() => handleSaveBookMark(titleNews, title, author, time, link, imgSrc)} /> */}
                    </View>
                </View>
            </View>
            {/* <View style={styles.lineHorizotal}></View> */}
            {/* {
                visible ? (
                    <View
                        style={[styles.viewPopOver, { bottom: 0 }]}>
                        <View style={{
                            justifyContent: 'center'
                        }}>
                            <TouchableOpacity
                                activeOpacity={1}
                                onPress={shareImage}
                                style={{
                                    flexDirection: 'row',
                                    paddingLeft: 10,
                                    marginTop: 15,
                                }}>
                                <ShareIcon />
                                <TextRn
                                    style={{
                                        color: '#180E19',
                                        marginLeft: 10,
                                        fontSize: 12
                                    }}
                                >Share</TextRn>
                            </TouchableOpacity>
                            <View style={styles.popOverLine}>
                            </View>
                            <View>
                                <TouchableOpacity
                                    activeOpacity={1}
                                    onPress={saveBookMark}
                                    style={{
                                        flexDirection: 'row',
                                        marginTop: 10,
                                        marginLeft: 8
                                    }}>
                                    <BookMarkIcon fill={'none'} />
                                    <TextRn
                                        style={{
                                            color: '#180E19',
                                            marginLeft: 5,
                                            fontSize: 12
                                        }}
                                    >{'Bookmark'}</TextRn>
                                </TouchableOpacity>

                            </View>
                        </View>

                    </View>
                ) : null
            } */}
        </View>
    )


});


const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        justifyContent: 'center'
    },
    viewItem: {
        paddingHorizontal: 16,
        marginTop: 15,
        // zIndex: 100,
        // position: 'relative',
        // overflow: 'scroll',
    },
    imageItem: {
        width: 137,
        height: 140
    },
    viewContent: {
        flex: 1,
        marginLeft: 10,
        // zIndex: -100
    },
    textTitle: {
        flex: 3,
        fontWeight: '700',
        fontFamily: 'SF Pro',
        color: COLOR.focusColor
    },
    textAuthor: {
        flex: 2,
        fontWeight: '500',
        fontFamily: 'SF Pro',
        color: COLOR.authorColor
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
        color: COLOR.textTypeColor
    },
    bigDot: {
        fontSize: 10,
        color: COLOR.authorColor,
        alignSelf: 'flex-start',
        marginTop: 3,
        marginHorizontal: 10
    },
    lineHorizotal: {
        height: 1,
        backgroundColor: COLOR.buttonColorInactive,
        marginTop: 30,
        marginBottom: 20
    },
    viewPopOver: {
        backgroundColor: COLOR.backgroundColor,
        width: 121,
        height: 78,
        shadowColor: COLOR.black,
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 10,
        shadowRadius: 30,
        elevation: 5,
        borderRadius: 10,
        position: 'absolute',
        bottom: -55,
        zIndex: 10,
        right: 15,
    },
    popOverLine: {
        height: 1,
        backgroundColor: COLOR.buttonColorInactive,
        marginLeft: 10,
        marginTop: 7,
    }
});