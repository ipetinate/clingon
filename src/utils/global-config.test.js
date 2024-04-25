import fs from 'node:fs'
import assert from 'node:assert/strict'

import { describe, it, mock } from 'node:test'

import { readLocalConfig } from './global-config.js'

const config = {
  exportDefault: false
}

const mockReadDirSync = mock.method(fs, 'readdirSync').mock
const mockReadFIleSync = mock.method(fs, 'readFileSync').mock

describe('Global Config Utils', () => {
  it('get local config from root dir', () => {
    mockReadDirSync.mockImplementation(() => ['clingon.json'])
    mockReadFIleSync.mockImplementation(() => '{"exportDefault":false}')

    const localConfig = readLocalConfig('clingon.json')

    assert.deepEqual(localConfig, config)
  })

  it('throw error if file not exists', () => {
    mockReadDirSync.mockImplementation(() => [])

    const shouldThrowError = () => readLocalConfig('clingon.toml')

    assert.throws(shouldThrowError, Error)
  })
})
