import path from 'node:path'

import { FrameworkEnum } from '../enums/frameworks.js'

import { storiesTemplates, unitTestTemplates } from '../constants/templates.js'

import { compose } from '../utils/compose.js'
import { localDirname } from '../main.js'
import { capitalizeLetter, convertCase } from '../utils/string.js'
import { makeFileExtension, createFileWithContent, readFileContent } from '../utils/file.js'

/**
 * @typedef {import("../types.js").Answers} Answers
 */

/**
 * Storybook story generator
 *
 * @param {Answers  & { path: string }} answers Answers prompted to the user
 */
export function generateStory(answers) {
  const { success, path } = compose(
    defineStoryTemplate(answers),
    getTemplateContent,
    makePathWithExtension,
    replaceAllTestTextOccurrences,
    generateTestFile
  )

  if (success) {
    console.info('Story created successfully: ' + path)
  } else {
    console.info(`Error on create Story, try again`)
  }
}

/**
 * Get storybook story template details
 *
 * @param {Answers & { path: string }} data - Data to compose component
 * @returns {() => Answers & { templatePath: string }}
 */
export function defineStoryTemplate(data) {
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
        templatePath = storiesTemplates.storybook.react[variant].component

        break
      }
      case FrameworkEnum.vue: {
        templatePath = storiesTemplates.storybook.vue['3'][variant].component

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
    withJsx: data.framework === FrameworkEnum.react,
    postfix: data.storyPostfix,
    typescript: data.typescript
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
  const removeStoryPostfix = (value, extension) => {
    const extRegExp = new RegExp(/(.story.(ts|js))|(.stories.(ts|js))/g)

    return value.replace(extRegExp, '') + extension
  }

  data.fileContent = data.fileContent.replace(/ResourceName/g, data.name)

  if (data.framework === FrameworkEnum.vue) {
    const ext = '.vue'

    data.fileContent = data.fileContent.replace(
      /resourcePath/g,
      removeStoryPostfix(data.resourcePathWithFileName, ext)
    )
  }
  if (data.framework === FrameworkEnum.react) {
    const ext = data.typescript ? '.tsx' : '.jsx'

    data.fileContent = data.fileContent.replace(
      /resourcePath/g,
      removeStoryPostfix(data.resourcePathWithFileName, ext)
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
