import React from "react";
import { useTranslation } from "react-i18next";
import { Text as RNText, TextProps as RNTextProps, StyleProp, TextStyle } from "react-native";


export interface TextProps extends RNTextProps {
  text?: string
  style?: StyleProp<TextStyle>

}

export function Text(props: TextProps) {
  const { t } = useTranslation();
  const { text, style: styleOverride } = props
  const styles: StyleProp<TextStyle> = [
    styleOverride,
    {
      fontFamily: 'SFPRODISPLAYMEDIUM',
    }
  ]
  return (
    <RNText style={styles}>
      {t(`${text}`)}
    </RNText>
  )
}



