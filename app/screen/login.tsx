import React, {ReactNode} from 'react';
import {SafeAreaView, StyleSheet, View, StatusBar, Text} from 'react-native';
import DragonSvg from '../icons/search_unselected.svg'
import HomeSelectedIcon from '../icons/svg-component/homeSelectedIcon';
import HomeUnSelectedIcon from '../icons/svg-component/homeUnSelectedIcon';

const LoginScreen: () => ReactNode = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View style={styles.body}>
            <Text>ajdffks</Text>
          <HomeSelectedIcon/>
          <HomeUnSelectedIcon/>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  body: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

export default LoginScreen;