import { join } from 'node:path'

import { checkDirectoriesTree } from './directory.js'
import { checkFileExists, createFileWithContent, readFileContent } from './file.js'

import { defaultConfig } from '../constants/config.js'

export function getFilePathOrCreate() {
  const clingonConfigName = 'clingon.config.json'
  const rootDir = process.cwd()
  const fullPath = join(rootDir, clingonConfigName)

  const fileExists = checkFileExists(fullPath)

  if (fileExists) {
    return () => fullPath
  }

  const success = createFileWithContent(clingonConfigName, JSON.stringify(defaultConfig))

  if (success) {
    console.info('Global config file successufully created at: ', fullPath)
  } else {
    console.error('Error: Cannot create global config file, try again.')
  }

  return () => fullPath
}

export function getConfigContent(configPath) {
  try {
    return () => readFileContent(configPath)
  } catch (e) {
    return () => (error instanceof Error ? error.message : error)
  }
}
