import { useNavigation } from '@react-navigation/native';
import { nanoid } from '@reduxjs/toolkit';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import DraggableFlatList, {
    RenderItemParams,
    ScaleDecorator,
} from "react-native-draggable-flatlist";
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../../../App';
import { Text } from '../../components/Text';
import { ItemCategory } from '../../database';
import BackIcon from '../../icons/svg-component/backIcon';
import EyeIcon from '../../icons/svg-component/eyeIcon';
import EyeOffIcon from '../../icons/svg-component/eyeOffIcon';
import { changeCate } from '../../store/newsSlice';
import { RootState } from '../../store/store';
import { COLOR } from '../../utils/color';
import { dataInterests } from '../../utils/homeAction';


export interface DataInterests {
    text: string,
    isCheck?: boolean,
    endpoint: string,
    mail: string,
    isShow: boolean | number,
    id: string
}

interface ICategory {
    endpoint: string,
    text: string,
    mail: string,
    isShow: boolean,
}

const CategoryManagementScreen = () => {
    const insets = useSafeAreaInsets();
    // const dataInterest = [
    //     {
    //         text: 'All',
    //         endpoint: 'tin-moi-nhat'
    //     },
    //     {
    //         text: 'World News',
    //         endpoint: 'the-gioi'

    //     },
    //     {
    //         text: 'Politics',
    //         endpoint: 'thoi-su'
    //     },
    //     {
    //         text: 'Technology',
    //         endpoint: 'khoa-hoc'
    //     },
    //     {
    //         text: 'Science',
    //         endpoint: 'so-hoa'
    //     },
    //     {
    //         text: 'Business',
    //         endpoint: 'kinh-doanh'
    //     },
    //     {
    //         text: 'Entertainment',
    //         endpoint: 'giai-tri'
    //     },
    //     {
    //         text: 'Food',
    //         endpoint: 'doi-song'
    //     },
    // ];
    const mail = useSelector((state: RootState) => state.newsReducer.mail)
    // const dataInterestss = dataInterests(mail)
    const [data, setData] = useState<DataInterests[]>([]);
    const dispatch = useDispatch()
    const swipeableRef = useRef<Swipeable[]>([])
    const navigation = useNavigation()


    useEffect(() => {
        getDataCategory()
    }, [])

    const getDataCategory = () => {
        setData([])
        const data = ItemCategory.data().filter((item: ICategory) => item.mail === mail);
        if (data) {
            setData(data)
        }
    }


    const updateCategory = (data: any) => {
        const mail = auth.currentUser?.email as string
        ItemCategory.perform(function (db: any) {
            ItemCategory.data().forEach(function (item: ICategory) {
                if (item.mail == mail) {
                    db.remove(item);
                }
            })
        })
        saveToDatabase(data)
    }

    const saveToDatabase = (dataC: any) => {
        const mail = auth.currentUser?.email as string
        const item1 = ItemCategory.get({ email: mail });
        if (item1) {
            return;
        }
        const filteredData = dataC.map((item: any) => {
            const { id, ...rest } = item;
            return rest;
        });
        ItemCategory.insert(filteredData);
        // dispatch(changeCate(nanoid()))
        // ItemCategory.onInsert(() => {
            
        //     dispatch(changeCate(nanoid()))
        // })
        setTimeout(() => {
            const item1 = ItemCategory.data();
            if (item1) {
                dispatch(changeCate(nanoid()))
            }
        }, 100)
    }

    const handleShowCategory = (item: DataInterests, index: number) => {
        ItemCategory.perform(function (db: any) {
            const newItem = ItemCategory.get({ id: item.id });
            db.update(newItem, { isShow: 0 })
            dispatch(changeCate(nanoid()))
        })
        swipeableRef.current?.[index].close()
        const item1 = ItemCategory.data().filter((item: any) => item.mail === mail);
        if (item1) {
            setData(item1)
        }
    }
    const handleHideCategory = (item: DataInterests, index: number) => {
        ItemCategory.perform(function (db: any) {
            const newItem = ItemCategory.get({ id: item.id });
            db.update(newItem, { isShow: 1 })
            dispatch(changeCate(nanoid()))
        })
        swipeableRef.current?.[index].close()
        const item1 = ItemCategory.data().filter((item: ICategory) => item.mail === mail);
        if (item1) {
            setData(item1)
        }
    }
    const LeftSwipeActions = (item: DataInterests, index: number) => {
        return (
            <View style={{ backgroundColor: COLOR.authorColor, justifyContent: 'center', paddingHorizontal: 30 }}>
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => handleHideCategory(item, index)}
                >
                     <EyeIcon width={20} height={20} />
                   
                </TouchableOpacity>

            </View>
        );
    };
    const rightSwipeActions = (item: DataInterests, index: number) => {
        return (
            <View
                style={{
                    backgroundColor: COLOR.authorColor,
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                    paddingHorizontal: 30
                }}
            >
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => handleShowCategory(item, index)}
                >
                     <EyeOffIcon />
                </TouchableOpacity>
            </View>
        );
    };

    // const swipeFromLeftOpen = (direction: any, item: DataInterests, index: number) => {
    //     console.log(direction);
    //     // if (direction == 'right') {
    //     //     ItemCategory.perform(function (db: any) {
    //     //         const newItem = ItemCategory.get({ id: item.id });
    //     //         console.log('newItem', newItem);
    //     //         db.update(newItem, { isShow: 0 })
    //     //         console.log(newItem);
    //     //         dispatch(changeCate(nanoid()))

    //     //     })
    //     //     swipeableRef.current?.[index].close()
    //     //     const item1 = ItemCategory.data().filter((item: any) => item.mail === mail);
    //     //     if (item1) {
    //     //         setData(item1)
    //     //     }
    //     // } else {
    //     //     ItemCategory.perform(function (db: any) {
    //     //         const newItem = ItemCategory.get({ id: item.id });
    //     //         console.log('newItem', newItem);
    //     //         db.update(newItem, { isShow: 1 })
    //     //         console.log(newItem);
    //     //         dispatch(changeCate(nanoid()))

    //     //     })
    //     //     const item1 = ItemCategory.data().filter((item: any) => item.mail === mail);
    //     //     if (item1) {
    //     //         setData(item1)
    //     //     }
    //     // }
    // };

    const renderItem = ({ item, drag, isActive, getIndex }: RenderItemParams<DataInterests>) => {
        return (
            <ScaleDecorator>
                <Swipeable
                    ref={(ref) => {
                        if (ref) {
                            swipeableRef.current.push(ref)
                        }
                    }}
                    renderLeftActions={() => LeftSwipeActions(item, getIndex() as number)}
                    renderRightActions={() => rightSwipeActions(item, getIndex() as number)}
                    // onSwipeableOpen={(direction) => { swipeFromLeftOpen(direction, item, getIndex() as number) }}
                    >
                    <TouchableOpacity
                        activeOpacity={1}
                        style={{ backgroundColor: item.isShow == 0 ? '#EEEEEE' : 'white', marginHorizontal :5}}
                        onLongPress={drag}>
                        <View style={{
                            paddingHorizontal: 16,
                            justifyContent: 'space-between'
                        }}>
                            <Text
                                style={{
                                    fontSize: 14,
                                    color: '#000000'
                                }}
                                text={item.text} />
                        </View>
                        <View
                            style={{
                                height: 1,
                                backgroundColor: !(item.isShow == 0) ? '#EEEEEE' : 'white',
                                marginLeft: 16,
                                marginTop: 20,
                                marginBottom: 25
                            }}
                        ></View>
                    </TouchableOpacity>
                </Swipeable>
            </ScaleDecorator>
        )
    };
    return (
        <View style={[styles.body, { paddingTop: 22 + insets.top }]}>
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                    style={{ marginTop: 20, marginLeft: 10 }}
                    onPress={() => navigation.goBack()}
                >
                    <BackIcon />
                </TouchableOpacity>
                <Text
                    text='Interests'
                    style={styles.headerText}
                />
            </View>
            <DraggableFlatList
                data={data}
                onDragEnd={({ data }) => {
                    setData(data)
                    updateCategory(data)
                }}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
            />
        </View>
    )
}
export default CategoryManagementScreen

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