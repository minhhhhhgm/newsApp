import React, { useState } from "react";
import { ActivityIndicator, View, ViewStyle } from "react-native";

const CONTAINER: ViewStyle = {
  backgroundColor: 'black',
  opacity: 0.5,
  flex: 1,
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  justifyContent: "center",
  alignItems: "center",
  zIndex: 10
};

interface LoadingProps {
  isVisible?: boolean
}

const Loading = (props: LoadingProps) => {
  return props.isVisible ? (
    <View style={[CONTAINER]}>
      <ActivityIndicator size={"large"} />
    </View>
  ) : null;
};

export default Loading;
