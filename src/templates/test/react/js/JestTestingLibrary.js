import { render, screen } from '@testing-library/react'

import ResourceName from 'resourcePath/ResourceName'

describe('ResourceName', () => {
  it('renders welcome message', () => {
    render(<ResourceName />)

    expect(
      screen.getByText("Hello, I'm a component, auto generated by Tricorder CLI!")
    ).toBeInTheDocument()
  })
})
