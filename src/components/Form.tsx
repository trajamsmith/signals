import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { addProp } from '../redux/form'
import styled from 'styled-components'

const Container = styled.div`
    height: 300px;
    with: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    & > * {
        margin: 15px;
    }
`

const Row = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const Field = styled.input`
    padding: 15px;
    margin-right: 5px;
`

const Submit = styled.input`
    border-style: none;
    width: 150px;
    border-radius: 4px;
    height: 30px;
`

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
            <Container>
                <Row>
                    <Field name="key" ref={register()} />
                    <Field name="value" ref={register()} />
                </Row>
                <Row>
                    <Submit type="submit">Add Property</Submit>
                </Row>
            </Container>
        </form>
    )
}

export default Form
