import React, { useRef, useState } from 'react';
import { Dimensions, Image, Modal, StyleSheet, Text as TextRn, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '../../../components/Text';
import BellIcon from '../../../icons/svg-component/BellIcon';
import { COLOR } from '../../../utils/color';
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
    const [isVisible, setIsVisible] = useState(false)
    const [offset, setOffset] = React.useState({ x: 0, y: 0 });
    const ref = useRef<TouchableOpacity>(null);
    const { newsName, onChangeTt, onChangeVnE } = props
    const onPress = () => {
        setIsVisible(!isVisible)
        ref.current?.measureInWindow((x, y) => {
            console.log(x, y);
            setOffset({ x, y });
        })
    }
    const handleTt = () => {
        onChangeTt()
        setIsVisible(false)
    }
    const handleVnE = () => {
        onChangeVnE()
        setIsVisible(false)
    }
    return (
        <View style={{
            flexDirection: 'row',
            marginTop: 20 + insets.top,
            justifyContent: 'center',
        }}>
            <View style={{ paddingLeft: 16 }}></View>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    flex: 1
                }}>
                <Image
                    source={logoLogin}
                    style={{
                        width: 24,
                        height: 24
                    }}
                />
                <Text
                    text={newsName}
                    style={{
                        fontWeight: '700',
                        fontSize: 15,
                        color: COLOR.focusColor,
                        marginLeft: 10,
                    }}
                />
            </View>
            <TouchableOpacity
                ref={ref}
                style={{
                    paddingRight: 16,
                    justifyContent: 'center',
                }}
                onPress={onPress}>
                <BellIcon />
            </TouchableOpacity>
            <Modal
                visible={isVisible}
                animationType='fade'
                onRequestClose={() => setIsVisible(false)}
                transparent={true}
            >
                <TouchableOpacity style={styles.main}
                    onPress={() => setIsVisible(false)}
                    activeOpacity={1}
                >
                    <View style={[styles.content, {
                        top: offset.y + 30,
                        left: offset.x + 30
                    }]}>
                        <View
                            style={[styles.viewPopOver]}>
                            <View style={{
                                justifyContent: 'center'
                            }}>
                                <TouchableOpacity
                                    onPress={handleVnE}
                                    style={[styles.btnVnE]}>
                                    <Text text='VnExpress' style={[styles.textVnE, { fontWeight: newsName == VNEXPRESS ? '700' : 'normal' }]} />
                                </TouchableOpacity>
                                <View style={styles.popOverLine}>
                                </View>
                                <View>
                                    <TouchableOpacity
                                        onPress={handleTt}
                                        style={styles.btnTt}>
                                        <Text
                                            text='Tuổi Trẻ'
                                            style={[styles.textTt, { fontWeight: newsName == TUOITRE ? '700' : '100' }]}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    )
}

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
    }

});

// interface IPopoverBell {
//     onChangeVnE: () => void
//     onChangeTt: () => void
// }
// const PopoverBell = (props: IPopoverBell) => {
//     const { onChangeTt, onChangeVnE } = props
//     return (
//         <Popover
//             animationConfig={{ duration: 0 }}

//             verticalOffset={-30}
//             popoverStyle={{
//                 width: 129,
//                 height: 88,
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 backgroundColor: 'white'
//             }}
//             backgroundStyle={{
//                 backgroundColor: 'transparent'
//             }}
//             arrowSize={{
//                 width: 10,
//                 height: 10
//             }}
//             from={(
//                 <TouchableOpacity
//                     style={{
//                         paddingRight: 16,
//                         justifyContent: 'center',
//                     }}>
//                     <BellIcon />

//                 </TouchableOpacity>
//             )}>
//             <View
//                 style={{
//                     backgroundColor: 'white',
//                     width: 121,
//                     height: 78,
//                     shadowColor: 'black',
//                     shadowOffset: { width: -2, height: 4 },
//                     shadowOpacity: 10,
//                     shadowRadius: 30,
//                     elevation: 5,
//                     borderRadius: 10
//                 }}
//             >
//                 <View>
//                     <TouchableOpacity
//                         onPress={onChangeVnE}
//                         style={{
//                             paddingLeft: 10,
//                             marginTop: 15,
//                         }}>
//                         <TextRn
//                             style={{
//                                 color: '#000000',
//                                 fontSize: 12
//                             }}
//                         >VnExpress</TextRn>
//                     </TouchableOpacity>
//                     <View style={{
//                         height: 1,
//                         backgroundColor: '#EEEEEE',
//                         width: 151,
//                         marginTop: 7,
//                         marginBottom: 0
//                     }}>
//                     </View>
//                     <View>
//                         <TouchableOpacity
//                             onPress={onChangeTt}
//                             style={{
//                                 marginTop: 10,
//                                 marginLeft: 8
//                             }}>
//                             <TextRn
//                                 style={{
//                                     color: '#000000',
//                                     marginLeft: 5,
//                                     fontSize: 12
//                                 }}
//                             >Tuổi Trẻ </TextRn>
//                         </TouchableOpacity>

//                     </View>
//                 </View>
//             </View>
//         </Popover>
//     )
// }