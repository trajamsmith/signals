import React from 'react'
import { ReactWidget } from '@jupyterlab/apputils'
import App from './App'

/**
 * A Counter Lumino Widget that wraps a CounterComponent.
 */
class Widget extends ReactWidget {
  /**
   * Constructs a new MainWidget.
   */
  constructor() {
    super()
    this.addClass('jp-ReactWidget')
  }

  render(): JSX.Element {
    return <App />
  }
}

export default Widget
