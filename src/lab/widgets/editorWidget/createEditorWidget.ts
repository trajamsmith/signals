import {
    CodeMirrorEditorFactory,
    CodeMirrorMimeTypeService
} from '@jupyterlab/codemirror'
import {
    Context,
    DocumentRegistry,
    TextModelFactory,
    DocumentWidget
} from '@jupyterlab/docregistry'
import { ServiceManager } from '@jupyterlab/services'
import { MainAreaWidget } from '@jupyterlab/apputils'
import { IDocumentManager } from '@jupyterlab/docmanager'

import { Editor, EditorFactory } from './Editor'
import { TStateChanged } from '../uiWidget/ReactWidget'
import ConnectedEditor from './ConnectedEditor'

/**
 * Register our Editor widget factory so we can use the
 * DocumentManager to open files with our widgets.
 * @param docRegistry singleton from activate.ts (DI)
 */
export const registerEditorFactory = (docRegistry: DocumentRegistry): void => {
    console.log({ docRegistry })
    const factoryService = new CodeMirrorEditorFactory()
    const mimeTypeService = new CodeMirrorMimeTypeService()

    // Register our custom FilEditorFactory
    docRegistry.addWidgetFactory(
        new EditorFactory({
            editorServices: {
                factoryService,
                mimeTypeService
            },
            factoryOptions: {
                name: 'connected editor',
                fileTypes: ['yaml'],
                defaultFor: []
            }
        })
    )
}

/**
 * Factory function for our connected editor widgets.
 * @param serviceManager from app
 * @param uiStateChanged from UI Widget
 */
export const createConnectedEditorWidget = (
    uiStateChanged: TStateChanged,
    docManager: IDocumentManager
): MainAreaWidget<Editor> => {
    const { content } = docManager.createNew(
        'test.yaml',
        'connected editor'
    ) as DocumentWidget<Editor, DocumentRegistry.ICodeModel>

    if (!content) {
        console.error(
            'The document manager was unable to create a ConnecteEditor widget.'
        )
        return
    }

    const options = {
        signals: {
            uiStateChanged
        }
    }

    return new ConnectedEditor(content, options)
}
