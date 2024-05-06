import path from 'node:path'

import { FrameworkEnum } from '../enums/frameworks.js'

import { localDirname } from '../main.js'
import { unitTestTemplates } from '../constants/templates.js'

import { compose } from '../utils/compose.js'
import { getFileExtension, removePostfixAndExt } from '../utils/file-extension.js'
import { capitalizeLetter, convertCase } from '../utils/string.js'
import { createFileWithContent, readFileContent } from '../utils/file.js'

/**
 * @typedef {import("../types.js").Answers} Answers
 */

/**
 * Component generator
 *
 * @param {Answers  & { path: string }} answers Answers prompted to the user
 */
export function generateTests(answers) {
  const { success, path } = compose(
    defineTestTemplate(answers),
    getTemplateContent,
    makePathWithExtension,
    replaceAllTestTextOccurrences,
    generateTestFile
  )

  if (success) {
    console.info(capitalizeLetter(answers.testPostfix) + ' created successfully: ' + path)
  } else {
    console.error(`Error on create ${answers.testPostfix}, try again`)
  }
}

/**
 * Get component template details
 *
 * @param {Answers & { path: string }} data - Data to compose component
 * @returns {() => Answers & { templatePath: string }}
 */
export function defineTestTemplate(data) {
  return () => {
    /**
     * Template path from path's dictionary
     */
    let templatePath = ''

    /**
     * @type {"js" | "ts"}
     */
    const variant = data.typescript ? 'ts' : 'js'

    if (['function'].includes(data.type)) {
      templatePath = unitTestTemplates.function[variant][data.testFramework]
    }

    if (['component', 'page'].includes(data.type)) {
      switch (data.framework) {
        case FrameworkEnum.react: {
          if (data.testFramework === 'jest') {
            if (data.withTestingLibrary) {
              templatePath = unitTestTemplates.react[variant].jestTestingLibrary
            } else {
              templatePath = unitTestTemplates.react[variant].jest
            }
          }

          if (data.testFramework === 'vitest') {
            if (data.withTestingLibrary) {
              templatePath = unitTestTemplates.react[variant].vitestTestingLibrary
            } else {
              templatePath = unitTestTemplates.react[variant].vitest
            }
          }

          break
        }
        case FrameworkEnum.vue: {
          if (data.testFramework === 'jest') {
            if (data.withTestingLibrary) {
              templatePath = unitTestTemplates.vue[variant].jestTestingLibrary
            } else {
              templatePath = unitTestTemplates.vue[variant].jest
            }
          }

          if (data.testFramework === 'vitest') {
            if (data.withTestingLibrary) {
              templatePath = unitTestTemplates.vue[variant].vitestTestingLibrary
            } else {
              templatePath = unitTestTemplates.vue[variant].vitest
            }
          }

          break
        }
        default: {
          console.error('Error: Framework is required to get a template')

          break
        }
      }
    }

    return { ...data, templatePath }
  }
}

/**
 * Get template content from file
 *
 * @param {Answers & { templatePath: string }} data - Data to compose component
 * @returns {Answers & {
 *    templatePath: string,
 *    fileContent: string
 *  }}
 */
export function getTemplateContent(data) {
  const fullPath = path.join(localDirname, data.templatePath)

  const fileContent = readFileContent(fullPath)

  return { ...data, fileContent }
}

/**
 *
 * @param {Answers & {
 *    templatePath: string,
 *    fileContent: string
 *  }} data Data to compose component
 * @returns {Answers & {
 *    templatePath: string,
 *    fileContent: string,
 *    extension: string,
 *    fileName: string,
 *    pathWithFileName: string,
 *    resourcePathWithFileName: string,
 *  }}
 */
export function makePathWithExtension(data) {
  if (['function'].includes(data.type)) {
    data.name = convertCase('kebab-case', data.name)
  }

  if (['component', 'page'].includes(data.type)) {
    data.name = convertCase('PascalCase', data.name)
  }

  const language = data.typescript ? 'ts' : 'js'
  const framework = data.framework === 'react' ? data.framework : 'vanilla'

  const extension = getFileExtension({
    language,
    framework,
    target: 'resource',
    postfix: data.testPostfix
  })

  const fileName = `${data.name}.${extension}`
  const pathWithFileName = `${data.path}/${fileName}`
  const resourcePathWithFileName = `${data.resourcePath}/${data.name}.${extension}`

  return {
    ...data,
    extension,
    fileName,
    pathWithFileName,
    resourcePathWithFileName
  }
}

/**
 * Replace all occurrences on file content
 *
 * @param {Answers & {
 *    templatePath: string,
 *    fileContent: string,
 *    extension: string,
 *    fileName: string,
 *    pathWithFileName: string,
 *    resourcePathWithFileName: string,
 *  }} data - Data to compose component
 * @returns {Answers & {
 *    templatePath: string,
 *    fileContent: string,
 *    extension: string,
 *    fileName: string,
 *    pathWithFileName: string,
 *    resourcePathWithFileName: string,
 *  }}
 */
export function replaceAllTestTextOccurrences(data) {
  if (['function'].includes(data.type)) {
    data.name = convertCase('camelCase', data.name)
  }

  if (['component', 'page'].includes(data.type)) {
    data.name = convertCase('PascalCase', data.name)
  }

  data.fileContent = data.fileContent.replace(/ResourceName/g, data.name)
  data.fileContent = data.fileContent.replace(/FunctionName/g, data.name)

  if (['function'].includes(data.type)) {
    data.fileContent = data.fileContent.replace(
      /functionPath/g,
      removePostfixAndExt(data.resourcePathWithFileName)
    )
  }

  if (['component', 'page'].includes(data.type)) {
    if (data.framework === FrameworkEnum.vue) {
      data.fileContent = data.fileContent.replace(
        /resourcePath/g,
        removePostfixAndExt(data.resourcePathWithFileName, '.vue')
      )
    }

    if (data.framework === FrameworkEnum.react) {
      data.fileContent = data.fileContent.replace(
        /resourcePath/g,
        removePostfixAndExt(data.resourcePathWithFileName)
      )
    }
  }

  return data
}

/**
 * Get template content from file
 *
 * @param {Answers & {
 *    templatePath: string,
 *    fileContent: string,
 *    extension: string,
 *    fileName: string,
 *    pathWithFileName: string,
 *  }} data - Data to compose component
 * @returns {{ success: boolean, path: string }} Success and path to track component
 */
export function generateTestFile(data) {
  const path = data.pathWithFileName
  const success = createFileWithContent(data.pathWithFileName, data.fileContent)

  return { success, path }
}
