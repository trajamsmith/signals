import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    flex-direction: column;
`

const Name = styled.p`
    font-size: 20px;
`

const Field = styled.input`
    padding: 7px;
    margin-right: 5px;
`

interface IFormInputProps {
    name: string
    ref: any
}

const FormInput: React.FC<IFormInputProps> = ({ name, ref }) => {
    return (
        <Container>
            <p>{name}</p>
            <Field name={name} ref={ref} />
        </Container>
    )
}

export default FormInput
