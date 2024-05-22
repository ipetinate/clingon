import { join } from 'node:path'

import {
  checkFileExists,
  createFileWithContent,
  readFileContent
} from './file.js'
import { defaultConfig } from '../constants/config.js'
import { createPresetsFolder } from './preset.js'
import { checkDirectoriesTree, createDir } from './directory.js'
import { localDirname } from '../main.js'

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
 * Check if `.clingon/prests` folder exists
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

  if (created) {
    console.info('\n✅ Presets folder created at: ', presetFullDir)
  } else {
    console.error('\n❌ Error: cannot create presets dir, try again')
  }
}

/*
 * ----------------------------------------
 *             Preset Folder
 * ----------------------------------------
 */

const templatesDir = 'templates'
const templatesFullDir = join(process.cwd(), dotClingonDir, templatesDir)

/**
 * Check if `.clingon/templates` folder exists
 *
 * @returns {boolean}
 */
export function checkIfTemplateFolderAlreadyExists() {
  return checkDirectoriesTree([dotClingonDir, templatesDir])
}

/**
 * Create `.clingon/templates` if not exists
 *
 * @param {boolean} exists Folder exists?
 */
export function createTemplateFolderIfNotExists(exists) {
  if (exists) {
    console.info(
      '\n✅ You already have templates folder at: ',
      templatesFullDir
    )

    return exists
  }

  const created = createDir(templatesFullDir)

  if (created) {
    console.info('\n✅ Templates folder created at: ', templatesFullDir)
  } else {
    console.error('\n❌ Error: cannot create templates dir, try again')
  }

  return created
}

/**
 * Create readme and meta file at `.clingon/templates`
 *
 * @param {boolean} created Folder exists or already be created
 */
export function createTemplateFolderAssets(created) {
  try {
    const guideMdFileName = join(templatesFullDir, 'README.md')
    const guideMdContent = readFileContent(
      join(localDirname, 'templates', 'core', 'SCAFFOLD_GUIDE.md')
    )

    const metaFileName = join(templatesFullDir, 'meta.yaml')
    const metaYamlContent = readFileContent(
      join(localDirname, 'templates', 'core', 'meta.yaml')
    )

    createFileWithContent(guideMdFileName, guideMdContent)
    createFileWithContent(metaFileName, metaYamlContent)
  } catch (error) {
    console.error(error)
  }
}
