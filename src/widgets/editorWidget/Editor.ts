import { FileEditor, FileEditorFactory } from '@jupyterlab/fileeditor'
import { IEditorServices } from '@jupyterlab/codeeditor'
import { DocumentWidget, DocumentRegistry } from '@jupyterlab/docregistry'
import { textEditorIcon } from '@jupyterlab/ui-components'

/**
 * Our custom Editor widget extends the existing FileEditor to
 * include "select all" and "replace all," for full replacement
 * of the editor contents.
 */
export class Editor extends FileEditor {
    constructor(options: FileEditor.IOptions) {
        super(options)
    }

    /**
     * Select all contents of the document.
     */
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
     * Replace all of the text in the document.
     * @param text full text intended for the document
     */
    replaceAll = (text: string) => {
        this.selectAll()
        this.editor.replaceSelection(text)
    }
}

/**
 * Similar to the FileEditorFactory, but returns a widget containing
 * our custom Editor, with its minor extensions.
 */
export class EditorFactory extends FileEditorFactory {
    private services: IEditorServices

    constructor(options: FileEditorFactory.IOptions) {
        super(options)
        this.services = options.editorServices
    }

    /**
     * Create a new widget given a context.
     */
    createNew(context: DocumentRegistry.CodeContext) {
        const factory = options => {
            return this.services.factoryService.newDocumentEditor(options)
        }

        const content = new Editor({
            factory,
            context,
            mimeTypeService: this.services.mimeTypeService
        })

        content.title.icon = textEditorIcon

        const widget = new DocumentWidget({ content, context })
        return widget
    }
}
