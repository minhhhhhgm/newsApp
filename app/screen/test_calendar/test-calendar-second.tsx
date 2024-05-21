import moment from 'moment';
import React from 'react';
import { Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import Timetable from 'react-native-calendar-timetable';
const { width, height } = Dimensions.get('screen');

const TestCalendarSecond = () => {
    const [from] = React.useState(moment().startOf('week').toDate());
    const [till] = React.useState(moment().endOf('week').toDate());
    const range = { from, till };

    const today = moment().startOf('day').toDate();

    const [items] = React.useState([
        {
            title: '予約',
            subtitle: '12:35',
            startDate: moment(today).set({ hour: 9, minute: 0 }).toDate(),
            endDate: moment(today).set({ hour: 12, minute: 35 }).toDate(),
            color: '#F5F5F5'
        },
        {
            title: '運転',
            subtitle: '運転評価:A(95点)',
            startDate: moment(today).set({ hour: 10, minute: 0 }).toDate(),
            endDate: moment(today).set({ hour: 12, minute: 0 }).toDate(),
            color: '#D9F8F1'
        },
        {
            title: '予約',
            subtitle: '18:00',
            startDate: moment(today).set({ hour: 13, minute: 30 }).toDate(),
            endDate: moment(today).set({ hour: 18, minute: 0 }).toDate(),
            color: '#F5F5F5'
        },
        {
            title: '休憩',
            startDate: moment(today).set({ hour: 14, minute: 30 }).toDate(),
            endDate: moment(today).set({ hour: 15, minute: 30 }).toDate(),
            color: '#D9F8F1'
        },
        {
            title: '運転',
            startDate: moment(today).set({ hour: 16, minute: 30 }).toDate(),
            endDate: moment(today).set({ hour: 17, minute: 30 }).toDate(),
            color: '#D9F8F1'
        },
    ]);

    const YourComponent = ({ style, item }: any) => {
        const columnStyle = item.title === "予約" ? styles.smallColumn : styles.largeColumn;
        return (
            <View style={{
                ...style,
                ...columnStyle,
                backgroundColor: item.color,
                borderRadius: 8,
                padding: 10,
                justifyContent: 'space-between'
            }}>
                <Text style={[]}>{item.title}</Text>
                {item.subtitle && <Text>{item.subtitle}</Text>}
            </View>
        );
    };

    return (
        <SafeAreaView >
            <View style={{
                // padding : 10,
                // backgroundColor : 'red'
            }}>
            <ScrollView style={{
                
            }}>
                <Timetable
                    items={items}
                    renderItem={(props) => <YourComponent {...props} />}
                    date={today}
                    fromHour={8}
                    toHour={24}
                    renderHour={(hour) => (
                        <View style={styles.hourContainer}>
                            <Text style={styles.hourText}>{`${hour}:00`}</Text>
                        </View>
                    )}
                    // enableSnapping
                    // hideNowLine
                    // columnHorizontalPadding={0}
                    // itemMinHeightInMinutes={999}
                    
                    // khoảng cách giữa các giờ
                    hourHeight={40}


                    // width={350}
                    // timeWidth={50}

                    // columnWidth={width - 50}
                    // columnHeaderHeight={999}
                    // linesTopOffset={10}
                    // linesLeftInset={99}
                    style={{
                        container: styles.container,
                        contentContainer: styles.contentContainer,
                        headerContainer:{
                            backgroundColor: 'black',

                        },
                        // headerContainer: styles.headerContainer,
                        // headerText: styles.headerText,
                        // headersContainer: styles.headersContainer,
                        timeContainer: styles.timeContainer,
                        // time: styles.time,
                        lines: styles.lines,
                        nowLine: {
                            dot: styles.nowLineDot,
                            line: styles.nowLineLine,
                        },
                        
                    }}

                />
            </ScrollView>
            </View>
          
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    smallColumn: {
        width: '15%', 
    },
    largeColumn: {
        width: '60%', 
        position: 'absolute',
        left: '35%'
    },
    container: {
        marginVertical : 100,
        marginBottom:100,
        // paddingBottom : 50,
        // borderBottomColor:'red',
        // borderBottomWidth : 1
        // borderRadius : 10
    },
    contentContainer: {
        backgroundColor:'red',
        width: width - 8,
        borderRadius :  10,
        paddingBottom : 15
    },
    headerContainer: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
    
    },
    headersContainer: {
        // flexDirection: 'row',
        // justifyContent: 'space-between',
        // paddingVertical: 10,
    },
    timeContainer: {
        // width: 50,
        // alignItems: 'center',
        // backgroundColor
    },
    time: {
        fontSize: 12,
        color: '#555',
    },
    lines: {
        // backgroundColor: 'red',
        // marginVertical:10,
        borderColor:'#EDEDED',
    },
    nowLineDot: {
        width: 10,
        height: 10,
        backgroundColor: 'transparent',
        borderRadius: 5,
    },
    nowLineLine: {
        height: 2,
        backgroundColor: 'transparent',
    },
    hourContainer: {
        height: 50,
        backgroundColor:'transparent',
        alignSelf:'center'
        
    },
    hourText: {
        fontSize: 12,
        color: '#606163',
    },
});

export default TestCalendarSecond;
