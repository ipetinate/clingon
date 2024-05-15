import { BehaviorSubject } from 'rxjs'

import { getConfigContent, getConfigFilePath } from '../utils/init-action.js'

const configFilePath = getConfigFilePath()

export const globalConfigSubject = new BehaviorSubject(
  getConfigContent(configFilePath)
)
