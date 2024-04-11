import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import DraggableFlatList, {
    RenderItemParams,
    ScaleDecorator,
} from "react-native-draggable-flatlist";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '../../components/Text';
import BackIcon from '../../icons/svg-component/backIcon';
import { getInterest, setInterest, setInterestApp } from '../../utils/storage';
import { auth } from '../../../App';
import { Category, ItemCategory } from '../../database';
import { Category as ICategory, dataInterests, handleGetCategory, handleSaveCategory } from '../../utils/homeAction';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { changeCate } from '../../store/newsSlice';
import { nanoid } from '@reduxjs/toolkit';
export interface DataInterests {
    text: string,
    isCheck?: boolean,
    endpoint: string,
    mail: string,
    isShow: boolean,
    id: string
}

const CategoryManagementScreen = () => {
    const insets = useSafeAreaInsets();
    const dataInterest = [
        {
            text: 'All',
            endpoint: 'tin-moi-nhat'
        },
        {
            text: 'World News',
            endpoint: 'the-gioi'

        },
        {
            text: 'Politics',
            endpoint: 'thoi-su'
        },
        {
            text: 'Technology',
            endpoint: 'khoa-hoc'
        },
        {
            text: 'Science',
            endpoint: 'so-hoa'
        },
        {
            text: 'Business',
            endpoint: 'kinh-doanh'
        },
        {
            text: 'Entertainment',
            endpoint: 'giai-tri'
        },
        {
            text: 'Food',
            endpoint: 'doi-song'
        },
    ];


    const mail = useSelector((state: RootState) => state.newsReducer.mail)
    const dataInterestss = dataInterests(mail)
    const [data, setData] = useState<DataInterests[]>([]);
    const dispatch = useDispatch()
    const getDataCategory = async () => {
        setData([])
        setTimeout(() => {
            const item1 = ItemCategory.data().filter((item: any) => item.mail === mail);
            console.log('adatacategory', item1);
            console.log('adatacategory', item1.length);

            if (item1) {
                setData(item1)
            }
        }, 100)

    }
    useEffect(() => {
        getDataCategory()
    }, [])

    const getDataI = async (data: any) => {
        const mail = auth.currentUser?.email as string
        ItemCategory.perform(function (db: any) {
            ItemCategory.data().forEach(function (item: any) {
                if (item.mail == mail) {
                    db.remove(item);
                    console.log('remove data');
                }
            })
        })
        savetest(data)
        dispatch(changeCate(nanoid()))
        // await getDataCategory()
    }

    const savetest = (dataC: any) => {
        console.log("SAVE data category", dataC);

        const mail = auth.currentUser?.email as string
        const item1 = ItemCategory.get({ email: mail });
        if (item1) {
            return;
        }
        const filteredData = dataC.map((item: any) => {
            const { id, ...rest } = item; 
            return rest; 
        });
        console.log('item1', item1, filteredData);

        ItemCategory.insert(filteredData);
        setTimeout(() => {
            const item1 = ItemCategory.data();
            console.log('data insert', item1);
        }, 200)
    }



    const renderItem = ({ item, drag, isActive }: RenderItemParams<DataInterests>) => {
        return (
            <ScaleDecorator>
                <TouchableOpacity
                    style={{ backgroundColor: isActive ? 'gray' : 'white' }}
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
                            backgroundColor: '#EEEEEE',
                            marginLeft: 16,
                            marginTop: 20,
                            marginBottom: 30
                        }}
                    ></View>

                </TouchableOpacity>
            </ScaleDecorator>
        )
    };
    return (
        <View style={[styles.body, { paddingTop: 22 + insets.top }]}>
            <View style={{ flexDirection: 'row' }}>
                {
                    <TouchableOpacity
                        style={{ marginTop: 20, marginLeft: 10 }}
                        onPress={getDataI}
                    >
                        <BackIcon />
                    </TouchableOpacity>

                }
                <TouchableOpacity
                    style={{ marginTop: 20, marginLeft: 10 }}
                    onPress={async () => { savetest(dataInterestss) }}
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
                onDragEnd={async ({ data }) => {
                    setData(data)
                    console.log('data', data)
                    getDataI(data)
                    // await setInterest(data)
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