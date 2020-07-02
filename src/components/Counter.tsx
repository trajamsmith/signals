import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { increment } from '../redux/counter'

/**
 * React component for a counter.
 *
 * @returns The React component
 */
const Counter = ({ stateChanged }): JSX.Element => {
    const dispatch = useDispatch()
    const counter = useSelector(state => state)

    return (
        <div>
            <p>You clicked {counter} times!</p>
            <button
                onClick={(): void => {
                    stateChanged.emit(counter)
                    dispatch(increment())
                }}
            >
                Increment
            </button>
        </div>
    )
}

export default Counter
