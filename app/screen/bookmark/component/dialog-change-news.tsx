
import React from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from '../../../components/Text';
import { COLOR } from '../../../utils/color';
import { TUOITRE, VNEXPRESS } from '../../../utils/const';
const { width, height } = Dimensions.get('screen');

interface IDialogChangeNews {
    top: number,
    left: number,
    onPressOut: () => void,
    onPressVnExpress: () => void,
    onPressTuoiTre: () => void,
    news: string
}

const DialogChangeNews = (props: IDialogChangeNews) => {
    const { top, left, onPressOut, onPressTuoiTre, onPressVnExpress, news } = props
    const styles = useDialogStyles()
    return (
        <TouchableOpacity style={styles.main} onPress={onPressOut} activeOpacity={1}>
            <View style={[styles.content, { top: top, left: left }]}>
                <View
                    style={[styles.viewPopOver]}>
                    <TouchableOpacity onPress={onPressVnExpress} style={[styles.btnStyle, {
                        backgroundColor: news === VNEXPRESS ? COLOR.buttonColorInactive : COLOR.white,
                    }]}>
                        <Text
                            style={[styles.textVnE, { fontWeight: news === VNEXPRESS ? '700' : '100' }]}
                            text='VnExpress'
                        />
                    </TouchableOpacity>
                    {/* <View style={styles.popOverLine} /> */}
                    <TouchableOpacity onPress={onPressTuoiTre} style={[styles.btnStyleTT, {
                        backgroundColor: news === TUOITRE ? COLOR.buttonColorInactive : COLOR.white,
                    }]}>
                        <Text
                            style={[styles.textVnE, { fontWeight: news === TUOITRE ? '700' : '100' }]}
                            text='Tuổi Trẻ'
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default DialogChangeNews

const useDialogStyles = () => {
    const styles = StyleSheet.create({
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
        textVnE: {
            color: COLOR.focusColor,
            // marginLeft: 5,
            fontSize: 12
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
            zIndex: 10,
            right: 15,
        },
        btnStyle: {
            paddingVertical: 10,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            paddingLeft: 10
        },
        btnStyleTT: {
            paddingVertical: 10,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            paddingLeft: 10,
            marginTop: 4
        }
    });
    return styles;
}