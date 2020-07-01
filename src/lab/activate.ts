import { ILayoutRestorer, JupyterFrontEnd } from '@jupyterlab/application'
import {
    ICommandPalette,
    MainAreaWidget,
    WidgetTracker
} from '@jupyterlab/apputils'
// import { IDocumentManager } from '@jupyterlab/docmanager'
import {
    FileEditor,
    // IEditorTracker,
    FileEditorFactory
} from '@jupyterlab/fileeditor'
import { IDocumentWidget } from '@jupyterlab/docregistry/lib/registry'
import {
    CodeMirrorEditorFactory,
    CodeMirrorMimeTypeService
} from '@jupyterlab/codemirror'
import {
    Context,
    DocumentRegistry,
    TextModelFactory
    // DocumentWidget
} from '@jupyterlab/docregistry'

import ReactWidget from './ReactWidget'
import { requestAPI } from '../services/signals'

export default (
    app: JupyterFrontEnd,
    palette: ICommandPalette,
    restorer: ILayoutRestorer
): void => {
    console.log('JupyterLab extension signals is activated!')
    const factoryService = new CodeMirrorEditorFactory()
    const modelFactory = new TextModelFactory()
    const mimeTypeService = new CodeMirrorMimeTypeService()

    const path = 'setup.py'
    const context: Context<DocumentRegistry.ICodeModel> = new Context({
        manager: app.serviceManager,
        factory: modelFactory,
        path
    })

    // Declare a widget variable
    let widget: MainAreaWidget<ReactWidget>

    let editor: IDocumentWidget<FileEditor>
    let editorWidget: MainAreaWidget<FileEditor>

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

    // Add an application command
    const command = 'signals:open'
    app.commands.addCommand('signals:open', {
        label: 'Open Signals Test App',
        execute: () => {
            if (!widget || widget.isDisposed) {
                // Create a new widget if one does not exist
                const content = new ReactWidget()
                widget = new MainAreaWidget({ content })
                widget.id = 'signals-jupyterlab'
                widget.title.label = 'Signals UI'
                widget.title.closable = true
            }

            // if (!tracker.has(widget)) {
            //     // Track the state of the widget for later restoration
            //     tracker.add(widget)
            // }

            if (!widget.isAttached) {
                // Attach the widget to the main work area if it's not there
                app.shell.add(widget, 'main')
            }

            widget.content.update()

            // Activate the widget
            // app.shell.activateById(widget.id)
            if (!editorWidget || editorWidget.isDisposed) {
                // Create a new editor if one does not exist
                editor = editorFactory.createNew(context)
                editorWidget = new MainAreaWidget({ content: editor.content })
                editorWidget.id = 'signals-jupyterlab'
                editorWidget.title.label = 'Signals Editor'
                editorWidget.title.closable = true
            }

            // if (!tracker.has(editor)) {
            //     // Track the state of the editor for later restoration
            //     tracker.add(editor)
            // }

            if (!editorWidget.isAttached) {
                // Attach the editor to the main work area if it's not there
                app.shell.add(editorWidget, 'main')
            }

            editorWidget.content.update()

            // Activate the editor
            app.shell.activateById(editorWidget.id)
        }
    })

    // Add the command to the palette.
    palette.addItem({ command, category: 'AAA' })

    // Track and restore the widget state
    const tracker = new WidgetTracker<
        MainAreaWidget<ReactWidget> | IDocumentWidget<FileEditor>
    >({
        namespace: 'signals'
    })
    restorer.restore(tracker, {
        command,
        name: () => 'signals'
    })

    requestAPI<any>('get_example')
        .then(data => {
            console.log(data)
        })
        .catch(reason => {
            console.error(
                `The signals server extension appears to be missing.\n${reason}`
            )
        })
}
