import React, { useRef, useState } from 'react';
import { Dimensions, Image, Modal, StyleSheet, Text as TextRn, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '../../../components/Text';
import BellIcon from '../../../icons/svg-component/BellIcon';
import { COLOR, COLOR_MODE } from '../../../utils/color';
import { TUOITRE, VNEXPRESS, logoLogin } from '../../../utils/const';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import DialogChangeNews from '../../bookmark/component/dialog-change-news';
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

                <DialogChangeNews
                    left={offset.x + 30}
                    top={offset.y + 30}
                    onPressOut={() => setIsVisible(false)}
                    news={newsName}
                    onPressTuoiTre={handleTt}
                    onPressVnExpress={handleVnE}
                />
            </Modal>
        </View>
    );
};

const useHeaderStyles = (mode: boolean) => {
    const styles = StyleSheet.create({
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
