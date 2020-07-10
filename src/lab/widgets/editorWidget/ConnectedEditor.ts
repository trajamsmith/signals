import { MainAreaWidget } from '@jupyterlab/apputils'
import { CodeEditor } from '@jupyterlab/codeeditor'
import { TStateChanged } from '../uiWidget/ReactWidget'
import { Editor } from './Editor'

interface IEditorWidgetOptions {
    signals?: {
        uiStateChanged: TStateChanged
    }
}

/**
 * Widget that connects the Editor to the signals emitted
 * by the UI widget.
 */
class ConnectedEditor extends MainAreaWidget<Editor> {
    private editor: Editor

    constructor(content: Editor, options?: IEditorWidgetOptions) {
        super({ content })

        // TODO: factor into configs somewhere
        this.id = 'signals-jupyterlab'
        this.title.label = 'Signals Editor'
        this.title.closable = true

        this.editor = content

        const uiStateChanged = options.signals.uiStateChanged
        if (uiStateChanged) {
            this.connectToUiSignal(uiStateChanged)
        }
    }

    /**
     * Connect the editor widget to the UI's signals.
     * @param uiStateChanged signal from the UI widget
     */
    private connectToUiSignal = (uiStateChanged: TStateChanged) => {
        uiStateChanged.connect((widget, data) => {
            this.editor.replaceAll(data)
        }, this)
    }
}

export default ConnectedEditor
