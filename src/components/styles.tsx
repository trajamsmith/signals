import styled from 'styled-components'

export const Container = styled.div`
    with: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    & > * {
        margin: 15px;
    }
`

export const Row = styled.div`
    width: 100%;

    display: flex;
    justify-content: space-around;
    align-items: center;
`

export const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
`

export const Name = styled.p`
    font-size: 14px;
`

export const Field = styled.input`
    width: 200px;
    padding: 7px;
    margin-right: 5px;
`

export const Submit = styled.input`
    width: 300px;
    height: 40px;

    border-style: none;
    border-radius: 4px;

    color: white;
    font-size: 20px;
    background-color: #4287f5;
`

export const Divider = styled.hr`
    width: 100%;
`
