import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '../../components/Text';
import { headBlackColor } from '../../utils/color';
import { logoLogin } from '../../utils/const';
import WebView from 'react-native-webview';
import { useRoute } from '@react-navigation/native';

const DetailScreen = (props: any) => {
    const insets = useSafeAreaInsets();
    const route = useRoute();
    const { link } = route.params as any;
    console.log(link);
    
    return (
        <>
            <View style={{
                height: 50,
                backgroundColor: 'red'
            }}>
                <Text>akjsdkasjdka</Text>
            </View>
            <WebView source={{ uri: 'https://vnexpress.net/khach-nem-xu-cau-may-vao-dong-co-may-bay-trung-quoc-4719885.html' }} />
        </>
    );
};

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: 'white',
    },
    logo: {
        alignItems: 'center',
    },
    headerText: {
        fontWeight: '700',
        fontSize: 18,
        marginTop: 20,
        color: headBlackColor
    },
    textField: {
        marginHorizontal: 46,
        marginTop: 25
    },
    button: {
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 49,
        alignSelf: 'center',
        marginTop: 79
    }
});

export default DetailScreen;