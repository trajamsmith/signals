import React from 'react'
import { Provider } from 'react-redux'
import store from '../redux/createStore'
import YAML from 'yaml'

import Form from './Form'

/**
 * React component for a counter.
 *
 * @returns The React component
 */
const App = ({ stateChanged }): JSX.Element => {
    // Trigger EditorWidget update using the whole store
    store.subscribe(() => {
        const state = store.getState()
        console.log({ state })
        stateChanged.emit(YAML.stringify(state))
    })

    return (
        <Provider store={store}>
            <Form />
        </Provider>
    )
}

export default App
