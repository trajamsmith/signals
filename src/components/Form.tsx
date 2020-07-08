import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { addProp } from '../redux/form'

interface IFormProps {
    stateChanged: any
}

interface IFormInputs {
    key: string
    value: string
}

const Form: React.FC<IFormProps> = ({ stateChanged }) => {
    const { register, handleSubmit, reset, watch } = useForm<IFormInputs>()
    const dispatch = useDispatch()

    const onSubmit = (data: IFormInputs) => {
        console.log('DATA: ', data)
        stateChanged.emit(data)
        dispatch(addProp(data))
        reset()
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input name="key" defaultValue="key" ref={register()} />
            <input name="value" ref={register()} />
            <input type="submit" />
        </form>
    )
}

export default Form
