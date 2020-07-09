import React from 'react'
import { ReactWidget } from '@jupyterlab/apputils'
import App from '../../components/App'
import { ISignal, Signal } from '@lumino/signaling'

export type TStateChanged = ISignal<Widget, string>

class Widget extends ReactWidget {
    private _stateChanged = new Signal<this, string>(this)

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
}

export default Widget
