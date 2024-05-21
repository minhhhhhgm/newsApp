import moment from 'moment';
import React from 'react';
import { Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import Timetable from 'react-native-calendar-timetable';
const { width, height } = Dimensions.get('screen');
import { Calendar, LocaleConfig } from 'react-native-calendars';

const TestCalendarSecond = () => {
    const [from] = React.useState(moment().startOf('week').toDate());
    const [till] = React.useState(moment().endOf('week').toDate());
    const range = { from, till };


    const today = moment().startOf('day').toDate();


    console.log('TIME :', moment(today).set({ hour: 9, minute: 0 }).toDate(), today);
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
        {
            title: '予約',
            subtitle: '12:35',
            startDate: moment(today).set({ hour: 22, minute: 0 }).toDate(),
            endDate: moment(today).set({ hour: 24, minute: 0 }).toDate(),
            color: '#F5F5F5'
        },
        {
            title: '運転',
            startDate: moment(today).set({ hour: 19, minute: 30 }).toDate(),
            endDate: moment(today).set({ hour: 22, minute: 30 }).toDate(),
            color: 'pink'
        },
    ]);


    const YourComponent = ({ style, item, daysTotal }: any) => {
        console.log('daysTotal', daysTotal);

        const columnStyle = item.title === "予約" ? styles.smallColumn : styles.largeColumn;
        return (
            <View style={{
                ...style,
                ...columnStyle,
                backgroundColor: item.color,
                borderRadius: 8,
                padding: 10,
                // width : 50,
                // height : 50,
                justifyContent: 'space-between'
            }}>
                <Text style={[]}>{item.title}</Text>
                {item.subtitle && <Text style={{
                    fontSize: 11
                }}>{item.subtitle}</Text>}
            </View>
        );
    };


    return (
        <SafeAreaView style={{
            backgroundColor: 'gray',
            flex: 1,
            flexDirection: 'row'
        }}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            >
                <View
                    style={{
                        marginTop: 20,
                        // marginHorizontal: 16,
                        backgroundColor: 'white',
                        borderRadius: 9,
                    }}>
                    <Timetable
                        items={items}
                        renderItem={(props) => <YourComponent {...props} />}
                        date={today}
                        fromHour={8}
                        columnWidth={width - 32}
                        toHour={24}
                        renderHour={(hour) => (
                            <View style={styles.hourContainer}>
                                <Text style={styles.hourText}>{`${hour}:00`}</Text>
                            </View>
                        )}
                        hideNowLine
                        columnHorizontalPadding={0}
                        hourHeight={40}
                        // width={width - 48}
                        style={{
                            contentContainer: styles.contentContainer,
                            lines: styles.lines,
                            // nowLine: {
                            //     dot: styles.nowLineDot,
                            //     line: styles.nowLineLine,
                            // },
                        }}
                    />
                </View>
                {/* <Calendar
                    // Hiển thị tháng và năm hiện tại
                    // current={'2024-01-01'}
                    // Giao diện tùy chỉnh
                    theme={{
                        backgroundColor: 'red',
                        calendarBackground: 'red',
                        textSectionTitleColor: '#000000',
                        selectedDayBackgroundColor: '#5ce1e6',
                        selectedDayTextColor: '#ffffff',
                        todayTextColor: '#5ce1e6',
                        dayTextColor: '#2d4150',
                        textDisabledColor: '#d9e1e8',
                        dotColor: '#00adf5',
                        selectedDotColor: '#ffffff',
                        arrowColor: '#000000',
                        monthTextColor: '#000000',
                        indicatorColor: '#000000',
                        // textDayFontFamily: 'monospace',
                        // textMonthFontFamily: 'monospace',
                        // textDayHeaderFontFamily: 'monospace',
                        // textDayFontWeight: '300',
                        // textMonthFontWeight: 'bold',
                        // textDayHeaderFontWeight: '300',
                        textDayFontSize: 16,
                        textMonthFontSize: 16,
                        textDayHeaderFontSize: 160,

                    }}
                // Định dạng các ngày đã chọn
                // markedDates={{
                //     '2024-11-05': { selected: true, marked: true, selectedColor: '#5ce1e6' },
                //     '2024-11-06': { marked: true, dotColor: '#5ce1e6' },
                //     '2024-11-07': { marked: true, dotColor: '#5ce1e6' },
                //     '2024-11-08': { disabled: true, disableTouchEvent: true }
                // }}
                /> */}
            </ScrollView>
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
    contentScroll: {},
    container: {
        borderRadius: 16,
    },
    contentContainer: {
        // borderRadius: 16,
        marginBottom: 10,
        // alignSelf: 'center'
    },
    headerContainer: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    timeContainer: {},
    time: {
        fontSize: 12,
        color: '#555',
    },
    lines: {
        borderColor: '#EDEDED',
        borderLeftWidth: 0,
        borderRightWidth: 0,
        // marginRight : 20
    },
    nowLineDot: {
        width: 10,
        height: 10,
        backgroundColor: 'red',
        borderRadius: 5,
    },
    nowLineLine: {
        height: 2,
        backgroundColor: 'red',
    },
    hourContainer: {
        backgroundColor: 'transparent'
    },
    hourText: {
        fontSize: 12,
        color: '#606163',
    },
});


export default TestCalendarSecond;