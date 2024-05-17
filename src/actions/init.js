import { compose } from '../utils/compose.js'
import {
  checkIfPresetFolderAlreadyExists,
  createFileIfNotExists,
  createPresetFolderIfNotExists,
  getConfigContent,
  getConfigFilePath,
  updateGlobalStore
} from '../utils/init-action.js'

export async function initAction() {
  /*
   * Global Config
   */

  compose(
    getConfigFilePath,
    createFileIfNotExists,
    getConfigContent,
    updateGlobalStore
  )

  /*
   * Preset Folder
   */

  compose(checkIfPresetFolderAlreadyExists, createPresetFolderIfNotExists)
}
