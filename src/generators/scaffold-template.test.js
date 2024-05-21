import assert from 'node:assert/strict'

import { describe, it } from 'node:test'

import { scaffoldTemplate } from './scaffold-template'

describe('scaffoldTemplate', () => {
  it('should works properly', () => {
    const result = scaffoldTemplate()

    assert.strictEqual(result, true)
  })
})
