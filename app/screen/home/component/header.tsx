import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, Image, RefreshControl, StyleSheet, Text as TextRn, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { logoLogin } from '../../../utils/const';
import { Text } from '../../../components/Text';
import Popover, { PopoverMode, PopoverPlacement } from 'react-native-popover-view';
import BellIcon from '../../../icons/svg-component/BellIcon';

interface IHeader {
    newsName: string
    onChangeVnE: () => void
    onChangeTt: () => void
}


export const Header = (props: IHeader) => {
    const insets = useSafeAreaInsets();
    const { newsName , onChangeTt, onChangeVnE } = props

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
                    text={newsName.toString()}
                    style={{
                        fontWeight: '700',
                        fontSize: 15,
                        color: '#180E19',
                        marginLeft: 10
                    }}
                />
            </View>
            <PopoverBell onChangeTt={onChangeTt} onChangeVnE={onChangeVnE}/>
        </View>
    )
}



interface IPopoverBell {
    onChangeVnE: () => void
    onChangeTt: () => void
}
const PopoverBell = (props : IPopoverBell) => {
    const {onChangeTt , onChangeVnE} = props
    return (
        <Popover
            animationConfig={{ duration: 0 }}

            verticalOffset={-30}
            popoverStyle={{
                width: 129,
                height: 88,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'white'
            }}
            backgroundStyle={{
                backgroundColor: 'transparent'
            }}
            arrowSize={{
                width: 10,
                height: 10
            }}
            from={(
                <TouchableOpacity
                    style={{
                        paddingRight: 16,
                        justifyContent: 'center',
                    }}>
                    <BellIcon />

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
                        onPress={ onChangeVnE}
                        style={{
                            paddingLeft: 10,
                            marginTop: 15,
                        }}>
                        <TextRn
                            style={{
                                color: '#000000',
                                fontSize: 12
                            }}
                        >VnExpress</TextRn>
                    </TouchableOpacity>
                    <View style={{
                        height: 1,
                        backgroundColor: '#EEEEEE',
                        width: 151,
                        marginTop: 7,
                        marginBottom: 0
                    }}>
                    </View>
                    <View>
                        <TouchableOpacity
                            onPress={onChangeTt}
                            style={{
                                marginTop: 10,
                                marginLeft: 8
                            }}>
                            <TextRn
                                style={{
                                    color: '#000000',
                                    marginLeft: 5,
                                    fontSize: 12
                                }}
                            >Tuổi Trẻ </TextRn>
                        </TouchableOpacity>

                    </View>
                </View>
            </View>
        </Popover>
    )
}