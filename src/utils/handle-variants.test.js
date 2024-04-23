import { describe, it, mock } from 'node:test'
import assert from 'node:assert/strict'
import { handleVariants } from './handle-variants.js'

const ts = () => {}
const js = () => {}

describe('Handle Variant Utils', () => {
  it('handle ts variant and execute callback', () => {
    const mockTs = mock.fn(ts)
    const mockJs = mock.fn(js)

    handleVariants({
      target: 'ts',
      variants: {
        js: mockJs,
        ts: mockTs
      }
    })

    assert.deepEqual(mockTs.mock.callCount(), 1)
    assert.deepEqual(mockJs.mock.callCount(), 0)
  })

  it('handle js variant and execute callback', () => {
    const mockTs = mock.fn(ts)
    const mockJs = mock.fn(js)

    handleVariants({
      target: 'js',
      variants: {
        js: mockJs,
        ts: mockTs
      }
    })

    assert.deepEqual(mockTs.mock.callCount(), 0)
    assert.deepEqual(mockJs.mock.callCount(), 1)
  })
})
