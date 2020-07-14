import { ICommandPalette } from '@jupyterlab/apputils'
import { ILayoutRestorer, JupyterFrontEndPlugin } from '@jupyterlab/application'
import { IDocumentManager } from '@jupyterlab/docmanager'

import activate from './lab/activate'

/**
 * Initialization data for the signals extension.
 */
const extension: JupyterFrontEndPlugin<void> = {
    id: 'signals',
    autoStart: true,
    requires: [ICommandPalette, ILayoutRestorer, IDocumentManager],
    activate
}

export default extension
