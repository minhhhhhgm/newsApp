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
import { dataInterests, handleGetCategory, handleSaveCategory } from '../../utils/homeAction';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
export interface DataInterests {
    text: string,
    isCheck?: boolean,
    endpoint: string,
    mail: string,
    isShow: boolean
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
    const [data, setData] = useState(dataInterestss);

    // useEffect(() => {
    //     getDataI()
    // }, [])


    const setDataI = async () => {
        const params = {
            listCategory: dataInterest,
            email: mail
        }
        await setInterestApp(params, mail)
    }

    const getDataI = (data: any) => {


        const mail = auth.currentUser?.email as string
        ItemCategory.perform(function (db: any) {
            ItemCategory.data().forEach(function (item: any) {
                if (item.mail == mail) {
                    db.remove(item);

                }
            })
        })
        savetest(data)
        setTimeout(() => {
            const item1 = ItemCategory.data();
            console.log(item1);
            console.log('==============');
            
            // console.log(data);
            
        }, 100)

    }

    const savetest = (dataC :any) => {
        const mail = auth.currentUser?.email as string
        const dataInterest = dataInterests(mail)
        const item1 = ItemCategory.get({ email: mail });
        if (item1) {
            return;
        }
        ItemCategory.insert(dataC);
    }

    const renderItem = ({ item, drag, isActive }: RenderItemParams<DataInterests>) => {
        return (
            <ScaleDecorator>
                <TouchableOpacity
                    style={{ backgroundColor: isActive ? 'red' : 'white' }}
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
                    // onPress={async () => { savetest() }}
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
                keyExtractor={(item) => item.endpoint}
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