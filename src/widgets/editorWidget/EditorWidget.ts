import { MainAreaWidget } from '@jupyterlab/apputils'
import { CodeEditor } from '@jupyterlab/codeeditor'
import { TStateChanged } from '../uiWidget/ReactWidget'
import { Editor } from './Editor'

interface IEditorWidgetOptions {
    signals?: {
        uiStateChanged: TStateChanged
    }
}

class EditorWidget extends MainAreaWidget<Editor> {
    private editor: CodeEditor.IEditor

    constructor(content: Editor, options?: IEditorWidgetOptions) {
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

    selectAll = () => {
        const position = {
            start: {
                line: 0,
                column: 0
            },
            end: {
                line: 10000,
                column: 10000
            }
        }
        this.editor.setSelection(position)
    }

    /**
     * Connect the editor widget to the UI's signals.
     * @param uiStateChanged ISignal from the UI widget
     */
    private connectToUiSignal = (uiStateChanged: TStateChanged) => {
        uiStateChanged.connect((widget, data) => {
            this.selectAndReplaceAllText(data)
        }, this)
    }

    /**
     * Replace all of the text in the document.
     * @param text full text intended for the document
     */
    private selectAndReplaceAllText = (text: string) => {
        console.log(text)
        const position = {
            start: {
                line: 0,
                column: 0
            },
            end: {
                line: 10000,
                column: 10000
            }
        }
        this.editor.setSelection(position)

        this.editor.replaceSelection(text)
    }
}

export default EditorWidget
