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

    const YourComponent = ({ style, item, index }: any) => {
        console.log(item);

        const columnStyle = item.title === "予約" ? styles.smallColumn : styles.largeColumn;
        return (
            <View style={{ ...style, ...columnStyle, backgroundColor: item.color, borderRadius: 10, padding: 10 , justifyContent:'space-between' }}>
                <Text>{item.title}</Text>
                {item.subtitle && <Text>{item.subtitle}</Text>}
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                
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
                    style={{
                        container: styles.container,
                        contentContainer: styles.contentContainer,
                        headerContainer: styles.headerContainer,
                        headerText: styles.headerText,
                        headersContainer: styles.headersContainer,
                        timeContainer: styles.timeContainer,
                        time: styles.time,
                        lines: styles.lines,
                        nowLine: {
                            dot: styles.nowLineDot,
                            line: styles.nowLineLine,
                        },
                    }}
               
                />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    smallColumn: {
        // Thêm các style tùy chỉnh cho cột đầu tiên ở đây
        width: '15%', // Ví dụ: Thiết lập chiều rộng của cột đầu tiên là 30%
    },
    // Style cho cột thứ hai (lớn hơn)
    largeColumn: {
        // Thêm các style tùy chỉnh cho cột thứ hai ở đây
        width: '50%', // Ví dụ: Thiết lập chiều rộng của cột thứ hai là 70%
        position: 'absolute',
        left: 150
    },
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    contentContainer: {
        // padding: 10,
    },
    headerContainer: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    headersContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
    },
    timeContainer: {
        width: 50,
        alignItems: 'center',
    },
    time: {
        fontSize: 12,
        color: '#555',
    },
    lines: {
        // height:'100%',
        backgroundColor: 'white',
    },
    nowLineDot: {
        width: 10,
        height: 10,
        backgroundColor: 'transparent',
        borderRadius: 5,
        // position: 'absolute',
        // top: 0,
    },
    nowLineLine: {
        height: 2,
        backgroundColor: 'transparent',
    },
    hourContainer: {
        height: 60,
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    hourText: {
        fontSize: 12,
        color: '#555',
    },
});

export default TestCalendarSecond;
