import React from "react"
import { StyleProp, Text as RNText, TextProps as RNTextProps, TextStyle } from "react-native"
import { i18n, useLanguage } from "../i18n/i18n";


export interface TextProps extends RNTextProps {
  text?: string
  style?: StyleProp<TextStyle>
  size?: number
  children?: React.ReactNode
}

export function Text(props: TextProps) {
  // const i18n = new I18n(translations)
  // i18n.locale = "ru"
  // i18n.enableFallback = true
  // i18n.defaultLocale = "de"
  
  const {  size, text, children, style: $styleOverride, ...rest } = props
  const content = text 
  const $styles: StyleProp<TextStyle> = [
    $styleOverride,
    {
        fontFamily : 'SF Pro'
    }
  ]
  // const {t, i18n} = useTranslation();
  return (
    <RNText {...rest} style={$styles}>
      {i18n.t(`${content}`)}
    </RNText>
  )
}



