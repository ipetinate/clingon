import { compose } from '../utils/compose.js'
import {
  checkIfPresetFolderAlreadyExists,
  checkIfTemplateFolderAlreadyExists,
  createFileIfNotExists,
  createPresetFolderIfNotExists,
  createPresetsFolderAssets,
  createTemplateFolderAssets,
  createTemplateFolderIfNotExists,
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

  compose(getConfigFilePath(options.examples), createFileIfNotExists)

  /*
   * Preset Folder
   */

  compose(
    checkIfPresetFolderAlreadyExists(options.examples),
    createPresetFolderIfNotExists,
    createPresetsFolderAssets
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
