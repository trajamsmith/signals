// After:
import { configureStore } from '@reduxjs/toolkit'
import counterSlice from './counter'

const createStore = configureStore({
    reducer: counterSlice
})

export default createStore
