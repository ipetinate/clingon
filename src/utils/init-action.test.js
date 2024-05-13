import { describe, it, expect } from './Vitest'

import { initAction } from 'src/utils/init-action'

describe('initAction', () => {
  it('should works properly', () => {
    const result = initAction()

    expect(result).toBeDefined()
  })
})
