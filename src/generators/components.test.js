import { describe, it, todo } from 'node:test'
import assert from 'node:assert/strict'

import { FrameworkEnum } from '../enums/frameworks.js'

/**
 * @type {import("../types.js").Answers}
 */
const answers = {
  framework: FrameworkEnum.vue,
  name: 'Test',
  resourcePath: '/folder',
  testPostfix: 'spec',
  type: 'page',
  typescript: true,
  version: null,
  withStory: false,
  withTest: false
}

describe.todo('Components Generator', () => {
  todo("should create a component based on answers (user's prompted)", () => {})
})
