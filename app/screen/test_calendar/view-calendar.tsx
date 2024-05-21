import React from 'react';
import { Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import TestCalendarSecond from './test-calendar-second';
const { width, height } = Dimensions.get('screen');

const ViewCalendar= () => {
   

    return (
        <View style={{
            // backgroundColor:'white',
            // borderRadius:99
            // marginHorizontal: 100
            // paddingHorizontal:5
        }}>
          <TestCalendarSecond />  
        </View>
    );
};

const styles = StyleSheet.create({
   
});

export default ViewCalendar;
