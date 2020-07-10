import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { increment } from '../redux/counter'
import { IStore } from '../redux/createStore'
import styled from 'styled-components'

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
    justify-content: center;
    align-items: center;
`

const Text = styled.p`
    font-size: 20px;
    margin-left: 100px;
`

const Button = styled.button`
    border-style: none;
    width: 200px;
    border-radius: 4px;
    height: 40px;
`

/**
 * React component for a counter.
 *
 * @returns The React component
 */
const Counter: React.FC = () => {
    const dispatch = useDispatch()
    const counter = useSelector((state: IStore) => state.counter)

    return (
        <Container>
            <Row>
                <Button
                    onClick={(): void => {
                        dispatch(increment())
                    }}
                >
                    Increment
                </Button>
                <Text>{counter}</Text>
            </Row>
        </Container>
    )
}

export default Counter
