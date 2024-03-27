import React from "react";
import { Text as RNText, TextProps as RNTextProps, StyleProp, TextStyle } from "react-native";
import { i18n } from "../i18n/i18n";
import { useTranslation } from "react-i18next";


export interface TextProps extends RNTextProps {
  text?: string
  style?: StyleProp<TextStyle>
  size?: number
  children?: React.ReactNode
}

export function Text(props: TextProps) { 
  const { t, i18n } = useTranslation();

  const {  size, text, children, style: $styleOverride, ...rest } = props
  const content = text 
  const $styles: StyleProp<TextStyle> = [
    $styleOverride,
    {
        fontFamily : 'SF Pro'
    }
  ]
  return (
    <RNText {...rest} style={$styles}>
      {t(`${content}`)}
    </RNText>
  )
}



