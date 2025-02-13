import { join } from 'node:path'
import { compose } from '../utils/compose.js'
import { convertCase, splitPathString } from '../utils/string.js'
import { createFileWithContent, readFileContent } from '../utils/file.js'
import {
  getFullPath,
  getTargetFullPath,
  getTemplateFullPath,
  replaceContentFromSideResource
} from '../utils/scaffold-action.js'
import { checkDirectoriesTree, createDir } from '../utils/directory.js'

/**
 * @typedef {Record<keyof Omit<import('../types.js').CustomTemplate, "folderWrapper" | "identifier">, boolean>} TargetPaths
 *
 *
 * @typedef {Omit<import('../types.js').CustomTemplate, "resources"> & { resource: import('../types.js').TemplateResource }} Resource
 */

/**
 * Build resources from template
 *
 * @param {string} name Resource name from arguments
 * @param {import('../types.js').CustomTemplate} template Local template from meta file
 * @returns {Promise<string[]>}
 */
export async function buildCustomTemplate(name, template) {
  let results = []

  for (let resource of template.resources) {
    /** @type {Resource} */
    const resourceData = {
      identifier: template.identifier,
      folderWrapper: template.folderWrapper,
      keepTemplateName: template.keepTemplateName,
      case: template.case,
      resource
    }

    const result = compose(
      checkPaths(name, resourceData),
      getTemplatesData,
      handleTemplateReplacements,
      createResources
    )

    results.push(result)
  }

  return results
}

/**
 * Check templates path and ask if not exists
 *
 * @param {string} name Resource name from arguments
 * @param {Resource} template Template data from meta file
 *
 * @returns {{ name: string, template: Resource, target: boolean }}
 */
function checkPaths(name, template) {
  return () => {
    const resourcePath = template?.folderWrapper
      ? join(template?.resource?.path, name)
      : template?.resource?.path

    const resourceSplitedPath = splitPathString(resourcePath)
    let target = ''

    if (resourceSplitedPath) {
      target = checkDirectoriesTree(resourceSplitedPath)
    }

    if (!target?.resource) {
      target = createDir(getTargetFullPath(resourcePath))
    }

    return { name, template, target }
  }
}

/**
 * Get templates from local dir
 *
 * @param {ReturnType<typeof checkPaths>} param0 Template data from meta file
 */
function getTemplatesData({ name, template, target }) {
  if (!target) return undefined

  let templateContent = ''

  try {
    templateContent = readFileContent(
      getTemplateFullPath(template?.resource?.template)
    )

    return { name, template, templateContent, target }
  } catch (error) {
    console.error(error)
  }
}

/**
 * Replace text occurrences inside template
 *
 * @param {ReturnType<typeof getTemplatesData>} param0 - Template data and templates content
 */
function handleTemplateReplacements({
  name,
  template,
  templateContent,
  target
}) {
  name = convertCase(template.case ?? 'PascalCase', name)

  templateContent = replaceContentFromSideResource(
    name,
    templateContent,
    template
  )

  return { name, template, templateContent, target }
}

/**
 * get template file name
 *
 * @param {Resource} template Template data from meta file
 * @returns {string}
 */
function getTemplateFileName(template) {
  const pathArray = template.resource.template.split('/')
  const fileName = pathArray[pathArray.length - 1]

  return fileName.split('.')[0]
}

/**
 * Create files after processing
 *
 * @param {ReturnType<typeof checkPaths>} param0 Template data from meta file
 * @returns {boolean}
 */
function createResources({ name, target, template, templateContent }) {
  /**
   * @type {string}
   */
  let created

  if (target) {
    if (template.folderWrapper)
      template.resource.path = join(template.resource?.path, name)

    const templateFileName = getTemplateFileName(template)

    const fullPath = template.keepTemplateName
      ? getFullPath(templateFileName, template)
      : getFullPath(name, template)
    const resourceCreated = createFileWithContent(fullPath, templateContent)

    if (resourceCreated) created = fullPath
  }

  return created
}
