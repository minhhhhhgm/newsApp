import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { NewsType } from '../type/NewsType'

export interface CounterState {
    data: null
}

const initialState: CounterState = {
    data: null,
}

export const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {
        addNews: (state, actions) => {
            const data = actions.payload
            state.data = data
        },
    },
})

export const { addNews } = newsSlice.actions

export default newsSlice.reducer