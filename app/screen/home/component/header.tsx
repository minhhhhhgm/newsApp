import React, { useRef, useState } from 'react';
import { Dimensions, Image, Modal, StyleSheet, Text as TextRn, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '../../../components/Text';
import BellIcon from '../../../icons/svg-component/BellIcon';
import { COLOR, COLOR_MODE } from '../../../utils/color';
import { TUOITRE, VNEXPRESS, logoLogin } from '../../../utils/const';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
const { width, height } = Dimensions.get('screen');

interface IHeader {
    newsName: string
    onChangeVnE: () => void
    onChangeTt: () => void
}

export const Header = (props: IHeader) => {
    const insets = useSafeAreaInsets();
    const [isVisible, setIsVisible] = useState(false);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const ref = useRef<TouchableOpacity>(null);
    const { newsName, onChangeTt, onChangeVnE } = props
    const mode = useSelector((state: RootState) => state.newsReducer.darkMode)

    const styles = useHeaderStyles(mode)
    const onPress = () => {
        setIsVisible(!isVisible);
        ref.current?.measureInWindow((x, y) => {
            setOffset({ x, y });
        });
    };

    const handleTt = () => {
        onChangeTt();
        setIsVisible(false);
    };

    const handleVnE = () => {
        onChangeVnE();
        setIsVisible(false);
    };

    return (
        <View style={{ flexDirection: 'row', marginTop: 20 + insets.top, justifyContent: 'center' }}>
            <View style={{ paddingLeft: 16 }}></View>
            <View style={{ flexDirection: 'row', justifyContent: 'center', flex: 1 }}>
                <Image source={logoLogin} style={styles.logo} />
                <Text
                    style={styles.textNews}
                    text={newsName}
                />
            </View>
            <TouchableOpacity
                ref={ref}
                style={{ paddingRight: 16, justifyContent: 'center' }}
                onPress={onPress}
            >
                <BellIcon darkMode={mode} />
            </TouchableOpacity>
            <Modal
                visible={isVisible}
                animationType='fade'
                onRequestClose={() => setIsVisible(false)}
                transparent={true}
            >
                <TouchableOpacity
                    style={styles.main}
                    onPress={() => setIsVisible(false)}
                    activeOpacity={1}
                >
                    <View style={[styles.content, { top: offset.y + 30, left: offset.x + 30 }]}>
                        <View style={styles.viewPopOver}>
                            <TouchableOpacity onPress={handleVnE} style={styles.btnVnE}>
                                <Text
                                    style={[styles.textVnE, { fontWeight: newsName === VNEXPRESS ? '700' : '100' }]}
                                    text='VnExpress'
                                />
                            </TouchableOpacity>
                            <View style={styles.popOverLine}></View>
                            <TouchableOpacity onPress={handleTt} style={styles.btnTt}>
                                <Text
                                    style={[styles.textTt, { fontWeight: newsName === TUOITRE ? '700' : '100' }]}
                                    text='Tuổi Trẻ'
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};

const useHeaderStyles = (mode: boolean) => {
    const styles = StyleSheet.create({
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
        popOverLine: {
            height: 1,
            backgroundColor: COLOR.buttonColorInactive,
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
        logo: {
            width: 24,
            height: 24,
            tintColor: COLOR_MODE(mode).logoColor
        },
        textNews: {
            fontWeight: '700',
            fontSize: 15,
            color: COLOR_MODE(mode).textNewsColor,
            marginLeft: 10
        }
    });
    return styles;
}
