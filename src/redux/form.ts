import { createSlice } from '@reduxjs/toolkit'

export interface IFormSlice {
    recipeName: string
    dataSource: string
    modelName: string
    modelType: string
    target: string
    output: string
}

const formSlice = createSlice({
    name: 'form',
    initialState: {
        recipeName: '',
        dataSource: '',
        modelName: '',
        modelType: '',
        target: '',
        output: ''
    } as IFormSlice,
    reducers: {
        addProp: (state, action: { payload: IFormSlice }): IFormSlice => {
            return action.payload
        }
    }
})

export const { addProp } = formSlice.actions

export default formSlice.reducer
