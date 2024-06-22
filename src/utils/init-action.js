import { join } from 'node:path'

import {
  checkFileExists,
  createFileWithContent,
  readFileContent
} from './file.js'
import {
  checkDirectoriesTree,
  createDir,
  getLocalLibDirname
} from './directory.js'
import { createPresetsFolder } from './preset.js'
import {
  globalCoreFiles,
  presetsCoreFiles,
  templateCoreFiles
} from '../constants/init.js'
import { splitPathString } from './string.js'

/*
 * ----------------------------------------
 *             Global Config
 * ----------------------------------------
 */

/**
 * Get config file path
 *
 * @param {boolean} examples Should generate examples
 * @returns {() => ({ fullPath: string, examples: examples })}
 */
export function getConfigFilePath(examples) {
  return () => {
    const fullPath = join(process.cwd(), 'clingon.config.json')
    const fileExists = checkFileExists(fullPath)

    if (!fileExists) {
      return { fullPath: undefined, examples }
    }

    return { fullPath, examples }
  }
}

/**
 * Create the config file if it does not exist
 *
 * @param {{ fullPath: string, examples: boolean }} props Props
 * @returns {{ fullPath: string, examples: boolean }}
 */
export function createFileIfNotExists({ examples, fullPath }) {
  if (fullPath) {
    console.info('\n✅ You already have config at: ', fullPath)

    return fullPath
  }

  const success = createFolderAssets(globalCoreFiles, process.cwd())

  if (success) {
    console.info(
      '🌎 Global config file created at: ',
      join(process.cwd(), 'clingon.config.json')
    )
  } else {
    console.error('❌ Error: Cannot create global config file, try again.')
  }

  return { fullPath, examples }
}

/*
 * ----------------------------------------
 *             Presets Folder
 * ----------------------------------------
 */

const presetsDir = 'presets'
const dotClingonDir = '.clingon'
const presetFullDir = join(process.cwd(), dotClingonDir, presetsDir)

/**
 * Check if `.clingon/prests` folder exists
 *
 * @returns {() => ({ exists: boolean, examples: boolean })}
 */
export function checkIfPresetFolderAlreadyExists(examples) {
  return () => ({
    exists: checkDirectoriesTree([dotClingonDir, presetsDir]),
    examples
  })
}

/**
 * Create `.clingon/prests` if not exists
 *
 * @param {{ exists: boolean, examples: boolean }} props Props
 */
export function createPresetFolderIfNotExists({ exists, examples }) {
  if (exists) {
    return console.info(
      '\n✅ You already have presets folder at: ',
      presetFullDir
    )
  }

  exists = createPresetsFolder()

  if (exists) {
    console.info('\n🎛️  Presets created at: ', presetFullDir)
  } else {
    console.error('\n❌ Error: cannot create presets dir, try again.')
  }

  return { exists, examples }
}

/**
 * Create readme and meta file at `.clingon/templates`
 *
 * @param {{ exists: boolean, examples: boolean }} props Props
 */
export function createPresetsFolderAssets({ examples, exists }) {
  if (!examples) return

  try {
    if (!exists) throw new Error('Cannot create folder to place files')

    createFolderAssets(presetsCoreFiles, presetFullDir)
  } catch (error) {
    console.error(error)
  }
}

/*
 * ----------------------------------------
 *             Templates Folder
 * ----------------------------------------
 */

const templatesDir = 'templates'
const templatesFullDir = join(process.cwd(), dotClingonDir, templatesDir)

/**
 * Check if `.clingon/templates` folder exists
 */
export function checkIfTemplateFolderAlreadyExists(examples) {
  return () => ({
    exists: checkDirectoriesTree([dotClingonDir, templatesDir]),
    examples
  })
}

/**
 * Create `.clingon/templates` if not exists
 *
 * @param {{ exists: boolean, examples: boolean }} props Props
 */
export function createTemplateFolderIfNotExists({ examples, exists }) {
  if (exists) {
    console.info(
      '\n✅ You already have templates folder at: ',
      templatesFullDir
    )

    return { examples, exists }
  }

  exists = createDir(templatesFullDir)

  if (exists) {
    console.info('\n📂 Templates created at: ', templatesFullDir)
  } else {
    console.error('\n❌ Error: cannot create templates dir, try again')
  }

  return { examples, exists }
}

/**
 * Create readme and meta file at `.clingon/templates`
 *
 * @param {{ exists: boolean, examples: boolean }} props Props
 */
export function createTemplateFolderAssets({ examples, exists }) {
  if (!examples) return

  try {
    if (!exists) throw new Error('Cannot create folder to place files')

    createFolderAssets(templateCoreFiles, templatesFullDir)
  } catch (error) {
    console.error(error)
  }
}

/*
 * ----------------------------------------
 *             Handle Examples
 * ----------------------------------------
 */

/**
 * Create file based on json
 *
 * @param {{ folder: string, target: string, files: string[] }} data Data
 */
export function createFolderAssets(data, path) {
  try {
    const localDirname = getLocalLibDirname()

    data.forEach((item) => {
      let target = join(path, item.target)

      let exists = checkDirectoriesTree(splitPathString(target))

      if (!exists) createDir(target)

      item.files.forEach((file) => {
        const fileName = join(target, file)

        const fileContent = readFileContent(
          join(localDirname, item.folder, file)
        )

        return createFileWithContent(fileName, fileContent)
      })
    })

    return true
  } catch (error) {
    console.error(error)
  }
}
