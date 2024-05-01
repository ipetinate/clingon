import assert from 'node:assert/strict'
import { describe, it, mock } from 'node:test'

const consoleMock = mock.method(console, 'table').mock

import { getCssApproachName, getPathChoices, pathValidator, showPreview } from './guided-action.js'
import { cssApproachLabels } from '../constants/labels.js'
import { resourcesPaths } from '../constants/choices.js'

describe('Guided Action Utils', () => {
  describe('getCssApproachName util', () => {
    it('get css approach name', () => {
      const cssModules = getCssApproachName('css_modules')
      const scss = getCssApproachName('scss')
      const vanilla = getCssApproachName('css_vanilla')
      const noStyle = getCssApproachName('no_style')
      const tailwindInline = getCssApproachName('tailwind_inline')
      const tailwindFile = getCssApproachName('tailwind_file')

      assert.strictEqual(cssModules, cssApproachLabels.css_modules)
      assert.strictEqual(scss, cssApproachLabels.scss)
      assert.strictEqual(vanilla, cssApproachLabels.css_vanilla)
      assert.strictEqual(noStyle, cssApproachLabels.no_style)
      assert.strictEqual(tailwindInline, cssApproachLabels.tailwind_inline)
      assert.strictEqual(tailwindFile, cssApproachLabels.tailwind_file)
    })
  })

  describe('showpreview util', () => {
    const preview = {
      cssFramework: 'css_modules',
      framework: 'react',
      name: 'test',
      resourcePath: 'resourcePath',
      storyPath: 'storyPath',
      storyPostfix: 'stories',
      testFramework: 'jest',
      testPath: 'testPath',
      testPostfix: 'spec',
      type: 'component',
      typescript: true,
      version: 3,
      withStory: true,
      withTest: true,
      withTestingLibrary: true
    }

    it('show preview data on `console.table()`', () => {
      let result

      consoleMock.mockImplementation((value) => {
        result = value
      })

      showPreview(preview)

      assert.strict(result, preview)
    })
  })

  describe('pathValidator util', () => {
    it('validate path and return message if empty', () => {
      const result = pathValidator('')

      assert.strictEqual(result, 'Enter an existing path. For root dir, use "."')
    })

    it('validate path and return true if has content', () => {
      const result = pathValidator('src/actions')

      assert.strictEqual(result, true)
    })
  })

  describe('getPathChoices util', () => {
    it('get test path choices to list on prompt', () => {
      const result = getPathChoices({ type: 'component', target: 'test' })

      assert.strictEqual(result, resourcesPaths.test['component'])
    })

    it('get story path choices to list on prompt', () => {
      const result = getPathChoices({ type: 'component', target: 'story' })

      assert.strictEqual(result, resourcesPaths.storybook_story['component'])
    })

    it('get component path choices to list on prompt', () => {
      const result = getPathChoices({ type: 'component' })

      assert.strictEqual(result, resourcesPaths.component)
    })

    it('get function path choices to list on prompt', () => {
      const result = getPathChoices({ type: 'function' })

      assert.strictEqual(result, resourcesPaths.function)
    })

    it('get page path choices to list on prompt', () => {
      const result = getPathChoices({ type: 'page' })

      assert.strictEqual(result, resourcesPaths.page)
    })

    it('get model path choices to list on prompt', () => {
      const result = getPathChoices({ type: 'model' })

      assert.strictEqual(result, resourcesPaths.model)
    })

    it('get type path choices to list on prompt', () => {
      const result = getPathChoices({ type: 'type' })

      assert.strictEqual(result, resourcesPaths.type)
    })

    it('get enum path choices to list on prompt', () => {
      const result = getPathChoices({ type: 'enum' })

      assert.strictEqual(result, resourcesPaths.enum)
    })

    it('get cypress_spec path choices to list on prompt', () => {
      const result = getPathChoices({ type: 'cypress_spec' })

      assert.strictEqual(result, resourcesPaths.cypress_spec)
    })
  })
})
