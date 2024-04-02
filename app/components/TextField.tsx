import React, { ComponentType, forwardRef, Ref, useImperativeHandle, useRef } from "react"
import {
    StyleProp,
    TextInput,
    TextInputProps,
    TextStyle,
    TouchableOpacity,
    View,
    ViewStyle,
} from "react-native"

import { Text, TextProps } from "./Text"
import { i18n } from "../i18n/i18n"
import { useTranslation } from "react-i18next"

export interface TextFieldAccessoryProps {
    style: StyleProp<any>
    status: TextFieldProps["status"]
    multiline: boolean
    editable: boolean
}

export interface TextFieldProps extends Omit<TextInputProps, "ref"> {
   
    status?: "error" | "disabled"
    
    label?: TextProps["text"]
    
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

export const TextField = forwardRef(function TextField(props: TextFieldProps, ref: Ref<TextInput>) {
    const {

        label,
        placeholder,
        helper,
        status,
        RightAccessory,
        LeftAccessory,
        HelperTextProps,
        LabelTextProps,
        style: $inputStyleOverride,
        containerStyle: $containerStyleOverride,
        inputWrapperStyle: $inputWrapperStyleOverride,
        value,
        ...TextInputProps
    } = props
  const { t, i18n } = useTranslation();

    const input = useRef<TextInput>(null)

    const disabled = TextInputProps.editable === false || status === "disabled"

    const placeholderContent = placeholder

    const $containerStyles = [$containerStyleOverride]

    const $labelStyles = [$labelStyle, LabelTextProps?.style]

    const $inputWrapperStyles = [
        $inputWrapperStyle,
        status === "error" && { borderColor: 'red' },
        TextInputProps.multiline && { minHeight: 112 },
        LeftAccessory && { paddingStart: 0 },
        RightAccessory && { paddingEnd: 0 },
        $inputWrapperStyleOverride,
    ]

    const $inputStyles: StyleProp<TextStyle> = [
        $inputStyle,
        disabled && { color: 'red' },
        TextInputProps.multiline && { height: "auto" },
        $inputStyleOverride,
    ]

    const $helperStyles = [
        $helperStyle,
        status === "error" && { color: 'red' },
        HelperTextProps?.style,
    ]

    /**
     *
     */
    function focusInput() {
        if (disabled) return

        input.current?.focus()
    }

    useImperativeHandle(ref, () => input.current as TextInput)

    return (
        <TouchableOpacity
            activeOpacity={1}
            style={$containerStyles}
            onPress={focusInput}
            accessibilityState={{ disabled }}
        >
            {!!(label && value) && (
                <Text
                    text={label}
                    style={$labelStyles}
                />
            )}
            <View style={$inputWrapperStyles}>
                {!!LeftAccessory && (
                    <LeftAccessory
                        style={$leftAccessoryStyle}
                        status={status}
                        editable={!disabled}
                        multiline={TextInputProps.multiline ?? false}
                    />
                )}
                <TextInput
                    ref={input}
                    underlineColorAndroid={'transparent'}
                    placeholder={t(placeholderContent)}
                    placeholderTextColor={'gray'}
                    {...TextInputProps}
                    editable={!disabled}
                    style={$inputStyles}
                    value={value}
                />
                {!!RightAccessory && (
                    <RightAccessory
                        style={$rightAccessoryStyle}
                        status={status}
                        editable={!disabled}
                        multiline={TextInputProps.multiline ?? false}
                    />
                )}
            </View>
            {!!(helper) && (
                <Text
                    text={helper}
                    style={$helperStyles}
                />
            )}
        </TouchableOpacity>
    )
})

const $labelStyle: TextStyle = {
    position: 'absolute',
    zIndex: 1
}

const $inputWrapperStyle: ViewStyle = {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor:'#909090',
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