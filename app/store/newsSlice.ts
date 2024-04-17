import { createSlice } from '@reduxjs/toolkit'

export interface CounterState {
    data: null,
    mail: string,
    changeCategory: string,
    isLogin: boolean,
    newsName: string,
    vnExpress : [],
    tuoiTre : [],
    removeBookmark : string,
    domain: string
}

const initialState: CounterState = {
    data: null,
    mail: '',
    changeCategory: '',
    isLogin: false,
    newsName: '',
    vnExpress : [],
    tuoiTre : [],
    removeBookmark:'',
    domain : ''
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
            if(name =='VnExpress'){
                state.domain = 'vnexpress.net'
            }else{
                state.domain = 'tuoitre.vn'
            }
            state.newsName = name
        },
        setVnExpress: (state, actions) => {
            const data = actions.payload
            state.vnExpress = data
        },
        removeBookmarkApp: (state, actions) => {
            const bookmark = actions.payload
            state.removeBookmark = bookmark
        },
        
    },
})

export const { addNews, addMail, changeCate, changeStatusLogin, changeNews,setVnExpress ,removeBookmarkApp} = newsSlice.actions

export default newsSlice.reducer