import React, { useEffect, useState } from 'react';
import { StyleSheet, Text as Textrn, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { headBlackColor } from '../../utils/color';
import Vasern from 'vasern';
import { Todos } from '../../database';
export const TodoSchema = {
    name: "Todos",
    props: {
        type: "string",
        title: "string",
        author: "string",
        time: "string"
    },
    assignTo: "#Users"
};
export const VasernDB = new Vasern({
    schemas: [TodoSchema],
    version: 1
})
// export const { Todos } = VasernDB as any;
const BookMarkScreen = (props: any) => {
    const insets = useSafeAreaInsets();
    const [data, setData] = useState([])

    const getdata = async () => {
        // let todos = await Todos.map((item: any) => item).data();
        // // // var item1 = Todos.get({ name: "Setup database for React Native" });
        // // // await Todos.remove(item1)
        // testDb()
        // console.log('logogaosdj', todos);
        let todos = await Todos.filter((item: any) => item).data();
        // const item1 = Todos.get({ time: "0000" });
        // // await Todos.remove(item1)
        // console.log('item1', item1.content);
        console.log('tode', todos);
        setData(todos)
    }
    const testDb = async () => {
        const params = {
            type: 'Thế Giới',
            title: 'Đại ca minh',
            author: 'hoàng minh',
            time: '0001'
        }
        // Todos.insert(params)
        // getdata()
        let todos =  Todos.data();
        // const item1 = Todos.get({ time: "0000" });
        // // await Todos.remove(item1)
        // console.log('item1', item1.content);
        console.log('tode', todos);
        setData(todos)
        console.log('log', 'todos');

        // getdata()
    }
    useEffect(() => {
        getdata()
    }, [])

    return (
        <View style={{
            height: 50,
            flex: 1,
            justifyContent: 'center'
        }}>
            {
                data.map((item: any) => {
                    return (
                        <Textrn key={item.id}>{item.title}</Textrn>
                    )
                })
            }


            <TouchableOpacity
                onPress={testDb}
                style={{
                    marginTop: 50
                }}>
                <Textrn>asjfkasdjsak</Textrn>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: 'white',
    },
    logo: {
        alignItems: 'center',
    },
    headerText: {
        fontWeight: '700',
        fontSize: 18,
        marginTop: 20,
        color: headBlackColor
    },
    textField: {
        marginHorizontal: 46,
        marginTop: 25
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

export default BookMarkScreen;