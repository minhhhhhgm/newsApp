import * as React from "react"
import { ActivityIndicator, TextStyle, View, ViewStyle , Modal, StyleSheet} from "react-native"
// import Modal from "react-native-modal"

const CONTAINER: ViewStyle = {
  // justifyContent: "center",
  backgroundColor: 'red',
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

}


export interface LoadingProps {

  style?: ViewStyle
}


export default class Loading extends React.Component {
  state = {
    isVisible: false
  }

  showLoading() {
    this.setState({ isVisible: true })
  }

  hideLoading() {
    this.setState({ isVisible: false })
  }

  render() {
    return this.state.isVisible ? (
      <View style={CONTAINER}>
        <ActivityIndicator size={"large"}  />
      </View>
    ) : null

  }
}


