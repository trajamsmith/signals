import { FileEditor, FileEditorFactory } from '@jupyterlab/fileeditor'
import { IDocumentWidget } from '@jupyterlab/docregistry/lib/registry'
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

const createEditorWidget = (
    serviceManager: ServiceManager
): MainAreaWidget<FileEditor> => {
    const factoryService = new CodeMirrorEditorFactory()
    const modelFactory = new TextModelFactory()
    const mimeTypeService = new CodeMirrorMimeTypeService()

    const path = 'test.yaml'
    const context: Context<DocumentRegistry.ICodeModel> = new Context({
        manager: serviceManager,
        factory: modelFactory,
        path
    })

    const editorFactory = new FileEditorFactory({
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
    const editorWidget = new MainAreaWidget({ content })

    editorWidget.id = 'signals-jupyterlab'
    editorWidget.title.label = 'Signals Editor'
    editorWidget.title.closable = true

    return editorWidget
}

export default createEditorWidget
