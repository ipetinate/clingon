import path, { join } from 'node:path'

import { CssFrameworkEnum, FrameworkEnum } from '../enums/frameworks.js'

import { globalConfig, localDirname } from '../main.js'

import { frameworkTemplates } from '../constants/templates.js'

import { compose } from '../utils/compose.js'
import { convertCase, splitPathString } from '../utils/string.js'
import { getFileExtension } from '../utils/file-extension.js'
import { createFileWithContent, readFileContent } from '../utils/file.js'
import { checkDirectoriesTree, createDir } from '../utils/directory.js'

/**
 * @typedef {import("../types.js").Answers} Answers
 * @typedef {Record<2 | 3, "options" | "setup">} VueApi - Vue API variant options or setup (composition)
 */

/*
 * Data Variables
 */

/**
 * Component generator
 *
 * @param {Answers & { path: string }} answers Answers prompted to the user
 */
export function generateComponent(answers) {
  const { success, path } = compose(
    defineComponentTemplate(answers),
    getTemplateContent,
    makeFolderWrapperOrBypass,
    makePathWithExtension,
    replaceAllComponentTextOccurrences,
    generateComponentFile
  )

  if (success) {
    console.info('\nComponent created successfully: ' + path)
  } else {
    console.error('Error on create component, try again')
  }
}

/**
 * Get component template details
 *
 * @param {Answers & { path: string }} data - Data to compose component
 * @returns {() => Answers & { templatePath: string }}
 */
export function defineComponentTemplate(data) {
  return () => {
    /**
     * Template path from path's dictionary
     */
    let templatePath = ''

    /**
     * @type {"js" | "ts"}
     */
    const variant = data.typescript ? 'ts' : 'js'

    /**
     * @type {2 | 3}
     */
    const vueVersion = data.version

    /**
     * @type {VueApi}
     */
    const vueApi = {
      2: 'options',
      3: 'setup'
    }

    /**
     * @type {"options" | "setup"}
     */
    const api = vueApi[vueVersion]

    switch (data.framework) {
      case FrameworkEnum.react: {
        templatePath =
          frameworkTemplates.react[variant].component.functional[
            data.cssFramework
          ]

        break
      }
      case FrameworkEnum.vue: {
        templatePath =
          frameworkTemplates.vue[vueVersion][variant].component[api][
            data.cssFramework
          ]

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
 *    folderWrapperPath: string,
 *  }}
 */
export function makeFolderWrapperOrBypass(data) {
  data.name = convertCase('PascalCase', data.name)

  const folderWrapperPath = join(data.resourcePath, data.name)
  const folderWrapperExists = checkDirectoriesTree(
    splitPathString(folderWrapperPath)
  )

  if (data.folderWrapper && !folderWrapperExists) {
    const created = createDir(folderWrapperPath)

    if (!created) console.error('Error: cannot create folder wrapper.')
  }

  return { ...data, folderWrapperPath }
}

/**
 *
 * @param {Answers & {
 *    templatePath: string,
 *    fileContent: string
 *    folderWrapperPath: string,
 *  }} data Data to compose component
 * @returns {Answers & {
 *    templatePath: string,
 *    fileContent: string,
 *    extension: string,
 *    fileName: string,
 *    pathWithFileName: string,
 *  }}
 */
export function makePathWithExtension(data) {
  const language = data.typescript ? 'ts' : 'js'

  const extension = getFileExtension({
    language,
    target: 'resource',
    framework: data.framework
  })

  const fileName = data.folderWrapper
    ? `${data.name}/${data.name}.${extension}`
    : `${data.name}.${extension}`
  const pathWithFileName = `${data.path}/${fileName}`

  return { ...data, extension, fileName, pathWithFileName }
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
 *  }} data - Data to compose component
 * @returns {Answers & {
 *    templatePath: string,
 *    fileContent: string,
 *    extension: string,
 *    fileName: string,
 *    pathWithFileName: string,
 *  }}
 */
export function replaceAllComponentTextOccurrences(data) {
  switch (data.framework) {
    case FrameworkEnum.react: {
      if (!data.folderWrapper) {
        if (globalConfig?.exportDefault) {
          data.fileContent = data.fileContent.replace(
            /export function/g,
            'export default function'
          )
        }
      }

      data.fileContent = data.fileContent.replace(/ResourceName/g, data.name)

      return data
    }
    case FrameworkEnum.vue: {
      if (data.cssFramework === CssFrameworkEnum.css_modules) {
        data.fileContent = data.fileContent.replace(
          /component/g,
          convertCase('camelCase', data.name)
        )
      } else {
        data.fileContent = data.fileContent.replace(
          /component/g,
          convertCase('kebab-case', data.name)
        )
      }

      return data
    }
    default: {
      return data
    }
  }
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
export function generateComponentFile(data) {
  const path = data.pathWithFileName
  const success = createFileWithContent(data.pathWithFileName, data.fileContent)

  if (data.folderWrapper) {
    const filePath = join(
      data.resourcePath,
      data.name,
      'index.' + data.extension
    )

    if (globalConfig?.exportDefault) {
      createFileWithContent(
        filePath,
        `import { ${data.name} } from './${data.name}'\n\nexport * from './${data.name}'\nexport default ${data.name}\n`
      )
    } else {
      createFileWithContent(filePath, `export * from './${data.name}'`)
    }
  }

  return { success, path }
}
