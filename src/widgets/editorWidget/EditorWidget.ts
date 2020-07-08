import { MainAreaWidget } from '@jupyterlab/apputils'
import { FileEditor, FileEditorFactory } from '@jupyterlab/fileeditor'
import {
    CodeEditor,
    CodeEditorWrapper,
    IEditorServices,
    IEditorMimeTypeService
} from '@jupyterlab/codeeditor'
import { ISignal, Signal } from '@lumino/signaling'
import { TStateChanged } from '../uiWidget/ReactWidget'

interface IEditorWidgetOptions {
    signals?: {
        uiStateChanged: TStateChanged
    }
}

class EditorWidget extends MainAreaWidget<FileEditor> {
    editor: CodeEditor.IEditor

    constructor(content: FileEditor, options?: IEditorWidgetOptions) {
        super({ content })

        // TODO: factor into configs somewhere
        this.id = 'signals-jupyterlab'
        this.title.label = 'Signals Editor'
        this.title.closable = true

        this.editor = content.editor

        const uiStateChanged = options.signals.uiStateChanged
        if (uiStateChanged) {
            this.connectToUiSignal(uiStateChanged)
        }
    }

    connectToUiSignal = (uiStateChanged: TStateChanged) => {
        this.editor.newIndentedLine()
        uiStateChanged.connect((widget, data) => {
            const editor = this.editor

            const position = editor.getSelection()
            this.editor.setSelection(position)

            if (typeof data === 'number') {
                editor.replaceSelection(`counter: ${data}\n`)
            } else {
                editor.replaceSelection(
                    //@ts-ignore
                    `${data.key}: '${data.value}'\n`
                )
            }
        }, this)
    }
}

export default EditorWidget
