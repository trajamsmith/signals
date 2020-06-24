import { ILayoutRestorer, JupyterFrontEndPlugin } from '@jupyterlab/application'
import { ICommandPalette } from '@jupyterlab/apputils'

import activate from './lab/activate'

/**
 * Initialization data for the signals extension.
 */
const extension: JupyterFrontEndPlugin<void> = {
    id: 'signals',
    autoStart: true,
    requires: [ICommandPalette, ILayoutRestorer],
    activate
}

export default extension
