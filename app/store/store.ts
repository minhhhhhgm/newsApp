import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counterSlice'
import newsReducer from './newsSlice'

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        newsReducer,
        
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
      }),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch