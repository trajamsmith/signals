// After:
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import counterSlice from './counter'
import formSlice from './form'

export interface IStore {
    form: any
    counter: number
}

const createStore = configureStore({
    reducer: combineReducers({
        form: formSlice,
        counter: counterSlice
    })
})

export default createStore
