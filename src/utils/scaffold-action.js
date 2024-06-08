import { join } from 'node:path'
import { parse as parseYaml } from 'yaml'

import { validateObject } from '../validators/validator.js'
import { customTemplateTypeMap } from '../schemas/custom-template.js'

import { checkFileExists, readFileContent } from '../utils/file.js'
import { removePostfixAndExt } from './file-extension.js'

/**
 * Get template from meta file
 *
 * @param {string} templateName Template name to find inside meta templates
 * @returns {CustomTemplate[] | Error}
 */
export function getTemplateFromMetaFile(templateName) {
  try {
    const { path, type } = getMetaFilePath()

    const fileContent = readFileContent(path)

    /**
     * @type {import('../types.js').CustomTemplate[]}
     */
    let templates = null

    switch (type) {
      case 'json':
        templates = JSON.parse(fileContent)
      case 'yaml':
        templates = parseYaml(fileContent)
      default:
        break
    }

    const template = templates.find((templ) => {
      return templ.identifier === templateName
    })

    return template
  } catch (error) {
    console.error(error)
  }
}

/**
 * Get meta file path from `.clingon/templates` folder
 *
 * @returns {{ path: string, type: "yaml" | "json" }}
 */
export function getMetaFilePath() {
  /**
   * Templates folder path
   */
  const basePath = join(process.cwd(), '.clingon', 'templates')

  try {
    const yamlPath = join(basePath, 'meta.yaml')
    const yamlExists = checkFileExists(yamlPath)

    if (yamlExists) return { path: yamlPath, type: 'yaml' }

    const jsonPath = join(basePath, 'meta.json')
    const jsonExists = checkFileExists(jsonPath)

    if (jsonExists) return { path: jsonPath, type: 'json' }

    throw new Error(
      'Meta file is not defined, run `npx clingon init --template`'
    )
  } catch (error) {
    throw new Error(error)
  }
}

/**
 * Validate template data
 *
 * @param {CustomTemplate} template
 * @returns {string[]} - Returns true if the template is valid, false otherwise.
 */
export function validateTemplate(template) {
  return validateObject(template, customTemplateTypeMap, true)
}

/**
 * Get file name from template path
 *
 * @param {string} templatePath Template path from meta file
 */
export function getFileNameFromMetadata(templatePath) {
  const fileName = getLastItem(templatePath, '/')
  const extension = getLastItem(fileName, /^[^.]*\./)

  return { fileName, extension }
}

/**
 * Split a string based on pattern and return last item from array
 *
 * @param {string} pattern Pattern to split string
 * @param {string} text Text to be splitted
 *
 * @returns {string}
 */
export function getLastItem(text, pattern) {
  const pieces = text.split(pattern)

  return pieces[pieces.length - 1]
}

export function replaceContentFromSideResource(name, content, key, template) {
  const resourceNameReplaced = content.replace(/ResourceName/g, name)

  if (resourceNameReplaced) content = resourceNameReplaced

  const { extension } = getFileNameFromMetadata(template[key].template)

  const fullPath = join(template[key].path, `${name}.${extension}`)

  content = replaceResourcePath(fullPath, content)

  return content
}

/**
 * Replace resource path inside template content
 *
 * @param {string} fullPath Resource full path
 * @param {string} fileContent File content from template
 *
 * @returns {string}
 */
export function replaceResourcePath(fullPath, fileContent) {
  const resourcePath = removePostfixAndExt(fullPath)

  const resourcePathReplaced = fileContent.replace(
    /resourcePath/g,
    resourcePath
  )

  if (resourcePathReplaced) fileContent = resourcePathReplaced

  return fileContent
}

export function getTemplateFullPath(path) {
  return join(process.cwd(), '.clingon', 'templates', path)
}

export function getTargetFullPath(path) {
  return join(process.cwd(), path)
}

export function getFullPath(name, key, template) {
  const { extension } = getFileNameFromMetadata(template[key].template)

  const fileName = `${name}.${extension}`

  const fullPath = join(template[key].path, fileName)

  return fullPath
}
