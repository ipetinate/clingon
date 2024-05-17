import fs from 'node:fs'
import assert from 'node:assert/strict'

import { describe, it, mock } from 'node:test'

import {
  checkIfPresetFolderAlreadyExists,
  createFileIfNotExists,
  getConfigContent,
  getConfigFilePath
} from './init-action.js'

const configFileName = 'clingon.config.json'

const mockFsAccessSync = mock.method(fs, 'accessSync')
const mockExistsSync = mock.method(fs, 'existsSync')
const mockFsReadFileSync = mock.method(fs, 'readFileSync')
const mockFsWriteFileSync = mock.method(fs, 'writeFileSync')

describe('Init Action Utils', () => {
  describe('Global Config composing methods', () => {
    it('get config file path', () => {
      mockFsAccessSync.mock.mockImplementation(() => true)

      const result = getConfigFilePath()

      const expectedPath = result.includes('clingon.config.json')

      assert.strictEqual(expectedPath, true)
    })

    it('create file if not exists', () => {
      mockFsAccessSync.mock.mockImplementation(() => true)
      mockFsWriteFileSync.mock.mockImplementation(() => true)

      const result = createFileIfNotExists(getConfigFilePath())

      const expectedPath = result.includes('clingon.config.json')

      assert.strictEqual(expectedPath, true)
    })

    it('get config content', () => {
      mockFsAccessSync.mock.mockImplementation(() => true)
      mockFsReadFileSync.mock.mockImplementation((fileName) => {
        fileName = fileName.split('clingon/')[1]

        const files = {
          [configFileName]: '{"exportDefault":false,"alias":{"src":"@"}}'
        }

        return files[fileName]
      })

      const result = getConfigContent(getConfigFilePath())

      assert.deepEqual(result, {
        exportDefault: false,
        alias: { src: '@' }
      })
    })
  })

  describe('Presets Folder', () => {
    it('check if folders exists', () => {
      mockExistsSync.mock.mockImplementation((value) =>
        '.clingon/presets'.search(value)
      )

      const exists = checkIfPresetFolderAlreadyExists(['.clingon', 'presets'])

      assert.strictEqual(exists, true)
    })
  })
})
