import fs from 'node:fs'
import assert from 'node:assert/strict'

import { describe, it, mock } from 'node:test'

import { buildCustomTemplate } from './custom-template.js'

const mockStatSync = mock.method(fs, 'statSync')
const mockExistsSync = mock.method(fs, 'existsSync')
const mockFsAccessSync = mock.method(fs, 'accessSync')
const mockFsReadFileSync = mock.method(fs, 'readFileSync')
const mockFsWriteFileSync = mock.method(fs, 'writeFileSync')

describe('scaffoldTemplate', () => {
  it('build component based on template', async () => {
    mockStatSync.mock.mockImplementation(() => ({
      isDirectory: () => true
    }))
    mockExistsSync.mock.mockImplementation(() => true)
    mockFsAccessSync.mock.mockImplementation(() => true)
    mockFsReadFileSync.mock.mockImplementation(() => 'mock file content')
    mockFsWriteFileSync.mock.mockImplementation(() => true)

    const result = await buildCustomTemplate('TestComponent', {
      identifier: 'component',
      case: 'camelCase',
      folderWrapper: true,
      resources: [
        {
          path: 'components',
          template: './components/Component.ts'
        },
        {
          path: 'components',
          template: './components/Component.stories.ts'
        },
        {
          path: 'components',
          template: './components/Component.styles.ts'
        },
        {
          path: 'components',
          template: './components/Component.test.ts'
        }
      ]
    })

    assert.deepEqual(result, [
      'components/testComponent/testComponent.ts',
      'components/testComponent/testComponent.test.ts',
      'components/testComponent/testComponent.styles.ts',
      'components/testComponent/testComponent.stories.ts'
    ])
  })

  it('build a rust file without additional files', async () => {
    mockStatSync.mock.mockImplementation(() => ({
      isDirectory: () => true
    }))
    mockExistsSync.mock.mockImplementation(() => true)
    mockFsAccessSync.mock.mockImplementation(() => true)
    mockFsReadFileSync.mock.mockImplementation(() => 'mock file content')
    mockFsWriteFileSync.mock.mockImplementation(() => true)

    const result = await buildCustomTemplate('TestController', {
      identifier: 'component',
      case: 'snake_case',
      folderWrapper: true,
      resource: {
        path: 'controllers',
        template: './controllers/user_controller.rs'
      }
    })

    assert.deepEqual(result, ['controllers/test_controller/test_controller.rs'])
  })

  it('build a rust file without folder wrapper', async () => {
    mockStatSync.mock.mockImplementation(() => ({
      isDirectory: () => true
    }))
    mockExistsSync.mock.mockImplementation(() => true)
    mockFsAccessSync.mock.mockImplementation(() => true)
    mockFsReadFileSync.mock.mockImplementation(() => 'mock file content')
    mockFsWriteFileSync.mock.mockImplementation(() => true)

    const result = await buildCustomTemplate('TestController', {
      identifier: 'component',
      case: 'snake_case',
      folderWrapper: false,
      resources: [
        {
          path: 'controllers',
          template: './controllers/user_controller.rs'
        }
      ]
    })

    assert.deepEqual(result, ['controllers/test_controller.rs'])
  })

  it('build a file with PascalCase', async () => {
    mockStatSync.mock.mockImplementation(() => ({
      isDirectory: () => true
    }))
    mockExistsSync.mock.mockImplementation(() => true)
    mockFsAccessSync.mock.mockImplementation(() => true)
    mockFsReadFileSync.mock.mockImplementation(() => 'mock file content')
    mockFsWriteFileSync.mock.mockImplementation(() => true)

    const result = await buildCustomTemplate('UserController', {
      identifier: 'component',
      case: 'PascalCase',
      folderWrapper: false,
      resources: [
        {
          path: 'controllers',
          template: './controllers/UserController.ts'
        }
      ]
    })

    assert.deepEqual(result, ['controllers/UserController.ts'])
  })

  it('build a file with camelCase', async () => {
    mockStatSync.mock.mockImplementation(() => ({
      isDirectory: () => true
    }))
    mockExistsSync.mock.mockImplementation(() => true)
    mockFsAccessSync.mock.mockImplementation(() => true)
    mockFsReadFileSync.mock.mockImplementation(() => 'mock file content')
    mockFsWriteFileSync.mock.mockImplementation(() => true)

    const result = await buildCustomTemplate('UserController', {
      identifier: 'component',
      case: 'camelCase',
      folderWrapper: false,
      resources: [
        {
          path: 'controllers',
          template: './controllers/UserController.ts'
        }
      ]
    })

    assert.deepEqual(result, ['controllers/userController.ts'])
  })

  it('build a file with snake_case', async () => {
    mockStatSync.mock.mockImplementation(() => ({
      isDirectory: () => true
    }))
    mockExistsSync.mock.mockImplementation(() => true)
    mockFsAccessSync.mock.mockImplementation(() => true)
    mockFsReadFileSync.mock.mockImplementation(() => 'mock file content')
    mockFsWriteFileSync.mock.mockImplementation(() => true)

    const result = await buildCustomTemplate('UserController', {
      identifier: 'component',
      case: 'snake_case',
      folderWrapper: false,
      resources: [
        {
          path: 'controllers',
          template: './controllers/UserController.ts'
        }
      ]
    })

    assert.deepEqual(result, ['controllers/user_controller.ts'])
  })

  it('build a file with kebab-case', async () => {
    mockStatSync.mock.mockImplementation(() => ({
      isDirectory: () => true
    }))
    mockExistsSync.mock.mockImplementation(() => true)
    mockFsAccessSync.mock.mockImplementation(() => true)
    mockFsReadFileSync.mock.mockImplementation(() => 'mock file content')
    mockFsWriteFileSync.mock.mockImplementation(() => true)

    const result = await buildCustomTemplate('UserController', {
      identifier: 'component',
      case: 'kebab-case',
      folderWrapper: false,
      resources: [
        {
          path: 'controllers',
          template: './controllers/UserController.ts'
        }
      ]
    })

    assert.deepEqual(result, ['controllers/user-controller.ts'])
  })

  it('build a file with UPPERCASE', async () => {
    mockStatSync.mock.mockImplementation(() => ({
      isDirectory: () => true
    }))
    mockExistsSync.mock.mockImplementation(() => true)
    mockFsAccessSync.mock.mockImplementation(() => true)
    mockFsReadFileSync.mock.mockImplementation(() => 'mock file content')
    mockFsWriteFileSync.mock.mockImplementation(() => true)

    const result = await buildCustomTemplate('UseHttpRequest', {
      identifier: 'component',
      case: 'UPPERCASE',
      folderWrapper: false,
      resources: [
        {
          path: 'docs',
          template: './docs/REACT_HOOK_DOCUMENTATION.md'
        }
      ]
    })

    assert.deepEqual(result, ['docs/USEHTTPREQUEST.md'])
  })

  it('build a file with lowercase', async () => {
    mockStatSync.mock.mockImplementation(() => ({
      isDirectory: () => true
    }))
    mockExistsSync.mock.mockImplementation(() => true)
    mockFsAccessSync.mock.mockImplementation(() => true)
    mockFsReadFileSync.mock.mockImplementation(() => 'mock file content')
    mockFsWriteFileSync.mock.mockImplementation(() => true)

    const result = await buildCustomTemplate('UseHttpRequest', {
      identifier: 'component',
      case: 'lowercase',
      folderWrapper: false,
      resources: [
        {
          path: 'docs',
          template: './docs/REACT_HOOK_DOCUMENTATION.md'
        }
      ]
    })

    assert.deepEqual(result, ['docs/usehttprequest.md'])
  })
})
