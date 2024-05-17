import { join } from 'node:path'

import {
  checkFileExists,
  createFileWithContent,
  readFileContent
} from './file.js'
import { defaultConfig } from '../constants/config.js'
import { createPresetsFolder } from './preset.js'
import { checkDirectoriesTree } from './directory.js'

/*
 * ----------------------------------------
 *             Global Config
 * ----------------------------------------
 */

/**
 * Get config file path
 *
 * @returns {string | undefined}
 */
export function getConfigFilePath() {
  const fullPath = join(process.cwd(), 'clingon.config.json')
  const fileExists = checkFileExists(fullPath)

  if (!fileExists) return undefined

  return fullPath
}

/**
 * Create the config file if it does not exist
 *
 * @param {ReturnType<typeof getConfigFilePath>} filePath
 */
export function createFileIfNotExists(filePath) {
  if (filePath) {
    console.info('\n✅ You already have config at: ', filePath)

    return filePath
  }

  const success = createFileWithContent(
    'clingon.config.json',
    JSON.stringify(defaultConfig, null, 2)
  )
  const fullPath = join(process.cwd(), 'clingon.config.json')

  if (success) {
    console.info('🌎 Global config file created at: ', fullPath)
  } else {
    console.error('❌ Error: Cannot create global config file, try again.')
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
  const exists = checkFileExists(filePath)

  if (!exists) return null

  const fileContent = readFileContent(filePath)
  const fileContentParsed = JSON.parse(fileContent)

  return fileContentParsed
}

/*
 * ----------------------------------------
 *             Preset Folder
 * ----------------------------------------
 */

const dotClingonDir = '.clingon'
const presetsDir = 'presets'
const presetFullDir = join(process.cwd(), dotClingonDir, presetsDir)

/**
 * Check if `.clingon/prests` folde exists
 *
 * @returns {boolean}
 */
export function checkIfPresetFolderAlreadyExists() {
  return checkDirectoriesTree([dotClingonDir, presetsDir])
}

/**
 * Create `.clingon/prests` if not exists
 *
 * @param {boolean} exists Folder exists?
 */
export function createPresetFolderIfNotExists(exists) {
  if (exists) {
    return console.info(
      '\n✅ You already have presets folder at: ',
      presetFullDir
    )
  }

  const created = createPresetsFolder()

  if (!created)
    console.error('\n❌ Error: cannot create presets dir, try again')

  console.info('\n✅ Presets folder created at: ', presetFullDir)
}
