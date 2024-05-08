import React from 'react'
import ReactDOM from 'react-dom'

import { describe, it, expect } from 'vitest'

import { KebabCase } from 'src/actions/KebabCase'

describe('KebabCase', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')

    const element = ReactDOM.render(<KebabCase />, div)

    expect(element).toBeDefined()
  })
})
