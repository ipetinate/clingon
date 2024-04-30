import fs from 'node:fs'

import assert from 'node:assert/strict'
import { describe, it, todo, mock } from 'node:test'

import { getFiles, readFileContent } from './file.js'

const mockFsReadDir = mock.method(fs, 'readdirSync')
const mockFsReadFileSync = mock.method(fs, 'readFileSync')

const mockFolderFiles = ['mockFile.json', 'mocks.js', 'fakeFile.ts']

describe('File Util', () => {
  describe('getFiles util', () => {
    it('get files from root dir', () => {
      mockFsReadDir.mock.mockImplementation(() => mockFolderFiles)

      const files = getFiles()

      for (const [index, filePath] of files) {
        assert.match(filePath, new RegExp(mockFolderFiles[index]))
      }
    })

    it('get files content error flow', () => {
      mockFsReadDir.mock.mockImplementation(() => {
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
    // TODO: mock fs to make this test

    todo('create a file with content', () => {})
  })
})
