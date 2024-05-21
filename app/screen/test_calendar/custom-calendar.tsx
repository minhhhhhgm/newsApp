import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import moment from 'moment';
import 'moment/locale/vi';

moment.locale('vi');

const CustomWeekCalendar = () => {
    const [currentDate, setCurrentDate] = useState(moment());

    const startOfWeek = currentDate.clone().startOf('week');
    const endOfWeek = currentDate.clone().endOf('week');

    const handlePrevWeek = () => {
        setCurrentDate(currentDate.clone().subtract(1, 'week'));
    };

    const handleNextWeek = () => {
        setCurrentDate(currentDate.clone().add(1, 'week'));
    };

    const renderDays = () => {
        let days = [];
        let day = startOfWeek;

        for (let i = 0; i < 7; i++) {
            days.push(
                <View key={i} style={styles.dayContainer}>
                    <Text style={styles.dayText}>{day.format('D')}</Text>
                    <Text style={[styles.dayNameText, day.isSame(currentDate, 'day') && styles.selectedDay]}>
                        {day.format('dd')}
                    </Text>
                </View>
            );
            day = day.clone().add(1, 'day');
        }
        return days;
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handlePrevWeek}>
                    <Text style={styles.arrow}>{"<"}</Text>
                </TouchableOpacity>
                <Text style={styles.monthText}>{currentDate.format('MMMM YYYY')}</Text>
                <TouchableOpacity onPress={handleNextWeek}>
                    <Text style={styles.arrow}>{">"}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.weekContainer}>{renderDays()}</View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#ffffff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    monthText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    arrow: {
        fontSize: 20,
        color: '#000',
    },
    weekContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    dayContainer: {
        alignItems: 'center',
        flex: 1,
    },
    dayText: {
        fontSize: 16,
        color: '#000',
    },
    dayNameText: {
        fontSize: 16,
        color: '#000',
    },
    selectedDay: {
        backgroundColor: '#5ce1e6',
        borderRadius: 15,
        padding: 5,
        color: '#ffffff',
    },
});

export default CustomWeekCalendar;
