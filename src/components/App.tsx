import React from 'react'
import { Provider } from 'react-redux'
import store from '../redux/createStore'

import Counter from './Counter'
import Form from './Form'

/**
 * React component for a counter.
 *
 * @returns The React component
 */
const App = ({ stateChanged }): JSX.Element => {
    return (
        <Provider store={store}>
            <Counter stateChanged={stateChanged} />
            <hr />
            <Form stateChanged={stateChanged} />
        </Provider>
    )
}

export default App
