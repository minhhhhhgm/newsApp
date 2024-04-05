import React, { ComponentType, useRef } from "react"
import {
    StyleProp,
    TextInput,
    TextInputProps,
    TextStyle,
    TouchableOpacity,
    View,
    ViewStyle,
} from "react-native"

import { useTranslation } from "react-i18next"
import { Text, TextProps } from "./Text"

export interface TextFieldAccessoryProps {
    style: StyleProp<any>
}

export interface TextFieldProps extends TextInputProps {
    label?: string
    LabelTextProps?: TextProps
    helper?: string | any
    HelperTextProps?: TextProps
    placeholder?: any
    style?: StyleProp<TextStyle>
    containerStyle?: StyleProp<ViewStyle>
    inputWrapperStyle?: StyleProp<ViewStyle>
    RightAccessory?: ComponentType<TextFieldAccessoryProps>
    LeftAccessory?: ComponentType<TextFieldAccessoryProps>
}

export const TextField = (props: TextFieldProps) => {
    const {
        label,
        placeholder,
        helper,
        RightAccessory,
        LeftAccessory,
        style: $inputStyleOverride,
        containerStyle: $containerStyleOverride,
        inputWrapperStyle: $inputWrapperStyleOverride,
        value,
        ...TextInputProps
    } = props
    const { t } = useTranslation();
    const input = useRef<TextInput>(null)
    function focusInput() {
        input.current?.focus()
    }


    return (
        <TouchableOpacity
            activeOpacity={1}
            style={$containerStyleOverride}
            onPress={focusInput}>
            {(label && value) && (
                <Text
                    text={label}
                    style={$labelStyle}
                />
            )}
            <View style={[
                $inputWrapperStyle,
                $inputWrapperStyleOverride,
            ]}>
                {LeftAccessory && (
                    <LeftAccessory style={$leftAccessoryStyle} />
                )}
                <TextInput
                    ref={input}
                    underlineColorAndroid={'transparent'}
                    placeholder={t(placeholder)}
                    placeholderTextColor={'gray'}
                    style={[
                        $inputStyle,
                        $inputStyleOverride,
                    ]}
                    value={value}
                    {...TextInputProps}
                />
                {RightAccessory && (
                    <RightAccessory style={$rightAccessoryStyle} />
                )}
            </View>
            {(helper) && (
                <Text
                    text={helper}
                    style={$helperStyle}
                />
            )}
        </TouchableOpacity>
    )
}

const $labelStyle: TextStyle = {
    position: 'absolute',
    zIndex: 1
}

const $inputWrapperStyle: ViewStyle = {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: '#909090',
    overflow: "hidden",
}

const $inputStyle: TextStyle = {
    paddingVertical: 0,
    paddingHorizontal: 0,
    minHeight: 50,
    fontSize: 14,
    // paddingTop: 25,
    flex: 1,
    color: '#180E19'
}

const $helperStyle: TextStyle = {
    marginTop: 6,
    color: '#BA1818',
    position: 'absolute',
    bottom: -25
}

const $rightAccessoryStyle: ViewStyle = {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
}
const $leftAccessoryStyle: ViewStyle = {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
}