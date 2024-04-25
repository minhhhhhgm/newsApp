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
import { Text } from '../../components/Text';
import { CategoryManagementModel } from '../../database';
import BackIcon from '../../icons/svg-component/backIcon';
import { changeCate } from '../../store/newsSlice';
import { RootState } from '../../store/store';
import { VNEXPRESS } from '../../utils/const';
import { LeftSwipeActions, rightSwipeActions } from './component/side-component';
import { COLOR, COLOR_MODE } from '../../utils/color';


export interface DataInterests {
    text: string,
    endpoint: string,
    isShow: boolean | number,
}

const CategoryManagementScreen = () => {
    const insets = useSafeAreaInsets();
    const mail = useSelector((state: RootState) => state.newsReducer.mail)
    const news = useSelector((state: RootState) => state.newsReducer.newsName)
    const mode = useSelector((state: RootState) => state.newsReducer.darkMode)
    const [data, setData] = useState<DataInterests[]>([]);
    const dispatch = useDispatch()
    const stroke = mode ? COLOR.white : null
    const swipeableRef = useRef<Swipeable[]>([])
    const navigation = useNavigation()
    const styles = useCategoryStyles(mode)

    console.log('news', news);

    useEffect(() => {
        getDataCategory()
    }, [news])

    //GET CATEGORY
    const getDataCategory = () => {
        const getData = CategoryManagementModel.get({ email: mail })
        if (news) {
            if (news == VNEXPRESS) {
                const data = JSON.parse(getData.vnExpress)
                setData(data)
            }
            else {
                const data = JSON.parse(getData.tuoiTre)
                setData(data)
            }
        } else {
            const data = JSON.parse(getData.vnExpress)
            setData(data)
        }
    }


    // SHOW - HIDE CATEGORY
    const swipeFromSideOpen = async (direction: string, index: number) => {
        // const getData = CategoryManagementModel.get({ email: mail });
        console.log(direction, index);
        // const updatedArray = data.map((item, indexs) => {
        //     const isShow = direction === 'left' ? true : false;
        //     return indexs === index ? { ...item, isShow } : item;
        // });
        // const stringData = JSON.stringify(updatedArray);
        // const updateData = news === VNEXPRESS ? { vnExpress: stringData } : { tuoiTre: stringData };
        // const isUpdate = await CategoryManagementModel.update(getData, updateData);
        // if (isUpdate) {
        //     swipeableRef.current?.[index].close();
        //     dispatch(changeCate(nanoid()));
        // }
        // getDataCategory();
        // swipeableRef.current?.[index].close();
    };

    // SHOW - HIDE CATEGORY
    const handleShowHidecategory = async (isShowIcon: boolean, index: number) => {
        const getData = CategoryManagementModel.get({ email: mail });
        const updatedArray = data.map((item, indexs) => {
            const isShow = !isShowIcon ? true : false;
            return indexs === index ? { ...item, isShow } : item;
        });
        const stringData = JSON.stringify(updatedArray);
        const updateData = news === VNEXPRESS ? { vnExpress: stringData } : { tuoiTre: stringData };
        const isUpdate = await CategoryManagementModel.update(getData, updateData);
        if (isUpdate) {
            swipeableRef.current?.[index].close();
            dispatch(changeCate(nanoid()));
        }
        getDataCategory();
    }


    // UPDATE POSITION CATEGORY
    const handleUpdatePositionCategory = async (data: DataInterests[]) => {
        const getData = CategoryManagementModel.get({ email: mail });
        const stringData = JSON.stringify(data);
        const updateData = news === VNEXPRESS ? { vnExpress: stringData } : { tuoiTre: stringData };
        const isUpdate = await CategoryManagementModel.update(getData, updateData);
        if (isUpdate) {
            dispatch(changeCate(nanoid()));
        }
    };


    const Separator = () => <View style={styles.itemSeparator} />;

    const renderItem = ({ item, drag, isActive, getIndex }: RenderItemParams<DataInterests>) => {
        return (
            <ScaleDecorator>
                <Swipeable
                    ref={(ref) => {
                        if (ref) {
                            swipeableRef.current.push(ref)
                        }
                    }}
                    // renderLeftActions={() => LeftSwipeActions(item, getIndex() as number)}
                    renderRightActions={() => rightSwipeActions({isShow : item.isShow as boolean, action : ()=>handleShowHidecategory(item.isShow as boolean , getIndex() as number)})}
                    // onSwipeableOpen={(direction) => { swipeFromSideOpen(direction, getIndex() as number) }}
                    >
                    <TouchableOpacity
                        activeOpacity={1}
                        style={{ backgroundColor: !item.isShow ? '#EEEEEE' : COLOR_MODE(mode).backgroundColor, marginHorizontal: 5 }}
                        onLongPress={drag}>
                        <View style={{
                            paddingHorizontal: 16,
                            justifyContent: 'space-between'
                        }}>
                            <Text
                                style={{
                                    fontSize: 14,
                                    paddingVertical: 20,
                                    color: COLOR_MODE(!mode).backgroundColor
                                }}
                                text={item.text} />
                        </View>
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
                    onPress={() => navigation.goBack()}>
                    <BackIcon stroke={stroke} />
                </TouchableOpacity>
                <Text
                    text='category'
                    style={styles.headerText}
                />
            </View>
            <View style={{ flex: 1 }}>
                <DraggableFlatList
                    data={data}
                    onDragEnd={({ data }) => {
                        setData(data)
                        handleUpdatePositionCategory(data)
                    }}
                    keyExtractor={(item) => item.text}
                    renderItem={renderItem}
                    ItemSeparatorComponent={() => <Separator />}
                />
            </View>
        </View>
    )
}
export default CategoryManagementScreen

const useCategoryStyles = (mode: boolean) => {
    const styles = StyleSheet.create({
        body: {
            flex: 1,
            backgroundColor: COLOR_MODE(mode).backgroundColor
        },
        headerText: {
            fontWeight: '700',
            fontSize: 18,
            color: COLOR_MODE(mode).textNewsColor,
            marginLeft: 16,
            marginTop: 20,

        },
        itemSeparator: {
            flex: 1,
            height: 1,
            backgroundColor: '#EEEEEE',
            marginLeft: 16
        },
    });
    return styles;
}

