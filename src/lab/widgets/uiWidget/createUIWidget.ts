import ReactWidget from './ReactWidget'
import { MainAreaWidget } from '@jupyterlab/apputils'

/**
 * Factory function for UI widgets.
 */
const createUIWidget = () => {
    const content = new ReactWidget()
    const widget = new MainAreaWidget({ content })

    // TODO: factor into configs somewhere
    widget.id = 'signals-jupyterlab'
    widget.title.label = 'Signals UI'
    widget.title.closable = true

    return widget
}

export default createUIWidget
