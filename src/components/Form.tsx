import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { addProp, IFormSlice } from '../redux/form'

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

const Form: React.FC = () => {
    const { register, handleSubmit, reset, watch } = useForm<IFormSlice>()
    const dispatch = useDispatch()

    const onSubmit = (data: IFormSlice) => {
        console.log({ data })
        dispatch(addProp(data))
        reset()
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Container>
                <Row>
                    <InputContainer>
                        <Name>{'recipeName'}</Name>
                        <Field name={'Recipe Name'} ref={register()} />
                    </InputContainer>
                    <InputContainer>
                        <Name>{'dataSource'}</Name>
                        <Field name={'Data Source'} ref={register()} />
                    </InputContainer>
                </Row>
                <Row>
                    <InputContainer>
                        <Name>{'modelName'}</Name>
                        <Field name={'Model Name'} ref={register()} />
                    </InputContainer>
                    <InputContainer>
                        <Name>{'modelType'}</Name>
                        <Field name={'Model Type'} ref={register()} />
                    </InputContainer>
                </Row>
                <Row>
                    <InputContainer>
                        <Name>{'target'}</Name>
                        <Field name={'Target'} ref={register()} />
                    </InputContainer>
                    <InputContainer>
                        <Name>{'output'}</Name>
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
