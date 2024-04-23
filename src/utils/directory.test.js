import fs from 'node:fs'

import { describe, it, mock } from 'node:test'
import assert from 'node:assert/strict'

import { checkDirectoriesTree, getDirectories, getLocalLibDirname } from './directory.js'
import path from 'node:path'

const srcDirs = ['actions', 'constants', 'enums', 'flows', 'generators', 'templates', 'utils']

const rootDirs = ['.git', 'doc', 'node_modules', 'src']

const mockFsReadDir = mock.method(fs, 'readdirSync')
const pathDirnameMock = mock.method(path, 'dirname')

describe('Directory Utils', () => {
  describe('getDirectories util', () => {
    it('get directories from a specific path/dir', () => {
      mockFsReadDir.mock.mockImplementation(() => srcDirs)

      const directories = getDirectories(process.cwd() + '/src')

      assert.deepEqual(directories, srcDirs)
    })

    it('get directories from root', () => {
      mockFsReadDir.mock.mockImplementation(() => rootDirs)

      const directories = getDirectories()

      assert.deepEqual(directories, rootDirs)
    })
  })

  describe('checkDirectoriesTree util', () => {
    it('returns true if directory tree structure exists', () => {
      const exists = checkDirectoriesTree(['src', 'actions'])

      assert.strictEqual(exists, true)
    })

    it('returns false if directory tree structure not exists', () => {
      const exists = checkDirectoriesTree(['src', 'foo', 'bar'])

      assert.strictEqual(exists, false)
    })
  })

  describe('getLocalLibDirname util', () => {
    it('returns true if directory tree structure exists', () => {
      const mockPath = 'mock_path/src'

      pathDirnameMock.mock.mockImplementation(() => mockPath)

      const local_dirname = getLocalLibDirname()

      assert.strictEqual(local_dirname, mockPath)
    })
  })
})
