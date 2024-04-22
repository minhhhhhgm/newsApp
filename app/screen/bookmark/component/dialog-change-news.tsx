
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
                    <View style={{
                        justifyContent: 'center'
                    }}>
                        <TouchableOpacity onPress={onPressVnExpress} style={styles.btnVnE}>
                            <Text
                                style={[styles.textVnE, { fontWeight: news === VNEXPRESS ? '700' : 'normal' }]}
                                text='VnExpress'
                            />
                        </TouchableOpacity>
                        <View style={styles.popOverLine} />
                        <TouchableOpacity onPress={onPressTuoiTre} style={styles.btnTt}>
                            <Text
                                style={[styles.textTt, { fontWeight: news === TUOITRE ? '700' : '100' }]}
                                text='Tuổi Trẻ'
                            />
                        </TouchableOpacity>
                    </View>
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
        btnVnE: {
            flexDirection: 'row',
            paddingLeft: 10,
            marginTop: 15,
        },
        textVnE: {
            color: COLOR.focusColor,
            marginLeft: 5,
            fontSize: 12
        },
        btnTt: {
            flexDirection: 'row',
            marginTop: 10,
            marginLeft: 8,
        },
        textTt: {
            flex: 1,
            color: COLOR.focusColor,
            marginLeft: 5,
            fontSize: 12,
            alignSelf: 'center',
        },
        popOverLine: {
            height: 1,
            backgroundColor: COLOR.buttonColorInactive,
            marginTop: 7,
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
    });
    return styles;
}