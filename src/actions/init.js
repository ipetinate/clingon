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

/**
 *
 * @param {Record<"examples", boolean>} options Command options with flags, like `--e`
 */
export async function initAction(options) {
  /*
   * Global Config
   */

  compose(
    getConfigFilePath(options.examples),
    createFileIfNotExists,
    getConfigContent
  )

  /*
   * Preset Folder
   */

  compose(
    checkIfPresetFolderAlreadyExists(options.examples),
    createPresetFolderIfNotExists
  )

  /*
   * Templates Folder
   */

  compose(
    checkIfTemplateFolderAlreadyExists(options.examples),
    createTemplateFolderIfNotExists,
    createTemplateFolderAssets
  )
}
