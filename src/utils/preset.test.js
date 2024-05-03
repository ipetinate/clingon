import fs from 'node:fs'
import assert from 'node:assert'

import { describe, it, mock } from 'node:test'

import { getPresetFileContent, getPresetFiles, getPresetsPreview } from './preset.js'

const mockFsReadDir = mock.method(fs, 'readdirSync')
const mockExistsSync = mock.method(fs, 'existsSync')
const mockFsReadFileSync = mock.method(fs, 'readFileSync')

const srcDirs = ['.clingon']
const nestedStrucuture = '.clingon/presets'
const mockFolderFiles = ['preset1.json', 'test.json', 'react-component.json']
const mockFolderFilesName = [
  { name: 'preset1', fileName: 'preset1.json' },
  { name: 'test', fileName: 'test.json' },
  { name: 'react-component', fileName: 'react-component.json' }
]

describe('preset', () => {
  it('get preset files', () => {
    mockFsReadDir.mock.mockImplementation(() => srcDirs)

    mockFsReadDir.mock.mockImplementation(() => mockFolderFiles)
    mockExistsSync.mock.mockImplementation((value) => nestedStrucuture.search(value))

    const presets = getPresetFiles()

    assert.deepEqual(presets, mockFolderFiles)
  })

  it('get preset file name to show as object', () => {
    mockFsReadDir.mock.mockImplementation(() => srcDirs)

    mockFsReadDir.mock.mockImplementation(() => mockFolderFiles)
    mockExistsSync.mock.mockImplementation((value) => nestedStrucuture.search(value))

    const presets = getPresetFiles()
    const presetsPreview = getPresetsPreview(presets)

    assert.deepEqual(presetsPreview, mockFolderFilesName)
  })

  it('get preset file content by name', () => {
    mockFsReadDir.mock.mockImplementation(() => srcDirs)

    mockFsReadDir.mock.mockImplementation(() => mockFolderFiles)
    mockExistsSync.mock.mockImplementation((value) => nestedStrucuture.search(value))
    mockFsReadFileSync.mock.mockImplementation((fileName) => {
      if (fileName.includes('.clingon/presets/test.json')) {
        return '{"name":"test"}'
      }
    })

    const presetContent = getPresetFileContent('test.json')

    assert.deepEqual(presetContent, { name: 'test' })
  })
})