import assert from 'node:assert/strict'
import { describe, it } from 'node:test'

import { validateObject } from './validator.js'

describe('validateObject function', () => {
  it('returns an empty array for an empty object and empty type map', () => {
    const obj = {}
    const typeMap = {}

    assert.deepStrictEqual(validateObject(obj, typeMap), [])
  })

  it('returns an empty array for matching object and type map', () => {
    const obj = { a: 1, b: 'string' }
    const typeMap = { a: 'number', b: 'string' }

    assert.deepStrictEqual(validateObject(obj, typeMap), [])
  })

  it('returns an array of errors for non-matching object and type map', () => {
    const obj = { a: 1, b: 'string' }
    const typeMap = { a: 'number', b: 'number' }

    const errors = validateObject(obj, typeMap)
    assert.strictEqual(errors.length > 0, true)
  })

  it('returns an empty array for matching nested objects and type map', () => {
    const obj = { a: { b: 1 } }
    const typeMap = { a: { b: 'number' } }

    assert.deepStrictEqual(validateObject(obj, typeMap), [])
  })

  it('returns an empty array for partially matching object and type map with allowPartial = true', () => {
    const obj = { a: 1 }
    const typeMap = { a: 'number', b: 'string' }

    assert.deepStrictEqual(validateObject(obj, typeMap, true), [])
  })

  it('returns an array of errors for partially matching object and type map with allowPartial = false', () => {
    const obj = { a: 1 }
    const typeMap = { a: 'number', b: 'string' }

    const errors = validateObject(obj, typeMap, false)
    assert.strictEqual(errors.length > 0, true)
  })

  it('returns an array of errors for non-object type obj', () => {
    const obj = null
    const typeMap = { a: 'number' }

    const errors = validateObject(obj, typeMap)
    assert.strictEqual(errors.length > 0, true)
  })

  it('returns an array of errors for type map expecting an object but receiving a primitive', () => {
    const obj = { a: 1 }
    const typeMap = { a: { b: 'number' } }

    const errors = validateObject(obj, typeMap)
    assert.strictEqual(errors.length > 0, true)
  })

  it('returns an empty array for type map having nested object and obj having undefined key with allowPartial = true', () => {
    const obj = { a: {} }
    const typeMap = { a: { b: 'number' } }

    assert.deepStrictEqual(validateObject(obj, typeMap, true), [])
  })

  it('returns an array of errors for type map having nested object and obj having undefined key with allowPartial = false', () => {
    const obj = { a: {} }
    const typeMap = { a: { b: 'number' } }

    const errors = validateObject(obj, typeMap, false)
    assert.strictEqual(errors.length > 0, true)
  })
})
