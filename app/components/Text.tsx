import React from "react";
import { useTranslation } from "react-i18next";
import { Text as RNText, TextProps as RNTextProps, StyleProp, TextStyle } from "react-native";


export interface TextProps extends RNTextProps {
  text?: string
  style?: StyleProp<TextStyle>
  size?: number
  children?: React.ReactNode
}

export function Text(props: TextProps) { 
  const { t } = useTranslation();

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



