import React, { useEffect, useState } from 'react';
import { Alert, AppState, Dimensions, Linking, Platform, Share, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const TestScreen = () => {
    const [platform, setPlatform] = useState('')
    const [device, setDevice] = useState('')
    const windowDimensions = Dimensions.get('window');
    const screenDimensions = Dimensions.get('screen');

    console.log('Window Dimensions: ', windowDimensions);
    console.log('Screen Dimensions: ', screenDimensions);
    return (
        <View style={styles.container}>
            <Text style={styles.txt}>
                screen width {windowDimensions.width} - screen height {windowDimensions.height}
            </Text>
            <Text style={styles.txt}>
                device width {screenDimensions.width} - device height {screenDimensions.height}
            </Text>
        </View>
    );
};

export default TestScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000',
    },
    txt: {
        color: '#d9d9d9',
        fontSize: 18,
    },
    aState: {
        color: '#fff',
    },
});