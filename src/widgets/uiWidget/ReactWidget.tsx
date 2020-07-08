import React from 'react'
import { ReactWidget } from '@jupyterlab/apputils'
import App from '../../components/App'
import { ISignal, Signal } from '@lumino/signaling'

export interface ICount {
    clickCount: number
}

export interface IKeyValue {
    key: string
    value: string
}

export type TStateChanged = ISignal<Widget, ICount | IKeyValue>

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

    public get stateChanged(): TStateChanged {
        return this._stateChanged
    }

    render(): JSX.Element {
        return <App stateChanged={this._stateChanged} />
    }

    private _stateChanged = new Signal<this, ICount>(this)
}

export default Widget
