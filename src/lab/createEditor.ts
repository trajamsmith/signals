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

const createEditor = (
    serviceManager: ServiceManager
): IDocumentWidget<FileEditor> => {
    const factoryService = new CodeMirrorEditorFactory()
    const modelFactory = new TextModelFactory()
    const mimeTypeService = new CodeMirrorMimeTypeService()

    const path = 'setup.py'
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
            fileTypes: ['*'],
            defaultFor: ['*']
        }
    })

    const editor = editorFactory.createNew(context)

    return editor
}

export default createEditor
