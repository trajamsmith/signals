import ReactWidget from './ReactWidget'
import { MainAreaWidget } from '@jupyterlab/apputils'

const createUIWidget = () => {
    const content = new ReactWidget()
    const widget = new MainAreaWidget({ content })

    widget.id = 'signals-jupyterlab'
    widget.title.label = 'Signals UI'
    widget.title.closable = true

    return widget
}

export default createUIWidget
