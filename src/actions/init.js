import { compose } from '../utils/compose.js'
import { readFileContent } from '../utils/file.js'
import { getConfigContent, getFilePathOrCreate } from '../utils/init-action.js'

export async function initAction() {
  // TODO: generate clingon.config.js

  const result = compose(getFilePathOrCreate, getConfigContent)

  // TODO: create folders for presets and templates
  // TODO: add a default template for function or other asset
}
