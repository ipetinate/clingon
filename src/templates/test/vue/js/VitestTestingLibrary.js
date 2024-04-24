import { render, screen } from '@testing-library/vue'

import { describe, it, expect } from 'vitest'

import ResourceName from 'resourcePath'

describe('ResourceName', () => {
  const componentData = {
    props: {},
    slots: {}
  }

  it('renders the correct message', () => {
    render(ResourceName, componentData)

    expect(
      screen.getByText("Hello, I'm a resource auto generated by Clingon CLI!")
    ).toBeInTheDocument()
  })
})
