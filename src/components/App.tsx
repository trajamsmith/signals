import React from 'react'
import { Provider } from 'react-redux'
import store from '../redux/createStore'

import Counter from './Counter'

/**
 * React component for a counter.
 *
 * @returns The React component
 */
const App = ({ stateChanged }): JSX.Element => {
    return (
        <Provider store={store}>
            <Counter stateChanged={stateChanged} />
        </Provider>
    )
}

export default App
