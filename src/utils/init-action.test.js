import fs from 'node:fs'
import assert from 'node:assert/strict'

import { describe, it, mock } from 'node:test'

import {
  getConfigFilePath,
  createFileIfNotExists,
  checkIfPresetFolderAlreadyExists
} from './init-action.js'

const mockStatSync = mock.method(fs, 'statSync')
const mockExistsSync = mock.method(fs, 'existsSync')
const mockFsAccessSync = mock.method(fs, 'accessSync')
const mockFsWriteFileSync = mock.method(fs, 'writeFileSync')

describe('Init Action Utils', () => {
  describe('Global Config composing methods', () => {
    it('get config file path', () => {
      mockFsAccessSync.mock.mockImplementation(() => true)

      const clojure = getConfigFilePath(false)

      const { fullPath } = clojure()

      const expectedPath = fullPath?.includes('clingon.config.json')

      assert.strictEqual(expectedPath, true)
    })

    it('create file if not exists', () => {
      mockFsAccessSync.mock.mockImplementation(() => true)
      mockFsWriteFileSync.mock.mockImplementation(() => true)

      const getPath = getConfigFilePath(false)

      const { fullPath } = createFileIfNotExists({
        examples: true,
        fullPath: getPath()
      })

      const expectedPath = fullPath?.includes('clingon.config.json')

      assert.strictEqual(expectedPath, true)
    })
  })

  describe('Presets Folder', () => {
    it('check if folders exists', () => {
      mockStatSync.mock.mockImplementation(() => ({
        isDirectory: () => true
      }))
      mockExistsSync.mock.mockImplementation((value) =>
        '.clingon/presets'.search(value)
      )

      const clojure = checkIfPresetFolderAlreadyExists(false)

      const { exists } = clojure()

      assert.strictEqual(exists, true)
    })
  })
})
