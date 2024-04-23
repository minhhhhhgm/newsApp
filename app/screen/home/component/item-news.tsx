import { useIsFocused } from '@react-navigation/native';
import moment from 'moment';
import React, { useRef, useState } from 'react';
import { Dimensions, Image, Modal, StyleSheet, Text as TextRn, TouchableOpacity, View } from 'react-native';
import { auth } from '../../../../App';
import { Text } from '../../../components/Text';
import { Bookmark } from '../../../database';
import ShareIcon from '../../../icons/svg-component/ShareIcon';
import BookMarkIcon from '../../../icons/svg-component/bookMarkIcon';
import { COLOR, COLOR_MODE } from '../../../utils/color';
import { defaultImage } from '../../../utils/const';
import { handleSaveBookMark, shareImage } from '../../../utils/homeAction';
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
    onRemove?: () => void,
    mode?: boolean

}

export const ItemNews = (props: IItemNews) => {
    const { index, handleNavigateDetailNews, imgSrc, title, relativeTime, link, titleNews, author, time, onRemove, mode } = props
    const [offset, setOffset] = React.useState({ x: 0, y: 0 });
    const newRef = useRef<TouchableOpacity>(null);
    const [isVisible, setIsVisible] = useState({ id: 0, visible: false })
    const [isBookmark, setIsBookmark] = useState(false)
    const email = auth.currentUser?.email
    const visible = isVisible.visible && index === isVisible.id
    const isFocused = useIsFocused()
    const isExistItem = Bookmark.get({ title: title, email: email });
    const styles = useItemNewsStyles(mode as boolean)
    // const check = useCallback(() => {
    //     const isBookmarked = Bookmark.get({ title: title, email: email });
    //     setShowBookmarked(isBookmarked)
    // }, [title])
    // useEffect(() => {
    //     check()
    // }, [isBookmark, isFocused])



    const handleToggleVisible = (id: number) => {
        newRef.current?.measureInWindow((x, y) => {
            setOffset({ x, y });
        })
        setIsVisible({ id: id, visible: true })
        const item1 = Bookmark.get({ title: title, email: email });
        if (item1) {
            setIsBookmark(true)
        } else {
            setIsBookmark(false)
        }
    }

    const bookmarkPress = () => {
        if (isBookmark) {
            if (onRemove) {
                onRemove()
            } else {
                handleRemove()
            }
        } else {
            onSaveBookMark()
        }
    }

    const onSaveBookMark = () => {
        const newStr = time?.replace(/GMT\+\d+/, "+0700")
        const formattedTime = moment(newStr).format('YYYY-MM-DD');
        const isInsert = handleSaveBookMark(titleNews, title, author, formattedTime as string, link, imgSrc, email as string)
        if (isInsert) {
            setIsBookmark(true)
        }
        handleToggleVisible(-1)
    }

    const handleRemove = () => {
        const item = Bookmark.get({ title: title });
        const isRemove = Bookmark.remove(item)
        if (isRemove) {
            setIsBookmark(false)
        }
        handleToggleVisible(-1)
    }


    return (
        <TouchableOpacity
            activeOpacity={1}
            key={index}
            style={styles.viewItem}
            onPress={handleNavigateDetailNews}
        >
            <View style={{ flexDirection: 'row' }}>
                <Image
                    style={styles.imageItem}
                    source={{ uri: imgSrc || defaultImage }}
                />
                <View style={styles.viewContent}>
                    <TextRn numberOfLines={3} style={styles.textTitle}>{title}</TextRn>
                    <View style={styles.viewAuthor}>
                        <TextRn style={styles.textAuthor}>{author}</TextRn>
                        {(isExistItem) && <BookMarkIcon width={15} height={15} fill={mode ? COLOR.white : '#180E19'} />}
                    </View>
                    <View style={styles.rowContent}>
                        <View style={styles.viewRowContent}>
                            <Text text={titleNews} style={styles.titleNews} />
                            <TextRn style={styles.bigDot}>⬤</TextRn>
                            <TextRn numberOfLines={1} style={styles.time}>{relativeTime}</TextRn>
                        </View>
                        <TouchableOpacity
                            ref={newRef}
                            style={{ paddingHorizontal: 5 }}
                            onPress={() => handleToggleVisible(index)}
                        >
                            <TextRn style={styles.threeDot}>●●●</TextRn>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={styles.lineHorizotal} />
            {visible && (
                <Modal
                    animationType='fade'
                    onRequestClose={() => handleToggleVisible(-1)}
                    transparent={true}
                >
                    <TouchableOpacity
                        style={styles.main}
                        onPress={() => handleToggleVisible(-1)}
                        activeOpacity={1}
                    >
                        <View style={[styles.content, { top: offset.y > 580 ? 580 : offset.y + 10, left: offset.x + 20 }]}>
                            <View style={[styles.viewPopOver]}>
                                <View style={{ justifyContent: 'center' }}>
                                    <TouchableOpacity onPress={() => shareImage(link)} style={styles.shareButton}>
                                        <ShareIcon />
                                        <Text text='share' style={styles.textShare} />
                                    </TouchableOpacity>
                                    <View style={styles.popOverLine} />
                                    <TouchableOpacity onPress={bookmarkPress} style={styles.bookmarkButton}>
                                        <View style={{ justifyContent: 'center' }}>
                                            {<BookMarkIcon fill={isBookmark ? '#180E19' : 'none'} />}
                                        </View>
                                        <Text text={isBookmark ? 'removeBookmark' : 'bookmark'} style={styles.textBookmark} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                </Modal>
            )}
        </TouchableOpacity>
    )
};


export const useItemNewsStyles = (mode: boolean) => {
    const styles = StyleSheet.create({
        container: {
            alignSelf: 'center',
            justifyContent: 'center'
        },
        viewItem: {
            paddingHorizontal: 16,
            marginTop: 15,
        },
        imageItem: {
            width: 137,
            height: 140
        },
        viewContent: {
            flex: 1,
            marginLeft: 10,
        },
        textTitle: {
            flex: 3,
            fontWeight: '700',
            fontFamily: 'SF Pro',
            color: COLOR_MODE(mode).titleText
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
            backgroundColor: COLOR_MODE(mode).divider,
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
        viewAuthor: {
            flexDirection: 'row',
            flex: 2,
            justifyContent: 'space-between'
        },
        time: {
            flex: 1,
            color: COLOR.authorColor
        },
        threeDot: {
            fontSize: 5,
            color: COLOR_MODE(mode).dotColor,
            marginTop: 7
        },
        shareButton: {
            flexDirection: 'row',
            paddingLeft: 10,
            marginTop: 15,
        },
        textShare: {
            color: COLOR.focusColor,
            marginLeft: 10,
            fontSize: 12
        },
        textBookmark: {
            flex: 1,
            color: COLOR.focusColor,
            marginLeft: 5,
            fontSize: 12,
            alignSelf: 'center',
        },
        bookmarkButton: {
            flexDirection: 'row',
            marginTop: 10,
            marginLeft: 8,
            paddingRight: 20
        }
    });
    return styles;
}

