import React, { useState } from 'react'

/**
 * React component for a counter.
 *
 * @returns The React component
 */
const App = (): JSX.Element => {
  const [counter, setCounter] = useState(0)

  return (
    <div>
      <p>You clicked {counter} times!</p>
      <button
        onClick={(): void => {
          setCounter(counter + 1)
        }}
      >
        Increment
      </button>
    </div>
  )
}

export default App
