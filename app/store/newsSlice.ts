import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { NewsType } from '../type/NewsType'

export interface CounterState {
    data: null,
    mail: string
}

const initialState: CounterState = {
    data: null,
    mail: ''
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
    },
})

export const { addNews, addMail } = newsSlice.actions

export default newsSlice.reducer