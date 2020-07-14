import { createSlice } from '@reduxjs/toolkit'

const formSlice = createSlice({
    name: 'form',
    initialState: {},
    reducers: {
        addProp: (state, action: { payload: any }): void => {
            return action.payload
        }
    }
})

export const { addProp } = formSlice.actions

export default formSlice.reducer
