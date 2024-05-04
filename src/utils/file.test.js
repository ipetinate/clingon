import fs from 'node:fs'

import assert from 'node:assert/strict'
import { describe, it, todo, mock } from 'node:test'

import { createFileWithContent, getFiles, readFileContent } from './file.js'

const mockFsReadDirSync = mock.method(fs, 'readdirSync')
const mockFsReadFileSync = mock.method(fs, 'readFileSync')
const mockFsWrtieFileSync = mock.method(fs, 'writeFileSync')

const mockFolderFiles = ['mockFile.json', 'mocks.js', 'fakeFile.ts']

describe('File Util', () => {
  describe('getFiles util', () => {
    it('get files from root dir', () => {
      mockFsReadDirSync.mock.mockImplementation(() => mockFolderFiles)

      const files = getFiles()

      for (const [index, filePath] of files) {
        assert.match(filePath, new RegExp(mockFolderFiles[index]))
      }
    })

    it('get files content error flow', () => {
      mockFsReadDirSync.mock.mockImplementation(() => {
        throw new Error('fake error')
      })

      assert.throws(getFiles, Error)
    })
  })

  describe('readFileContent util', () => {
    it('get file content', () => {
      mockFsReadFileSync.mock.mockImplementation((fileName) => {
        const files = {
          'clingon.json': '{"exportDefault":false}'
        }

        return files[fileName]
      })

      const fileContent = readFileContent('clingon.json')

      assert.deepEqual(JSON.parse(fileContent), { exportDefault: false })
    })

    it('get file content error flow', () => {
      const expectToThrowError = () => {
        const fileContent = readFileContent('/clingon.blabla')

        assert.strictEqual(fileContent, undefined)
        assert.throws(expectToThrowError, Error)
      }
    })
  })

  describe('createFileWithContent util', () => {
    it('create a file with content', () => {
      mockFsWrtieFileSync.mock.mockImplementation(() => true)

      const success = createFileWithContent('test.json', 'content')

      assert.strictEqual(success, true)
    })

    it('create a file with content should throw error', () => {
      mockFsWrtieFileSync.mock.mockImplementation(() => {
        throw new Error('wrong file format')
      })

      const success = createFileWithContent('test.json', {
        invalid: 'content'
      })

      assert.strictEqual(success, false)
    })
  })
})
