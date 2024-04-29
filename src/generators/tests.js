import path from 'node:path'

import { FrameworkEnum } from '../enums/frameworks.js'

import { unitTestTemplates } from '../constants/templates.js'

import { compose } from '../utils/compose.js'
import { capitalizeLetter, convertCase } from '../utils/string.js'
import { makeFileExtension, createFileWithContent, readFileContent } from '../utils/file.js'
import { localDirname } from '../main.js'

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
    console.info(`Error on create ${answers.testPostfix}, try again`)
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
        console.error('Framework is required to get a template')

        break
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
  data.name = convertCase('PascalCase', data.name)

  const extension = makeFileExtension({
    typescript: data.typescript,
    postfix: data.testPostfix,
    withJsx: data.framework === FrameworkEnum.react
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
  /**
   * Removes `.spec` or `.test` from string
   *
   * @param {string} value Value to replaced
   * @param {string} extension Extension to add on string
   * @returns {string}
   */
  const removeTestPostfix = (value, extension) =>
    value.replace(/(.spec.(ts|js))|(.test.(ts|js))/g, '') + extension

  data.fileContent = data.fileContent.replace(/ResourceName/g, data.name)

  if (data.framework === FrameworkEnum.vue) {
    data.fileContent = data.fileContent.replace(
      /resourcePath/g,
      removeTestPostfix(data.resourcePathWithFileName, '.vue')
    )
  }
  if (data.framework === FrameworkEnum.react) {
    data.fileContent = data.fileContent.replace(
      /resourcePath/g,
      removeTestPostfix(data.resourcePathWithFileName, data.typescript ? '.tsx' : '.jsx')
    )
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
