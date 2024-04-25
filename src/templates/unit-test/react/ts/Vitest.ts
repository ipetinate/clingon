import React from 'react'
import ReactDOM from 'react-dom'

import { describe, it, expect } from 'vitest'

import { ResourceName } from 'resourcePath'

describe('ResourceName', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')

    const element = ReactDOM.render(<ResourceName />, div)

    expect(element).toBeDefined()
  })
})
