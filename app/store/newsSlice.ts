import { createSlice } from '@reduxjs/toolkit'

export interface CounterState {
    data: null,
    mail: string,
    changeCategory: string,
    isLogin: boolean,
    newsName: string,
    vnExpress : [],
    tuoiTre : []
}

const initialState: CounterState = {
    data: null,
    mail: '',
    changeCategory: '',
    isLogin: false,
    newsName: 'VnExpress',
    vnExpress : [],
    tuoiTre : []
}

export const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {
        addNews: (state, actions) => {
            const data = actions.payload
            state.data = data
        },
        addMail: (state, actions) => {
            console.log('actions.payload', actions.payload);

            const mail = actions.payload
            state.mail = mail
        },
        changeCate: (state, actions) => {
            const cate = actions.payload
            state.changeCategory = cate
        },
        changeStatusLogin: (state, actions) => {
            const isLogin = actions.payload
            state.isLogin = isLogin
        },
        changeNews: (state, actions) => {
            const name = actions.payload
            state.newsName = name
        },
        setVnExpress: (state, actions) => {
            const data = actions.payload
            state.vnExpress = data
        },
        
    },
})

export const { addNews, addMail, changeCate, changeStatusLogin, changeNews,setVnExpress } = newsSlice.actions

export default newsSlice.reducer