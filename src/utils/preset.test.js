import fs from 'node:fs'
import assert from 'node:assert'

import { describe, it, mock } from 'node:test'

import {
  dotClingon,
  getPresetFileContent,
  getPresetFiles,
  getPresetsPreview,
  presetsDir,
  rootDir,
  saveAnswersAsPreset
} from './preset.js'
import { join } from 'node:path'

/*
 * Mocks
 */

const mockStatSync = mock.method(fs, 'statSync')
const mockExistsSync = mock.method(fs, 'existsSync')
const mockFsMkdirSync = mock.method(fs, 'mkdirSync')
const mockFsReadDirSync = mock.method(fs, 'readdirSync')
const mockFsReadFileSync = mock.method(fs, 'readFileSync')
const mockFsWriteFileSync = mock.method(fs, 'writeFileSync')

/*
 * Placeholder data
 */

const srcDirs = [dotClingon]
const nestedStrucuture = join(dotClingon, presetsDir)

const mockFolderFiles = ['preset1.json', 'test.json', 'react-component.json']

const mockFolderFilesName = [
  { name: 'preset1', fileName: 'preset1.json' },
  { name: 'test', fileName: 'test.json' },
  { name: 'react-component', fileName: 'react-component.json' }
]

describe('preset', () => {
  it('get preset files', () => {
    mockFsReadDirSync.mock.mockImplementation(() => mockFolderFiles)
    mockExistsSync.mock.mockImplementation((value) => nestedStrucuture.search(value))
    mockFsMkdirSync.mock.mockImplementation(() => true)

    mockStatSync.mock.mockImplementation((value) => ({
      isDirectory: () => {
        for (let src of srcDirs) {
          if (src.search(value)) return true
        }
      }
    }))

    const presets = getPresetFiles()

    assert.deepEqual(presets, mockFolderFiles)
  })

  it('get preset file name to show as object', () => {
    mockFsReadDirSync.mock.mockImplementation(() => mockFolderFiles)
    mockExistsSync.mock.mockImplementation((value) => nestedStrucuture.search(value))
    mockFsMkdirSync.mock.mockImplementation(() => true)

    const presets = getPresetFiles()
    const presetsPreview = getPresetsPreview(presets)

    assert.deepEqual(presetsPreview, mockFolderFilesName)
  })

  it('get preset file content by name', () => {
    mockFsReadDirSync.mock.mockImplementation(() => srcDirs)
    mockFsMkdirSync.mock.mockImplementation(() => true)

    mockExistsSync.mock.mockImplementation((value) => nestedStrucuture.search(value))
    mockFsReadFileSync.mock.mockImplementation((fileName) => {
      if (fileName.includes('.clingon/presets/test.json')) {
        return '{"name":"test"}'
      }
    })

    const presetContent = getPresetFileContent('test.json')

    assert.deepEqual(presetContent, { name: 'test' })
  })

  it('save file with preset content', () => {
    mockFsWriteFileSync.mock.mockImplementation(() => true)
    mockFsMkdirSync.mock.mockImplementation(() => true)

    const content = { name: 'Clingon' }

    const { success } = saveAnswersAsPreset('test', content)

    assert.strictEqual(success, true)
  })

  it('save file with preset content and return path', () => {
    mockFsWriteFileSync.mock.mockImplementation(() => true)

    const content = { name: 'Clingon' }

    const { success, path } = saveAnswersAsPreset('test', content)

    assert.strictEqual(success, true)
    assert.strictEqual(path, '.clingon/presets/test.json')
  })

  it("don't save file with preset content", () => {
    mockFsWriteFileSync.mock.mockImplementation(() => {
      throw new Error('wrong file format')
    })

    const content = { name: 'Clingon' }

    const { success } = saveAnswersAsPreset('test', content)

    assert.strictEqual(success, false)
  })
})
