import React, { useState } from 'react';
import { ScrollView, StyleSheet, Switch, View } from 'react-native';
import { Text } from '../../components/Text';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '../../components/Button';
import { setInterest } from '../../utils/storage';
export interface DataInterests {
    text: string,
    isCheck?: boolean,
    endpoint: string
}
const InterestsScreen = (props: any) => {
    const [all, setAll] = React.useState(true);
    const [worldNew, setWorldNew] = React.useState(true);
    const [politics, setPolitics] = React.useState(true);
    const [technology, setTechnology] = React.useState(true);
    const [science, setScience] = React.useState(true);
    const [business, setBusiness] = React.useState(true);
    const [entertaiment, setEntertaiment] = React.useState(true);
    const [food, setFood] = React.useState(true);
    const insets = useSafeAreaInsets();
    const [isShown, setIsShown] = useState(false);
    const dataInterests = [
        {
            text: 'All',
            isCheck: all,
            endpoint: 'tin-moi-nhat'
        },
        {
            text: 'World News',
            isCheck: worldNew,
            endpoint: 'the-gioi'

        },
        {
            text: 'Politics',
            isCheck: politics,
            endpoint: 'thoi-su'
        },
        {
            text: 'Technology',
            isCheck: technology,
            endpoint: 'khoa-hoc'
        },
        {
            text: 'Science',
            isCheck: science,
            endpoint: 'so-hoa'
        },
        {
            text: 'Business',
            isCheck: business,
            endpoint: 'kinh-doanh'
        },
        {
            text: 'Entertainment',
            isCheck: entertaiment,
            endpoint: 'giai-tri'
        },
        {
            text: 'Food',
            isCheck: food,
            endpoint: 'doi-song'
        },
    ];
    const toggleTheBox = (index: number) => {
        if (index == 0) {
            setAll(true);
            setWorldNew(true);
            setPolitics(true);
            setTechnology(true);
            setScience(true);
            setBusiness(true);
            setEntertaiment(true);
            setFood(true);
            if (all) {
                setAll(false);
                setWorldNew(false);
                setPolitics(false);
                setTechnology(false);
                setScience(false);
                setBusiness(false);
                setEntertaiment(false);
                setFood(false);
            }
        }
        else if (index == 1) {
            setAll(false);
            setWorldNew(!worldNew);
        }
        else if (index == 2) {
            setAll(false);
            setPolitics(!politics);
        }
        else if (index == 3) {
            setAll(false);
            setTechnology(!technology);
        }
        else if (index == 4) {
            setAll(false);
            setScience(!science);
        }
        else if (index == 5) {
            setAll(false);
            setBusiness(!business);
        }
        else if (index == 6) {
            setAll(false);
            setEntertaiment(!entertaiment);
        }
        else if (index == 7) {
            setAll(false);
            setFood(!food);
        }

    };
    async function getCheckedItems() {
        let checkedItems: DataInterests[] = [];
        dataInterests.map((item, index) => {
            if (item.isCheck && index !== 0) {
                checkedItems.push(item);
            }
            if (item.isCheck && index == 0) {
                checkedItems.push({
                    text: 'For You',
                    endpoint: 'tin-moi-nhat'
                });
            }
            // if (!item.isCheck) {
            //     checkedItems = []
            // }
        });
        // if (checkedItems.length == 0) {
        // }
        if (!all) {
            checkedItems.unshift({
                text: 'For You',
                endpoint: 'tin-moi-nhat'
            })
        }        
        await setInterest(JSON.stringify(checkedItems))
        props.navigation.navigate('BottomNavigation', { screen: 'Home', params: { data: checkedItems } })

    }
    return (
        <View style={[styles.body, { paddingTop: 22 + insets.top }]}>
            <Text
                text='Interests'
                style={styles.headerText}
            />
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                {dataInterests.map((item, index) => {
                    return (
                        <View key={index}>
                            <View style={{
                                flexDirection: 'row',
                                paddingHorizontal: 16,
                                justifyContent: 'space-between'
                            }}>
                                <Text
                                    style={{
                                        fontSize: 14,
                                        fontWeight: index == 0 ? '700' : '500',
                                        color: '#000000'
                                    }}
                                    text={item.text} />
                                <Switch
                                    trackColor={{ false: "#767577", true: "#180E19" }}
                                    thumbColor={item.isCheck ? "white" : "#ddd"}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={() => { toggleTheBox(index) }}
                                    value={item.isCheck}
                                />
                            </View>
                            <View
                                style={{
                                    height: 1,
                                    backgroundColor: '#EEEEEE',
                                    marginLeft: 16,
                                    marginTop: 20,
                                    marginBottom: 30
                                }}
                            ></View>

                        </View>
                    )
                })}
            </ScrollView>
            <Button
                onPress={getCheckedItems}
                text='Start'
                textStyle={{
                    color: '#FFFFFF'
                }}
                style={{
                    marginTop: 60,
                    marginBottom: 20,
                    alignSelf: 'center',
                    paddingVertical: 10,
                    paddingHorizontal: 50,
                    backgroundColor: '#180E19',
                    borderRadius: 30
                }}
            />
        </View>
    )
}
export default InterestsScreen

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: 'white',
    },
    headerText: {
        fontWeight: '700',
        fontSize: 18,
        marginTop: 20,
        color: '#000000',
        marginLeft: 16,
        marginBottom: 41
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