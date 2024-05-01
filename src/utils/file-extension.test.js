import assert from 'node:assert/strict'
import { describe, it } from 'node:test'

import { getFileExtension } from './file-extension.js'

describe('getFileExtension util', () => {
  it('make a file extension based on parameters for .vue', () => {
    const extension = getFileExtension({
      framework: 'vue',
      language: 'js',
      target: 'resource'
    })

    assert.strictEqual(extension, 'vue')
  })

  it('make a file extension based on parameters for .tsx', () => {
    const extension = getFileExtension({
      framework: 'react',
      language: 'ts',
      target: 'resource'
    })

    assert.strictEqual(extension, 'tsx')
  })

  it('make a file extension based on parameters for .jsx', () => {
    const extension = getFileExtension({
      framework: 'react',
      language: 'js',
      target: 'resource'
    })

    assert.strictEqual(extension, 'jsx')
  })

  it('make a file extension based on parameters for .ts', () => {
    const extension = getFileExtension({
      framework: 'vanilla',
      language: 'ts',
      target: 'resource'
    })

    assert.strictEqual(extension, 'ts')
  })

  it('make a file extension based on parameters for .js', () => {
    const extension = getFileExtension({
      framework: 'vanilla',
      language: 'js',
      target: 'resource'
    })

    assert.strictEqual(extension, 'js')
  })

  it('make a file extension based on parameters for .ts with postfix spec', () => {
    const extension = getFileExtension({
      framework: 'vanilla',
      language: 'ts',
      target: 'resource',
      postfix: 'spec'
    })

    assert.strictEqual(extension, 'spec.ts')
  })

  it('make a file extension based on parameters for .js with postfix spec', () => {
    const extension = getFileExtension({
      framework: 'vanilla',
      language: 'js',
      target: 'resource',
      postfix: 'spec'
    })

    assert.strictEqual(extension, 'spec.js')
  })

  it('make a file extension based on parameters for .ts with postfix test', () => {
    const extension = getFileExtension({
      framework: 'vanilla',
      language: 'ts',
      target: 'resource',
      postfix: 'test'
    })

    assert.strictEqual(extension, 'test.ts')
  })

  it('make a file extension based on parameters for .js with postfix test', () => {
    const extension = getFileExtension({
      framework: 'vanilla',
      language: 'js',
      target: 'resource',
      postfix: 'test'
    })

    assert.strictEqual(extension, 'test.js')
  })

  it('make a file extension based on parameters for css styles: css_modules', () => {
    const extension = getFileExtension({
      target: 'style',
      postfix: 'module',
      cssFramework: 'css_modules'
    })

    assert.strictEqual(extension, 'module.css')
  })

  it('make a file extension based on parameters for css styles: scss', () => {
    const extension = getFileExtension({
      target: 'style',
      cssFramework: 'scss'
    })

    assert.strictEqual(extension, 'scss')
  })

  it('make a file extension based on parameters for css styles: css_vanilla', () => {
    const extension = getFileExtension({
      target: 'style',
      cssFramework: 'css_vanilla'
    })

    assert.strictEqual(extension, 'css')
  })

  it('make a file extension based on parameters for css styles: tailwind_file', () => {
    const extension = getFileExtension({
      target: 'style',
      cssFramework: 'tailwind_file'
    })

    assert.strictEqual(extension, 'css')
  })
})
