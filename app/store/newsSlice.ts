import { createSlice } from '@reduxjs/toolkit'

export interface CounterState {
    data: null,
    mail: string,
    changeCategory: string
}

const initialState: CounterState = {
    data: null,
    mail: '',
    changeCategory:''
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
    },
})

export const { addNews, addMail, changeCate } = newsSlice.actions

export default newsSlice.reducer