import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

describe('ResourceName', () => {
  it("should work's properly", async () => {
    render(<ResourceName message="Hello Clingon!" />)

    expect(await screen.findByText('Hello Clingon!'))
  })
})
