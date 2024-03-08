import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';


const HomeScreen = (props: any) => {
    return (
        <View style={{
            backgroundColor: 'white',
            flex: 1,
            marginTop: 10
        }}>
            <TouchableOpacity
                onPress={() => props.navigation.navigate('Login')}
                style={{ backgroundColor: 'red' }}
            >
                <Text>Home Screeạdkasdajsn</Text>
            </TouchableOpacity>
        </View>
    )
}
export default HomeScreen