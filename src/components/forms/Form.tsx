import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { addProp } from '../../redux/form'
import styled from 'styled-components'

import FormInput from './FormInput'
import Counter from '../Counter'

const Container = styled.div`
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
    justify-content: space-around;
    align-items: center;
`

const Submit = styled.input`
    border-style: none;
    width: 150px;
    border-radius: 4px;
    height: 30px;
`

interface IFormInputs {
    key: string
    value: string
}

const Form: React.FC = () => {
    const { register, handleSubmit, reset, watch } = useForm<IFormInputs>()
    const dispatch = useDispatch()

    const onSubmit = (data: IFormInputs) => {
        console.log('DATA: ', data)
        dispatch(addProp(data))
        reset()
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Container>
                <Row>
                    <FormInput name={'Name'} ref={register()} />
                    <FormInput name={'Data Source'} ref={register()} />
                </Row>
                <Row>
                    <FormInput name={'Model Name'} ref={register()} />
                    <FormInput name={'Model Type'} ref={register()} />
                </Row>
                <Row>
                    <FormInput name={'Target'} ref={register()} />
                    <FormInput name={'Transformation'} ref={register()} />
                </Row>
                <Counter />
                <Row>
                    <Submit type="submit" value="Add Property" />
                </Row>
            </Container>
        </form>
    )
}

export default Form
