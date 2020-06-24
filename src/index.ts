import { JupyterFrontEndPlugin } from '@jupyterlab/application'

import activate from './activate'

/**
 * Initialization data for the signals extension.
 */
const extension: JupyterFrontEndPlugin<void> = {
  id: 'signals',
  autoStart: true,
  activate
}

export default extension
