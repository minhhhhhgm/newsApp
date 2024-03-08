import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { WebView } from 'react-native-webview';


const HomeScreen = (props: any) => {
    return (
        <>
        <View style={{
            height: 50,
            backgroundColor:'red'
        }}>
            <Text>akjsdkasjdka</Text>
        </View>
         <WebView source={{ uri: 'https://vnexpress.net/khach-nem-xu-cau-may-vao-dong-co-may-bay-trung-quoc-4719885.html' }} />
        </>
       
    )
}
export default HomeScreen