import { globalConfigSubject } from '../store/global.js'

import { compose } from '../utils/compose.js'
import {
  createFileIfNotExists,
  getConfigContent,
  getConfigFilePath,
  updateGlobalStore
} from '../utils/init-action.js'

export async function initAction() {
  let alreadyHaveGlobalConfig = false

  const subscription = globalConfigSubject.subscribe((content) => {
    if (typeof content === 'object') alreadyHaveGlobalConfig = true
  })

  if (!alreadyHaveGlobalConfig) {
    compose(
      getConfigFilePath,
      createFileIfNotExists,
      getConfigContent,
      updateGlobalStore
    )
  } else {
    console.info(
      'You already have a configuration file at: ',
      getConfigFilePath()
    )
  }

  // TODO: create folders for presets and templates
  // TODO: add a default template for function or other asset

  return subscription.unsubscribe()
}
