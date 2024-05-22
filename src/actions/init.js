import { compose } from '../utils/compose.js'
import {
  checkIfPresetFolderAlreadyExists,
  checkIfTemplateFolderAlreadyExists,
  createFileIfNotExists,
  createPresetFolderIfNotExists,
  createTemplateFolderAssets,
  createTemplateFolderIfNotExists,
  getConfigContent,
  getConfigFilePath
} from '../utils/init-action.js'

export async function initAction() {
  /*
   * Global Config
   */

  compose(getConfigFilePath, createFileIfNotExists, getConfigContent)

  /*
   * Preset Folder
   */

  compose(checkIfPresetFolderAlreadyExists, createPresetFolderIfNotExists)

  /*
   * Templates Folder
   */

  compose(
    checkIfTemplateFolderAlreadyExists,
    createTemplateFolderIfNotExists,
    createTemplateFolderAssets
  )
}
