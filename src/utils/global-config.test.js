import { describe, it } from 'node:test'
import assert from 'node:assert/strict'

import { readLocalConfig } from './global-config.js'

const config = {
  exportDefault: false
}

describe('Global Config Utils', () => {
  describe('readLocalConfig util', () => {
    it('get local config from root dir', () => {
      const localConfig = readLocalConfig('clingon.json')

      assert.deepEqual(localConfig, config)
    })

    it('throw error if file not exists', () => {
      const shouldThrowError = () => readLocalConfig('clingon.toml')

      assert.throws(shouldThrowError, Error)
    })
  })
})
