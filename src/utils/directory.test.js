import fs from 'node:fs'

import { describe, it, mock, beforeEach } from 'node:test'
import assert from 'node:assert/strict'

import {
  checkDirectoriesTree,
  createDir,
  getDirectories,
  getLocalLibDirname
} from './directory.js'
import path from 'node:path'

const srcDirs = [
  'actions',
  'constants',
  'enums',
  'flows',
  'generators',
  'templates',
  'utils'
]
const nestedStrucuture = 'src/actions'
const rootDirs = ['.git', 'doc', 'node_modules', 'src']

const mockStatSync = mock.method(fs, 'statSync')
const mockExistsSync = mock.method(fs, 'existsSync')
const mockFsReadDir = mock.method(fs, 'readdirSync')
const mockFsMkdirSync = mock.method(fs, 'mkdirSync')
const pathDirnameMock = mock.method(path, 'dirname')

describe('Directory Utils', () => {
  describe('getDirectories util', () => {
    it('get directories from a specific path/dir', () => {
      mockFsReadDir.mock.mockImplementation(() => srcDirs)
      mockStatSync.mock.mockImplementation((value) => ({
        isDirectory: () => {
          for (let src of srcDirs) {
            if (src.search(value)) return true
          }
        }
      }))

      const directories = getDirectories()

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
      mockExistsSync.mock.mockImplementation((value) =>
        nestedStrucuture.search(value)
      )

      const exists = checkDirectoriesTree(['src', 'actions'])

      assert.strictEqual(exists, true)
    })

    it('returns false if directory tree structure not exists', () => {
      mockExistsSync.mock.restore()

      const exists = checkDirectoriesTree(['src', 'foo', 'bar'])

      assert.strictEqual(exists, false)
    })

    it('returns true if directory is a root and exists', () => {
      mockExistsSync.mock.restore()

      const exists = checkDirectoriesTree(['.'])

      assert.strictEqual(exists, true)
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

  describe('createDir util', () => {
    it('returns true if create dir', () => {
      mockFsMkdirSync.mock.mockImplementation(() => true)

      const dirCreated = createDir('/', '/new')

      assert.strictEqual(dirCreated, true)
    })

    it('returns false if not create dir', () => {
      mockFsMkdirSync.mock.mockImplementation(() => {
        throw new Error('error')
      })

      const dirCreated = createDir('/', '/new')

      assert.strictEqual(dirCreated, false)
    })
  })
})
