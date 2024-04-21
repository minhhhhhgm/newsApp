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
import { CategoryManagementModel, ItemCategory } from '../../database';
import BackIcon from '../../icons/svg-component/backIcon';
import EyeIcon from '../../icons/svg-component/eyeIcon';
import EyeOffIcon from '../../icons/svg-component/eyeOffIcon';
import { changeCate } from '../../store/newsSlice';
import { RootState } from '../../store/store';
import { COLOR } from '../../utils/color';
import { dataInterests } from '../../utils/homeAction';
import { VNEXPRESS } from '../../utils/const';


export interface DataInterests {
    text: string,
    endpoint: string,
    isShow: boolean | number,
}

interface ICategory {
    endpoint: string,
    text: string,
    mail: string,
    isShow: boolean,
}

const CategoryManagementScreen = () => {
    const insets = useSafeAreaInsets();
    const mail = useSelector((state: RootState) => state.newsReducer.mail)
    const news = useSelector((state: RootState) => state.newsReducer.newsName)
    const [data, setData] = useState<DataInterests[]>([]);
    const dispatch = useDispatch()
    const swipeableRef = useRef<Swipeable[]>([])
    const navigation = useNavigation()


    useEffect(() => {
        getDataCategory()
    }, [news])

    const getDataCategory = () => {
        const getData = CategoryManagementModel.get({ email: mail })
        if (news == VNEXPRESS) {
            const data = JSON.parse(getData.vnExpress)
            setData(data)
        }
        else {
            const data = JSON.parse(getData.tuoiTre)
            setData(data)
        }
    }

    const LeftSwipeActions = (item: DataInterests, index: number) => {
        return (
            <View style={{ backgroundColor: COLOR.authorColor, justifyContent: 'center', paddingHorizontal: 30 }}>
                <TouchableOpacity
                    activeOpacity={1}
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
                >
                    <EyeOffIcon />
                </TouchableOpacity>
            </View>
        );
    };

    const swipeFromSideOpen = async (direction: string, index: number) => {
        const getData = CategoryManagementModel.get({ email: mail });
        console.log(direction, index);

        const updatedArray = data.map((item, indexs) => {
            const isShow = direction === 'left' ? true : false;
            return indexs === index ? { ...item, isShow } : item;
        });

        const stringData = JSON.stringify(updatedArray);
        const updateData = news === 'VnExpress' ? { vnExpress: stringData } : { tuoiTre: stringData };

        const isUpdate = await CategoryManagementModel.update(getData, updateData);
        if (isUpdate) {
            swipeableRef.current?.[index].close();
            dispatch(changeCate(nanoid()));
        }

        getDataCategory();
    };


    const handleUpdatePositionCategory = async (data: DataInterests[]) => {
        const getData = CategoryManagementModel.get({ email: mail });
        const stringData = JSON.stringify(data);
        const updateData = news === 'VnExpress' ? { vnExpress: stringData } : { tuoiTre: stringData };

        const isUpdate = await CategoryManagementModel.update(getData, updateData);
        if (isUpdate) {
            dispatch(changeCate(nanoid()));
        }
    };


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
                    onSwipeableOpen={(direction) => { swipeFromSideOpen(direction, getIndex() as number) }}
                >
                    <TouchableOpacity
                        activeOpacity={1}
                        style={{ backgroundColor: !item.isShow ? '#EEEEEE' : 'white', marginHorizontal: 5 }}
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
                                backgroundColor: (item.isShow) ? '#EEEEEE' : 'white',
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
                    text='category'
                    style={styles.headerText}
                />
            </View>
            <View style={{
                flex: 1
            }}>

                <DraggableFlatList
                    data={data}
                    onDragEnd={({ data }) => {
                        // console.log('data update ===', data);

                        setData(data)
                        // updateCategory(data)
                        handleUpdatePositionCategory(data)
                    }}
                    keyExtractor={(item) => item.text}
                    renderItem={renderItem}
                />
            </View>

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