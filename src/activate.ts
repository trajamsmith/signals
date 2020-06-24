import { ILayoutRestorer, JupyterFrontEnd } from '@jupyterlab/application'
import {
    ICommandPalette,
    MainAreaWidget,
    WidgetTracker
} from '@jupyterlab/apputils'

import ReactWidget from './ReactWidget'
import { requestAPI } from './signals'

export default (
    app: JupyterFrontEnd,
    palette: ICommandPalette,
    restorer: ILayoutRestorer
): void => {
    console.log('JupyterLab extension signals is activated!')

    // Declare a widget variable
    let widget: MainAreaWidget<ReactWidget>

    // Add an application command
    const command = 'signals:open'
    app.commands.addCommand(command, {
        label: 'Open Signals Test App',
        execute: () => {
            if (!widget) {
                // Create a new widget if one does not exist
                const content = new ReactWidget()
                widget = new MainAreaWidget({ content })
                widget.id = 'signals-jupyterlab'
                widget.title.label = 'Signals Test'
                widget.title.closable = true
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
            app.shell.activateById(widget.id)
        }
    })

    // Add the command to the palette.
    palette.addItem({ command, category: 'Tutorial' })

    // Track and restore the widget state
    const tracker = new WidgetTracker<MainAreaWidget<ReactWidget>>({
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
