import {
    CodeMirrorEditorFactory,
    CodeMirrorMimeTypeService
} from '@jupyterlab/codemirror'
import {
    Context,
    DocumentRegistry,
    TextModelFactory
} from '@jupyterlab/docregistry'
import { ServiceManager } from '@jupyterlab/services'
import { MainAreaWidget } from '@jupyterlab/apputils'
import { TStateChanged } from '../uiWidget/ReactWidget'
import EditorWidget from './EditorWidget'
import { Editor, EditorFactory } from './Editor'

/**
 * Factory function for editor widgets.
 * @param serviceManager from app
 * @param uiStateChanged from UI Widget
 */
const createEditorWidget = (
    serviceManager: ServiceManager,
    uiStateChanged: TStateChanged
): MainAreaWidget<Editor> => {
    const factoryService = new CodeMirrorEditorFactory()
    const modelFactory = new TextModelFactory()
    const mimeTypeService = new CodeMirrorMimeTypeService()

    const path = 'test.yaml'
    const context: Context<DocumentRegistry.ICodeModel> = new Context({
        manager: serviceManager,
        factory: modelFactory,
        path
    })

    const editorFactory = new EditorFactory({
        editorServices: {
            factoryService,
            mimeTypeService
        },
        factoryOptions: {
            name: 'editor',
            fileTypes: ['yaml'],
            defaultFor: ['*']
        }
    })

    const { content } = editorFactory.createNew(context)

    const options = {
        signals: {
            uiStateChanged
        }
    }

    return new EditorWidget(content, options)
}

export default createEditorWidget
