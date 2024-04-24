import fs from 'node:fs'

import { describe, it, todo, mock } from 'node:test'
import assert from 'node:assert/strict'

import { getFiles, makeFileExtension, readFileContent } from './file.js'

const typescript = true
const withJsx = true
const postfix = {
  spec: 'spec',
  test: 'test'
}

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

  describe('makeFileExtension util', () => {
    it('make a file extension based on parameters for .vue', () => {
      const extension = makeFileExtension({ vue: true })

      assert.strictEqual(extension, 'vue')
    })

    it('make a file extension based on parameters for .tsx', () => {
      const extension = makeFileExtension({ typescript, withJsx })

      assert.strictEqual(extension, 'tsx')
    })

    it('make a file extension based on parameters for .jsx', () => {
      const extension = makeFileExtension({ withJsx })

      assert.strictEqual(extension, 'jsx')
    })

    it('make a file extension based on parameters for .ts', () => {
      const extension = makeFileExtension({ typescript })

      assert.strictEqual(extension, 'ts')
    })

    it('make a file extension based on parameters for .js', () => {
      const extension = makeFileExtension({ typescript: false })

      assert.strictEqual(extension, 'js')
    })

    it('make a file extension based on parameters for .ts with postfix spec', () => {
      const extension = makeFileExtension({
        typescript,
        postfix: postfix.spec
      })

      assert.strictEqual(extension, 'spec.ts')
    })

    it('make a file extension based on parameters for .js with postfix spec', () => {
      const extension = makeFileExtension({
        typescript: false,
        postfix: postfix.spec
      })

      assert.strictEqual(extension, 'spec.js')
    })

    it('make a file extension based on parameters for .ts with postfix test', () => {
      const extension = makeFileExtension({
        typescript,
        postfix: postfix.test
      })

      assert.strictEqual(extension, 'test.ts')
    })

    it('make a file extension based on parameters for .js with postfix test', () => {
      const extension = makeFileExtension({
        typescript: false,
        postfix: postfix.test
      })

      assert.strictEqual(extension, 'test.js')
    })
  })
})
