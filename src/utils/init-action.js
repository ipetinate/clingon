import { join } from 'node:path'

import {
  checkFileExists,
  createFileWithContent,
  readFileContent
} from './file.js'

import { defaultConfig } from '../constants/config.js'
import { error } from 'node:console'
import { globalConfigSubject } from '../store/global.js'

const rootDir = process.cwd()
const configFileName = 'clingon.config.json'
const fullPath = join(rootDir, configFileName)

/**
 * Get config file path
 *
 * @returns {string | undefined}
 */
export function getConfigFilePath() {
  const fileExists = checkFileExists(fullPath)

  if (!fileExists) {
    return undefined
  }

  return fullPath
}

/**
 * Create the config file if it does not exist
 *
 * @param {ReturnType<typeof getConfigFilePath>} filePath
 */
export function createFileIfNotExists(filePath) {
  if (filePath) return filePath

  const success = createFileWithContent(
    configFileName,
    JSON.stringify(defaultConfig, null, 2)
  )

  if (success) {
    console.info('Global config file created at: ', fullPath)
  } else {
    console.error('Error: Cannot create global config file, try again.')
  }

  return filePath
}

/**
 * Get config file content
 *
 * @param {ReturnType<typeof createFileIfNotExists>} filePath Config file path
 * @returns {import('../types.js').GlobalConfig | string}
 */
export function getConfigContent(filePath) {
  try {
    const fileContent = readFileContent(filePath)
    const fileContentParsed = JSON.parse(fileContent)

    return fileContentParsed
  } catch (e) {
    return error instanceof Error ? error.message : error
  }
}

/**
 * Get config file content
 *
 * @param {ReturnType<typeof getConfigContent>} fileContent Config file content
 * @returns {void}
 */
export function updateGlobalStore(fileContent) {
  if (!fileContent) return

  globalConfigSubject.next(fileContent)
}
