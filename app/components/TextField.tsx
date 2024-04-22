import React, { ReactElement, useRef } from "react"
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
import { COLOR } from "../utils/color"
import { Text, TextProps } from "./Text"


export interface TextFieldProps extends TextInputProps {
    label?: string
    LabelTextProps?: TextProps
    helper?: string | any
    HelperTextProps?: TextProps
    placeholder?: any
    style?: StyleProp<TextStyle>
    containerStyle?: StyleProp<ViewStyle>
    inputWrapperStyle?: StyleProp<ViewStyle>
    RightIcon?: ReactElement
    LeftIcon?: ReactElement
    mode?: boolean
}

export const TextField = (props: TextFieldProps) => {
    const {
        label,
        placeholder,
        helper,
        RightIcon,
        LeftIcon,
        style,
        containerStyle,
        inputWrapperStyle,
        value,
        mode,
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
            style={containerStyle}
            onPress={focusInput}>
            {(label && value) && (
                <Text
                    text={label}
                    style={[labelStyle, { color: mode ? COLOR.white : COLOR.black }]}
                />
            )}
            <View style={[
                inputWrapperStyleRoot,
                inputWrapperStyle,
            ]}>
                {LeftIcon && (
                    LeftIcon
                )}
                <TextInput
                    ref={input}
                    underlineColorAndroid={'transparent'}
                    placeholder={t(placeholder)}
                    placeholderTextColor={'gray'}
                    style={[
                        inputStyle,
                        style,
                    ]}
                    value={value}
                    {...TextInputProps}
                />
                {RightIcon && (
                    <View style={rightAccessoryStyle}>
                        {RightIcon}
                    </View>

                )}
            </View>
            {(helper) && (
                <Text
                    text={helper}
                    style={helperStyle}
                />
            )}
        </TouchableOpacity>
    )
}

const labelStyle: TextStyle = {
    position: 'absolute',
    zIndex: 1,
    color: COLOR.black
}

const inputWrapperStyleRoot: ViewStyle = {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: '#909090',
    overflow: "hidden",
}

const inputStyle: TextStyle = {
    paddingVertical: 0,
    paddingHorizontal: 0,
    minHeight: 50,
    fontSize: 14,
    // paddingTop: 25,
    flex: 1,
    color: '#180E19'
}

const helperStyle: TextStyle = {
    marginTop: 6,
    color: '#BA1818',
    position: 'absolute',
    bottom: -25
}

const rightAccessoryStyle: ViewStyle = {
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 20
}
