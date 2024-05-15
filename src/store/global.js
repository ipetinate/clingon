import { join } from 'node:path'
import { BehaviorSubject } from 'rxjs'
import { getConfigContent } from '../utils/init-action.js'

const configFilePath = join(process.cwd(), 'clingon.config.json')

export const globalConfigSubject = new BehaviorSubject(getConfigContent(configFilePath))
