import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { TestPostfixEnum } from './postfixes.js'

describe('TestPostfixEnum', () => {
  it('should return properly values', () => {
    assert.strictEqual(TestPostfixEnum.spec, 'spec')
    assert.strictEqual(TestPostfixEnum.test, 'test')
  })
})
