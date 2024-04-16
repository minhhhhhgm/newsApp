import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    StatusBar,
    FlatList,
    Alert,
    Button,
    TouchableOpacity,
} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { dataInterests } from '../../utils/homeAction';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { CategoryManagementModel, ItemCategory, TestCategoryModel } from '../../database';
import DraggableFlatList, { RenderItemParams, ScaleDecorator } from 'react-native-draggable-flatlist';
import { DataInterests } from './category-management';
import { nanoid } from '@reduxjs/toolkit';
import { changeCate } from '../../store/newsSlice';
import EyeIcon from '../../icons/svg-component/eyeIcon';
import EyeOffIcon from '../../icons/svg-component/eyeOffIcon';
import { COLOR } from '../../utils/color';
const todoList = [
    { id: '1', text: 'Learn JavaScript' },
    { id: '2', text: 'Learn React' },
    { id: '3', text: 'Learn TypeScript' },
    { id: '1', text: 'Learn JavaScript' },
    { id: '2', text: 'Learn React' },
    { id: '3', text: 'Learn TypeScript' },
    { id: '1', text: 'Learn JavaScript' },
    { id: '2', text: 'Learn React' },
    { id: '3', text: 'Learn TypeScript' },
    { id: '1', text: 'Learn JavaScript' },
    { id: '2', text: 'Learn React' },
    { id: '3', text: 'Learn TypeScript' },
    { id: '1', text: 'Learn JavaScript' },
    { id: '2', text: 'Learn React' },
    { id: '3', text: 'Learn TypeScript' },
    { id: '1', text: 'Learn JavaScript' },
    { id: '2', text: 'Learn React' },
    { id: '3', text: 'Learn TypeScript' },
];

const daC = [{ "endpoint": "du-lich", "isShow": false, "text": "dulich" }, { "endpoint": "kinh-doanh", "isShow": true, "text": "business" }, { "endpoint": "suc-khoe", "isShow": true, "text": "suckhoe" }, { "endpoint": "so-hoa", "isShow": false, "text": "science" }, { "endpoint": "thoi-su", "isShow": true, "text": "politics" }, { "endpoint": "the-gioi", "isShow": true, "text": "worldNews" }, { "endpoint": "tam-su", "isShow": false, "text": "tamsu" }, { "endpoint": "tin-noi-bat", "isShow": false, "text": "forYou" }, { "endpoint": "giai-tri", "isShow": false, "text": "entertainment" }, { "endpoint": "doi-song", "isShow": true, "text": "food" }, { "endpoint": "the-thao", "isShow": true, "text": "thethao" }, { "endpoint": "giao-duc", "isShow": true, "text": "giaoduc" }, { "endpoint": "gia-dinh", "isShow": true, "text": "doisong" }, { "endpoint": "oto-xe-may", "isShow": true, "text": "xe" }, { "endpoint": "y-kien", "isShow": true, "text": "ykien" }, { "endpoint": "khoa-hoc", "isShow": true, "text": "technology" }]


const Separator = () => <View style={styles.itemSeparator} />;
const LeftSwipeActions = () => {
    return (
        <View
            style={{ flex: 1, backgroundColor: '#ccffbd', justifyContent: 'center' }}
        >
            <Text
                style={{
                    color: '#40394a',
                    paddingHorizontal: 10,
                    fontWeight: '600',

                    paddingVertical: 20,
                }}
            >
                Bookmark
            </Text>
        </View>
    );
};
const rightSwipeActions = () => {
    return (
        <View
            style={{
                backgroundColor: '#ff8303',
                justifyContent: 'center',
                alignItems: 'flex-end',
            }}
        >
            <Text
                style={{
                    color: '#1b1a17',
                    paddingHorizontal: 10,
                    fontWeight: '600',
                    paddingVertical: 20,
                }}
            >
                Delete
            </Text>
        </View>
    );
};
const swipeFromLeftOpen = () => {
    Alert.alert('Swipe from left');
};
const swipeFromRightOpen = (ref: any) => {
    ref?.current?.close()

    // Alert.alert('Swipe from right');
};


