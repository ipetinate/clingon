import path from 'node:path'

import { localDirname } from '../main.js'
import { stylesTemplates } from '../constants/templates.js'

import { compose } from '../utils/compose.js'
import { convertCase } from '../utils/string.js'
import { getFileExtension } from '../utils/file-extension.js'
import { createFileWithContent, readFileContent } from '../utils/file.js'
import { StylePostfixEnum } from '../enums/postfixes.js'

/**
 * @typedef {import("../types.js").Answers} Answers
 */

/**
 * CSS Style generator
 *
 * @param {Answers & { path: string }} answers Answers prompted to the user
 */
export function generateStyle(answers) {
  if (answers.cssFramework === 'tailwind_inline') return

  const { success, path } = compose(
    defineStyleTemplate(answers),
    getTemplateContent,
    replaceAllFunctionTextOccurrences,
    generateStyleFile
  )

  if (success) {
    console.info('Style created successfully: ' + path)
  } else {
    console.error('Error on create style, try again')
  }
}

/**
 * Get CSS Style template details
 *
 * @param {Answers & { path: string }} data - Data to compose component
 * @returns {() => Answers & { templatePath: string }}
 */
export function defineStyleTemplate(data) {
  return () => {
    /**
     * Template path from path's dictionary
     */
    let templatePath = stylesTemplates[data.cssFramework]

    return { ...data, templatePath }
  }
}

/**
 * Get template content from file
 *
 * @param {Answers & { templatePath: string }} data - Data to compose component
 * @returns {() => Answers & {
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
 * Replace all occurrences on file content
 *
 * @param {Answers & {
 *    templatePath: string,
 *    fileContent: string
 *  }} data - Data to compose component
 * @returns {() => data}
 */
export function replaceAllFunctionTextOccurrences(data) {
  data.fileContent = data.fileContent.replace('component', convertCase('kebab-case', data.name))

  return data
}

/**
 * Get template content from file
 *
 * @param {Answers & {
 *    templatePath: string,
 *    fileContent: string
 *  }} data - Data to compose component
 * @returns {() => string}
 */
export function generateStyleFile(data) {
  const postfix =
    data.cssFramework === 'css_modules' ? StylePostfixEnum.module : StylePostfixEnum.style

  const extension = getFileExtension({
    postfix,
    target: 'style',
    cssFramework: data.cssFramework
  })

  const fileName = `${convertCase('PascalCase', data.name)}.${extension}`
  const pathWithFileName = `${data.path}/${fileName}`

  const success = createFileWithContent(pathWithFileName, data.fileContent)

  return {
    success,
    error: !success,
    path: pathWithFileName
  }
}
