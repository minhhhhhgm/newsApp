import moment from 'moment';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import Timetable from "react-native-calendar-timetable";

const TestCalendarScreen = () => {
    const [date] = React.useState(new Date());
    console.log('TIme', moment().subtract(3, 'hour').toDate());
const time = moment().subtract(0, 'hour').toDate();
 console.log(moment(time).format('YYYY-MM-DD hh-mm'));
 
    const [from] = React.useState(moment().subtract(9, 'days').toDate());
    const [till] = React.useState(moment().add(3, 'days').toISOString());
    const range = { from, till :moment().add(3, 'days').toISOString() };
    const [items] = React.useState([
        {
            title: 'Test',
            startDate: moment().subtract(3, 'hour').toDate(),
            endDate: moment().add(100, 'hour').toDate(),
            type:'aj'
        },
        {
            title: 'AAAA',
            startDate: moment().subtract(0, 'hour').toDate(),
            endDate: moment().add(1, 'hour').toDate(),
        },
        
    ]);

    function YourComponent({ style, item, dayIndex, daysTotal }: any) {
        console.log('====',item.type);
        
        return (
            <View style={{
                ...style, // apply calculated styles, be careful not to override these accidentally (unless you know what you are doing)
                flex: 1
            }}>
                <View style={{
                    backgroundColor: 'red',
                    // padding: 10,
                    // alignItems:'center',
                    // width : item.title == 'Test' ? 50 : null,
                   
                    // justifyContent: 'space-between',
                    // flexDirection: 'column',

                }}>
                    <View style={{
                        // padding: 5
                        alignSelf: 'flex-start',
                    }}>
                        <Text>{item.title}</Text>
                    </View>
                    <View>
                        <Text>{item.title}</Text>
                        {/* <Text>{dayIndex} of {daysTotal}</Text> */}
                    </View>

                </View>

            </View>
        );
    }

    return (
        <ScrollView>
            <Timetable
                hideNowLine={true}
                
                items={items}
                renderItem={props => <YourComponent {...props} />}

                date={date}
                fromHour={8}
                toHour={24}
                //@ts-ignore
                range={range}
                style={{
                    // lines: { backgroundColor: 'yellow' },
                    timeContainer: {
                        // backgroundColor :'black'
                    },
                    // time :{backgroundColor : 'red'},
                    nowLine: {
                        line: {
                            backgroundColor: 'black'
                        },
                        dot: {
                            backgroundColor: 'red'
                        }
                    },
                    contentContainer: {
                        // backgroundColor: 'black'
                    },
                    headerText:{
                        color:'red'
                    },
                    container:{
                        // borderRadius: 15,
                        // width:
                    }
                    // ti
                }}
            />
        </ScrollView>
    );
};



export default TestCalendarScreen;