import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Article } from '../screen/home/home'

export interface CounterState {
    data : any
}

const initialState: CounterState = {
    data: [],
}

export const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {
        addNews: (state, actions) => {
            console.log('data');
            
            const data = actions.payload            
            state.data.push(data)
        },
    },
})

export const { addNews } = newsSlice.actions

export default newsSlice.reducer