const ListItem = ({ text }: { text: string }) => (
    <Swipeable
        renderLeftActions={LeftSwipeActions}
        renderRightActions={rightSwipeActions}
        onSwipeableLeftOpen={swipeFromLeftOpen}
    >
        <View
            style={{
                paddingHorizontal: 30,
                paddingVertical: 20,
                backgroundColor: 'white',
            }}
        >
            <Text style={{ fontSize: 24 }} >
                {text}
            </Text>
        </View>
    </Swipeable>
);
const SwipeGesture = () => {
    const swipeRef = React.useRef<Swipeable>(null)
    const email = useSelector((state: RootState) => state.newsReducer.mail)
    const [data, setData] = useState<any>([])
    const mail = useSelector((state: RootState) => state.newsReducer.mail)
    const news = useSelector((state: RootState) => state.newsReducer.newsName)
    const dispatch = useDispatch()
    const handleTest = () => {
        const dataInterest = dataInterests(email)
        const jsString = JSON.stringify(dataInterest)
        const parse = JSON.parse(jsString)
        console.log(typeof jsString, 'b');
        console.log(typeof dataInterest, 'a');
        console.log('parse', typeof parse);
        const obj = {
            vnEpress: jsString,
            tuoiTre: jsString
        }
        TestCategoryModel.insert({
            listCategory: JSON.stringify(obj),
            email: 'OK2'
        })
        // TestCategoryModel.removeAllRecords()
    }
    const handleGet = () => {

        console.log(TestCategoryModel.data());
        // const getData = TestCategoryModel.get({ id: '661ded25436g7klB000WWUWz' })
        // TestCategoryModel.update(getData,{listCategory:''})
        // console.log( JSON.parse(getData.listCategory).tuoiTre);
        // setData(JSON.parse(getData.listCategory))
    }

    // useEffect(() => {
    //     // getDataCategory()
    // }, [])

    const getDataCategory = () => {
        setData([])
        const getData = CategoryManagementModel.get({ email: 'test9999@gmail.com' })

        const data = JSON.parse(getData.vnExpress)
        console.log(data);
        setData(data)
    }

    const handleShowCategory = (item: DataInterests, index: number) => {
        ItemCategory.perform(function (db: any) {
            const newItem = ItemCategory.get({ endpoint: item.endpoint, mail: mail });
            db.update(newItem, { isShow: 0 })
            dispatch(changeCate(nanoid()))
        })
        // swipeableRef.current?.[index].close()
        // const item1 = ItemCategory.data().filter((item: ICategory) => item.mail === mail);
        // if (item1) {
        //     setData(item1)
        // }
    }
    const handleHideCategory = (item: DataInterests, index: number) => {
        ItemCategory.perform(function (db: any) {
            const newItem = ItemCategory.get({ endpoint: item.endpoint, mail: mail });
            db.update(newItem, { isShow: 1 })
            dispatch(changeCate(nanoid()))
        })
        // swipeableRef.current?.[index].close()
        // const item1 = ItemCategory.data().filter((item: ICategory) => item.mail === mail);
        // if (item1) {
        //     setData(item1)
        // }
    }
    const LeftSwipeActions = (item: DataInterests, index: number) => {
        return (
            <View style={{ backgroundColor: COLOR.authorColor, justifyContent: 'center', paddingHorizontal: 30 }}>
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => handleHideCategory(item, index)}>
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

    const swipeFromLeftOpen = (direction: string, index: number) => {
        const getData = CategoryManagementModel.get({ email: mail })
        console.log(direction, index);
        if (direction == 'right') {
            const updatedArray = data.map((item : any, indexs : number) => {
                if (indexs === index) {
                    return { ...item, isShow: false };
                }
                return item;
            });
            const stringData = JSON.stringify(updatedArray)
            if (news == 'VnExpress') {
                CategoryManagementModel.update(getData, { vnExpress: stringData })
                dispatch(changeCate(nanoid()))
            } else {
                CategoryManagementModel.update(getData, { tuoiTre: stringData })
                dispatch(changeCate(nanoid()))
            }
            getDataCategory()

        } else {
            const updatedArray = data.map((item : any, indexs : number) => {
                if (indexs === index) {
                    return { ...item, isShow: true };
                }
                return item;
            });
            const stringData = JSON.stringify(updatedArray)
            if (news == 'VnExpress') {
                CategoryManagementModel.update(getData, { vnExpress: stringData })
                dispatch(changeCate(nanoid()))
            } else {
                CategoryManagementModel.update(getData, { tuoiTre: stringData })
                dispatch(changeCate(nanoid()))
            }
            getDataCategory()
        }
        // if (direction == 'right') {
        //     ItemCategory.perform(function (db: any) {
        //         const newItem = ItemCategory.get({ endpoint: item.endpoint, mail: mail });
        //         db.update(newItem, { isShow: 0 })
        //         dispatch(changeCate(nanoid()))
        //     })
        //     swipeableRef.current?.[index].close()
        //     const item1 = ItemCategory.data().filter((item: ICategory) => item.mail === mail);
        //     if (item1) {
        //         setData(item1)
        //     }
        // } if (direction == 'left') {
        //     ItemCategory.perform(function (db: any) {
        //         const newItem = ItemCategory.get({ endpoint: item.endpoint, mail: mail });
        //         db.update(newItem, { isShow: 1 })
        //         dispatch(changeCate(nanoid()))
        //     })
        //     swipeableRef.current?.[index].close()
        //     const item1 = ItemCategory.data().filter((item: ICategory) => item.mail === mail);
        //     if (item1) {
        //         setData(item1)
        //     }
        // }
    };
    const renderItem = ({ item, drag, isActive, getIndex }: RenderItemParams<DataInterests>) => {

        return (
            <ScaleDecorator>
                <Swipeable

                // renderLeftActions={() => LeftSwipeActions(item, getIndex() as number)}
                // renderRightActions={() => rightSwipeActions(item, getIndex() as number)}
                // onSwipeableOpen={(direction) => { swipeFromLeftOpen(direction, getIndex() as number) }}
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
                                }}>
                                {item.text}
                            </Text>

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
    const handleUpdatePositionCategory = (data: DataInterests[]) => {
        const getData = CategoryManagementModel.get({ email: mail })
        if (news == 'VnExpress') {
            const stringData = JSON.stringify(data)
            CategoryManagementModel.update(getData, { vnExpress: stringData })
            dispatch(changeCate(nanoid()))
        }
        else {
            const stringData = JSON.stringify(data)
            CategoryManagementModel.update(getData, { tuoiTre: stringData })
            dispatch(changeCate(nanoid()))
        }
    }

    return (
        <>
            <StatusBar />
            <SafeAreaView style={styles.container}>
                <Text style={{ textAlign: 'center', marginVertical: 20 }}>
                    Swipe right or left
                </Text>
                <View style={{
                    flex : 1
                }}>

                <DraggableFlatList
                    data={daC}
                    onDragEnd={({ data }) => {
                        console.log('data update ===', data);

                        setData(data)
                        // updateCategory(data) 
                        handleUpdatePositionCategory(data)
                    }}
                    keyExtractor={(item: any) => item.text}
                    renderItem={renderItem}
                />
                </View>
                {/* <FlatList
                    data={data}
                    keyExtractor={(item) => item.text}
                    renderItem={({ item }) => <ListItem {...item} />}
                    ItemSeparatorComponent={() => <Separator />}
                /> */}
                {/* <Button title='Ok' onPress={handleTest} />
                <Button title='Get' onPress={handleGet} /> */}

            </SafeAreaView>
        </>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    itemSeparator: {
        flex: 1,
        height: 1,
        backgroundColor: '#444',
    },
});
export default SwipeGesture;