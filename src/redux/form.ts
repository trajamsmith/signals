import { createSlice } from '@reduxjs/toolkit'

const formSlice = createSlice({
    name: 'form',
    initialState: {},
    reducers: {
        addProp: (
            state,
            action: { payload: { key: string; value: string } }
        ): void => {
            state[action.payload.key] = action.payload.value
        }
    }
})

export const { addProp } = formSlice.actions

export default formSlice.reducer
