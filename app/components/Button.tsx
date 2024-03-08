import React from "react"
import {
    StyleProp,
    TextStyle,
    TouchableOpacity,
    TouchableOpacityProps,
    ViewStyle
} from "react-native"
import { Text, TextProps } from "./Text"

export interface ButtonProps extends TouchableOpacityProps {
    text?: TextProps["text"]
    style?: StyleProp<ViewStyle>
    pressedStyle?: StyleProp<ViewStyle>
    textStyle?: StyleProp<TextStyle>
    pressedTextStyle?: StyleProp<TextStyle>
    disabledTextStyle?: StyleProp<TextStyle>
    children?: React.ReactNode
    disabled?: boolean
    disabledStyle?: StyleProp<ViewStyle>
}

export function Button(props: ButtonProps) {
    const {
        text,
        style: $viewStyleOverride,
        pressedStyle: $pressedViewStyleOverride,
        textStyle: $textStyleOverride,
        pressedTextStyle: $pressedTextStyleOverride,
        disabledTextStyle: $disabledTextStyleOverride,
        children,
        disabled,
        onPress,
        disabledStyle: $disabledViewStyleOverride,
        ...rest
    } = props
    const $viewStyle: StyleProp<TextStyle> = [
        $viewStyleOverride,
        !!disabled && $disabledViewStyleOverride,
    ]
    const $textStyle: StyleProp<TextStyle> = [
        $textStyleOverride,
        !!disabled && $disabledTextStyleOverride,
    ]

    return (
        <TouchableOpacity
            onPress={onPress}
            style={$viewStyle}
            {...rest}
            disabled={disabled}
        >
            <Text text={text} style={$textStyle}>
                {children}
            </Text>
        </TouchableOpacity>
    )
}



