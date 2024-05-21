import { scaffoldAction } from 'src/utils/scaffold-action'

describe('scaffoldAction', () => {
  it('should works properly', () => {
    const result = scaffoldAction()

    expect(result).toBeDefined()
  })
})
