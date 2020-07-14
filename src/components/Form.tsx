import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { addProp } from '../redux/form'

import Counter from './Counter'
import {
    Container,
    Row,
    InputContainer,
    Name,
    Field,
    Divider,
    Submit
} from './styles'

interface IFormInputs {
    key: string
    value: string
}

const Form: React.FC = () => {
    const { register, handleSubmit, reset, watch } = useForm<IFormInputs>()
    const dispatch = useDispatch()

    const onSubmit = (data: IFormInputs) => {
        console.log({ data })
        dispatch(addProp(data))
        reset()
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Container>
                <Row>
                    <InputContainer>
                        <Name>{'Recipe Name'}</Name>
                        <Field name={'Recipe Name'} ref={register()} />
                    </InputContainer>
                    <InputContainer>
                        <Name>{'Data Source'}</Name>
                        <Field name={'Data Source'} ref={register()} />
                    </InputContainer>
                </Row>
                <Row>
                    <InputContainer>
                        <Name>{'Model Name'}</Name>
                        <Field name={'Model Name'} ref={register()} />
                    </InputContainer>
                    <InputContainer>
                        <Name>{'Model Type'}</Name>
                        <Field name={'Model Type'} ref={register()} />
                    </InputContainer>
                </Row>
                <Row>
                    <InputContainer>
                        <Name>{'Target'}</Name>
                        <Field name={'Target'} ref={register()} />
                    </InputContainer>
                    <InputContainer>
                        <Name>{'Output'}</Name>
                        <Field name={'Output'} ref={register()} />
                    </InputContainer>
                </Row>
                <Counter />
                <Divider />
                <Row>
                    <Submit type="submit" value="Submit" />
                </Row>
            </Container>
        </form>
    )
}

export default Form
