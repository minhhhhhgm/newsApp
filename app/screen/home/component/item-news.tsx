import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Dimensions, Image, Modal, StyleSheet, Text as TextRn, TouchableOpacity, View, ViewStyle } from 'react-native';
import { auth } from '../../../../App';
import { Text } from '../../../components/Text';
import ShareIcon from '../../../icons/svg-component/ShareIcon';
import BookMarkIcon from '../../../icons/svg-component/bookMarkIcon';
import { COLOR } from '../../../utils/color';
import { defaultImage } from '../../../utils/const';
import { handleSaveBookMark, shareImage } from '../../../utils/homeAction';
import moment from 'moment';
import { Bookmark } from '../../../database';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { useIsFocused } from '@react-navigation/native';
const { width, height } = Dimensions.get('window');

interface IItemNews {
    index: number,
    handleNavigateDetailNews: () => void,
    imgSrc: string,
    title: string,
    relativeTime: any,
    link: string,
    titleNews: string,
    visible?: boolean,
    author: string,
    time?: string,
    style?: ViewStyle;
    isRemoveBookMark?: boolean,
    handleRemoveBookmark?: () => void
}

export const ItemNews = (props: IItemNews) => {
    const [offset, setOffset] = React.useState({ x: 0, y: 0 });
    const [showBookmarked, setShowBookmarked] = React.useState(undefined);
    const newRef = useRef<TouchableOpacity>(null);
    const [isVisible, setIsVisible] = useState({
        id: 0,
        visible: false
    })
    const [isBookmark, setIsBookmark] = useState(false)
    const {
        index,
        handleNavigateDetailNews,
        imgSrc,
        title,
        relativeTime,
        link,
        titleNews,
        author,
        time,
        style,
        isRemoveBookMark,
        handleRemoveBookmark
    } = props
    // console.log('render');
    const email = auth.currentUser?.email
    const visible = isVisible.visible && index === isVisible.id
    const isFocused = useIsFocused()
    const isExistItem = Bookmark.get({ title: title, email: email });
    const check = useCallback(() => {
        const isBookmarked = Bookmark.get({ title: title, email: email });
        setShowBookmarked(isBookmarked)
    }, [title])
    // Bookmark.onInsert(()=>{
            //     console.log('Bookmark.onInsert');
                
            //     const author = news == 'tuoitre' ? 'Tuổi Trẻ' : 'VnExpress'
            //     const data = Bookmark.filter((item: IBookmark) => item.author === author && item.email === email).data();
            //     setData(data)
            // })
    useEffect(() => {
        check()
    }, [isBookmark, isFocused])


    const handleToggleVisible = (id: number) => {
        newRef.current?.measureInWindow((x, y) => {
            setOffset({ x, y });
        })
        setIsVisible({
            id: id,
            visible: true
        })
        const item1 = Bookmark.get({ title: title, email: email });
        console.log('ITEM', item1);
        if (item1) {
            setIsBookmark(true)
        } else {
            setIsBookmark(false)
        }
    }
    return (
        <TouchableOpacity
            activeOpacity={1}
            key={index}
            style={[styles.viewItem, style]}
            onPress={visible ? () => handleToggleVisible(-1) : handleNavigateDetailNews}
        >
            <View
                style={{ flexDirection: 'row' }}>
                <Image
                    source={{ uri: imgSrc == '' ? defaultImage : imgSrc }}
                    style={styles.imageItem}
                />
                <View
                    style={styles.viewContent}>
                    <TextRn
                        numberOfLines={3}
                        style={styles.textTitle}>
                        {title}
                    </TextRn>
                    <View style={{
                        flexDirection: 'row',
                        flex: 2,
                        justifyContent: 'space-between'
                    }}>
                        <TextRn style={styles.textAuthor}>
                            {author}
                        </TextRn>
                        {
                            (isExistItem || showBookmarked) && <BookMarkIcon width={15} height={15} fill={'#180E19'} />
                        }

                    </View>
                    <View style={styles.rowContent}>
                        <View style={styles.viewRowContent}>
                            <Text text={titleNews} style={styles.titleNews} />
                            <TextRn style={styles.bigDot}>⬤</TextRn>
                            <TextRn numberOfLines={1}
                                style={{
                                    flex: 1,
                                    color: COLOR.authorColor
                                }}>{relativeTime}</TextRn>
                        </View>
                        <TouchableOpacity
                            ref={newRef}
                            style={{ paddingHorizontal: 5, }}
                            onPress={visible ? () => handleToggleVisible(-1) : () => handleToggleVisible(index)}
                        >
                            <TextRn
                                style={{
                                    fontSize: 5,
                                    color: COLOR.focusColor,
                                    marginTop: 7
                                }}>●●●</TextRn>
                        </TouchableOpacity>
                        {/* <SimplePopover link={link} item={item} saveBookMark={() => handleSaveBookMark(titleNews, title, author, time, link, imgSrc)} /> */}
                    </View>
                </View>
            </View>
            <View style={styles.lineHorizotal}></View>
            {
                visible && (
                    <Modal
                        animationType='fade'
                        onRequestClose={() => handleToggleVisible(-1)}
                        transparent={true}
                    >
                        <TouchableOpacity style={styles.main}
                            onPress={() => handleToggleVisible(-1)}
                            activeOpacity={1}
                        >
                            <View style={[styles.content, {
                                top: offset.y > 580 ? 580 : offset.y + 10,
                                left: offset.x + 20
                            }]}>
                                <View
                                    style={[styles.viewPopOver]}>
                                    <View style={{
                                        justifyContent: 'center'
                                    }}>
                                        <TouchableOpacity
                                            // activeOpacity={1}
                                            onPress={() => shareImage(link)}
                                            style={{
                                                flexDirection: 'row',
                                                paddingLeft: 10,
                                                marginTop: 15,
                                            }}>
                                            <ShareIcon />
                                            <TextRn
                                                style={{
                                                    color: COLOR.focusColor,
                                                    marginLeft: 10,
                                                    fontSize: 12
                                                }}
                                            >Share</TextRn>
                                        </TouchableOpacity>
                                        <View style={styles.popOverLine}>
                                        </View>
                                        <View>
                                            <TouchableOpacity
                                                // activeOpacity={1}
                                                onPress={
                                                    isRemoveBookMark ? handleRemoveBookmark :
                                                        () => {
                                                            console.log('time', time);
                                                            
                                                            const newStr = time?.replace(/GMT\+\d+/, "")
                                                            const formattedTime = moment(newStr).format('YYYY-MM-DD');
                                                            const isInsert = handleSaveBookMark(titleNews, title, author, formattedTime as string, link, imgSrc, email as string)
                                                            if (isInsert) {
                                                                setIsBookmark(true)
                                                            }
                                                            handleToggleVisible(-1)
                                                        }
                                                }
                                                style={{
                                                    flexDirection: 'row',
                                                    marginTop: isRemoveBookMark ? 5 : 10,
                                                    marginLeft: 8,
                                                    paddingRight: 20
                                                }}>
                                                <View style={{ justifyContent: 'center' }}>
                                                    {isBookmark ? <BookMarkIcon fill={'#180E19'} /> : <BookMarkIcon fill={isRemoveBookMark ? '#180E19' : 'none'} />}
                                                </View>
                                                <TextRn
                                                    style={{
                                                        flex: 1,
                                                        color: COLOR.focusColor,
                                                        marginLeft: 5,
                                                        fontSize: 12,
                                                        alignSelf: 'center',
                                                        //    backgroundColor:'red'
                                                        //    marginBottom: 15
                                                    }}
                                                >{isRemoveBookMark ? 'Remove bookmark' : 'Bookmark'}</TextRn>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </Modal>
                )
            }
        </TouchableOpacity>
    )
};


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
        color: COLOR.textTypeColor,
        fontSize: 14
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
        // width: 121,
        height: 78,
        shadowColor: COLOR.black,
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 10,
        shadowRadius: 30,
        elevation: 5,
        borderRadius: 10,
        position: 'absolute',
        // bottom: -55,
        zIndex: 10,
        right: 15,

    },
    popOverLine: {
        height: 1,
        backgroundColor: COLOR.buttonColorInactive,
        marginLeft: 10,
        marginTop: 7,
    },
    main: {
        backgroundColor: 'transparent',
        width: width,
        height: height,
        flex: 1
    },
    content: {
        position: 'absolute',
        bottom: 22,
        alignSelf: 'center',
    },
    background: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
    },
    centeredView: {
        width: width - 16,
        alignSelf: 'center',
        justifyContent: 'flex-end',
    },
    modalView: {
        width: width - 32,
        // height: 279,
        backgroundColor: 'white',
        borderRadius: 8,
        marginHorizontal: 16,
    },

});