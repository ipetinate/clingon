import { describe, it } from 'node:test'
import assert from 'node:assert/strict'

import { compose } from './compose.js'

describe('Compose Executor Util', () => {
  const createName = () => 'Spock'
  const createRace = (name) => name + ', Vulcan'
  const createPatent = (race) => race + ', LT'

  it('should execute all callbacks, passing result from last callback to the next', () => {
    const result = compose(createName, createRace, createPatent)

    assert.strictEqual(result, 'Spock, Vulcan, LT')
  })
})
