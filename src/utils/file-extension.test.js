import assert from 'node:assert/strict'
import { describe, it } from 'node:test'

import { getFileExtension, removePostfixAndExt } from './file-extension.js'

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

  it('remove extension from vue file', () => {
    const name = removePostfixAndExt('File.vue')

    assert.strictEqual(name, 'File')
  })

  it('remove extension from react file', () => {
    const name = removePostfixAndExt('File.jsx')

    assert.strictEqual(name, 'File')
  })

  it('remove extension from react-ts file', () => {
    const name = removePostfixAndExt('File.tsx')

    assert.strictEqual(name, 'File')
  })

  it('remove extension from story jsx file', () => {
    const name = removePostfixAndExt('File.stories.jsx')

    assert.strictEqual(name, 'File')
  })

  it('remove extension from story tsx file', () => {
    const name = removePostfixAndExt('File.stories.tsx')

    assert.strictEqual(name, 'File')
  })

  it('remove extension from story js file', () => {
    const name = removePostfixAndExt('File.stories.js')

    assert.strictEqual(name, 'File')
  })

  it('remove extension from story ts file', () => {
    const name = removePostfixAndExt('File.stories.ts')

    assert.strictEqual(name, 'File')
  })

  it('remove extension from spec jsx file', () => {
    const name = removePostfixAndExt('File.spec.jsx')

    assert.strictEqual(name, 'File')
  })

  it('remove extension from spec tsx file', () => {
    const name = removePostfixAndExt('File.spec.tsx')

    assert.strictEqual(name, 'File')
  })

  it('remove extension from spec js file', () => {
    const name = removePostfixAndExt('File.spec.js')

    assert.strictEqual(name, 'File')
  })

  it('remove extension from spec ts file', () => {
    const name = removePostfixAndExt('File.spec.ts')

    assert.strictEqual(name, 'File')
  })

  it('remove extension from test jsx file', () => {
    const name = removePostfixAndExt('File.test.jsx')

    assert.strictEqual(name, 'File')
  })

  it('remove extension from test tsx file', () => {
    const name = removePostfixAndExt('File.test.tsx')

    assert.strictEqual(name, 'File')
  })

  it('remove extension from test js file', () => {
    const name = removePostfixAndExt('File.test.js')

    assert.strictEqual(name, 'File')
  })

  it('remove extension from test ts file', () => {
    const name = removePostfixAndExt('File.test.ts')

    assert.strictEqual(name, 'File')
  })
})
