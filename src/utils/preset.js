import { join } from 'node:path'

import { createFileWithContent, getFiles, readFileContent } from './file.js'

import { checkDirectoriesTree, createDir } from './directory.js'

const rootDir = process.cwd()
const dotClingon = './.clingon'
const presetsDir = 'presets'
const presetsExtension = '.json'

export function getPresetFiles() {
  const hasDotClingonPath = checkDirectoriesTree([dotClingon, presetsDir])

  if (hasDotClingonPath) {
    const presetFilesPath = join(rootDir, dotClingon, presetsDir)

    const files = getFiles(presetFilesPath)

    const presets = files.map((path) => {
      const pieces = path.split('/')

      return pieces[pieces.length - 1]
    })

    return presets
  } else {
    const created = createDir(rootDir)

    if (created) getPresetFiles()
  }
}

export function getPresetFileContent(fileName) {
  const presetFilePath = join(rootDir, dotClingon, presetsDir, fileName)

  const fileContent = readFileContent(presetFilePath)

  const parsedAsJsonFileContent =
    typeof fileContent === 'string' ? JSON.parse(fileContent) : fileContent

  return parsedAsJsonFileContent
}

export function getPresetsPreview(presets) {
  const names = presets.map((file) => ({
    name: file.split('.')[0],
    fileName: file
  }))

  return names
}

export function saveAnswersAsPreset(fileName, answers) {
  const presetPath = join(dotClingon, presetsDir, fileName + presetsExtension)

  const parsedJsonContent = JSON.stringify(answers, null, 2)

  const success = createFileWithContent(presetPath, parsedJsonContent)

  return { success, path: presetPath }
}
