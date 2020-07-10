import { ILayoutRestorer, JupyterFrontEnd } from '@jupyterlab/application'
import {
    ICommandPalette,
    MainAreaWidget,
    WidgetTracker
} from '@jupyterlab/apputils'
import { FileEditor } from '@jupyterlab/fileeditor'

// import { requestAPI } from '../services/signals'
import ReactWidget from './widgets/uiWidget/ReactWidget'
import createEditorWidget from './widgets/editorWidget/createEditorWidget'
import createUIWidget from './widgets/uiWidget/createUIWidget'

export default (
    app: JupyterFrontEnd,
    palette: ICommandPalette,
    restorer: ILayoutRestorer
): void => {
    console.log('JupyterLab extension signals is activated!')

    let uiWidget: MainAreaWidget<ReactWidget>
    let editorWidget: MainAreaWidget<FileEditor>

    // Add an application command
    const command = 'signals:open'
    app.commands.addCommand(command, {
        label: 'Open Signals Test App',
        execute: () => {
            if (!uiWidget || uiWidget.isDisposed) {
                // Create a new widget if one does not exist
                uiWidget = createUIWidget()
            }

            if (!editorWidget || editorWidget.isDisposed) {
                // Create a new editor if one does not exist
                editorWidget = createEditorWidget(
                    app.serviceManager,
                    uiWidget.content.stateChanged
                )
            }

            // Track the states of the widgets for later restoration
            if (!tracker.has(uiWidget)) {
                tracker.add(uiWidget)
            }

            // Attach the widgets to the main work area if they're not there
            if (!uiWidget.isAttached) {
                app.shell.add(uiWidget, 'main')
            }
            if (!editorWidget.isAttached) {
                app.shell.add(editorWidget, 'main')
            }

            // Activate the widgets
            app.shell.activateById(uiWidget.id)
            // app.shell.activateById(editorWidget.id)
        }
    })

    // Add the command to the palette.
    palette.addItem({ command, category: 'AAA' })

    // Track and restore the widget state
    const tracker = new WidgetTracker<MainAreaWidget>({
        namespace: 'signals'
    })
    restorer.restore(tracker, {
        command,
        name: () => 'signals'
    })

    // requestAPI<any>('get_example')
    //     .then(data => {
    //         console.log(data)
    //     })
    //     .catch(reason => {
    //         console.error(
    //             `The signals server extension appears to be missing.\n${reason}`
    //         )
    //     })
}
