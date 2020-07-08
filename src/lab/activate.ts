import { ILayoutRestorer, JupyterFrontEnd } from '@jupyterlab/application'
import {
    ICommandPalette,
    MainAreaWidget,
    WidgetTracker
} from '@jupyterlab/apputils'
import { FileEditor } from '@jupyterlab/fileeditor'

import ReactWidget from '../widgets/uiWidget/ReactWidget'
import { requestAPI } from '../services/signals'
import createEditorWidget from '../widgets/editorWidget/createEditorWidget'
import createUIWidget from '../widgets/uiWidget/createUIWidget'

export default (
    app: JupyterFrontEnd,
    palette: ICommandPalette,
    restorer: ILayoutRestorer
): void => {
    console.log('JupyterLab extension signals is activated!')

    let widget: MainAreaWidget<ReactWidget>
    let editorWidget: MainAreaWidget<FileEditor>

    // Add an application command
    const command = 'signals:open'
    app.commands.addCommand('signals:open', {
        label: 'Open Signals Test App',
        execute: () => {
            if (!widget || widget.isDisposed) {
                // Create a new widget if one does not exist
                widget = createUIWidget()
            }

            if (!tracker.has(widget)) {
                // Track the state of the widget for later restoration
                tracker.add(widget)
            }

            if (!widget.isAttached) {
                // Attach the widget to the main work area if it's not there
                app.shell.add(widget, 'main')
            }

            widget.content.update()

            // Activate the widget
            // app.shell.activateById(widget.id)
            if (!editorWidget || editorWidget.isDisposed) {
                // Create a new editor if one does not exist
                editorWidget = createEditorWidget(
                    app.serviceManager,
                    widget.content.stateChanged
                )
            }

            if (!tracker.has(editorWidget)) {
                // Track the state of the editor for later restoration
                tracker.add(editorWidget)
            }

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
        MainAreaWidget<ReactWidget> | MainAreaWidget<FileEditor>
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
