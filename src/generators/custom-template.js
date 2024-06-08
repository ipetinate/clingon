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
 * @typedef {{name: string, template: import('../types.js').CustomTemplate, targets: TargetPaths}} CommomReturn
 *
 * @typedef {Omit<import('../types.js').CustomTemplate, "resources"> & { resource: import('../types.js').TemplateResource }} Resource
 */

/**
 * Build resources from template
 *
 * @param {string} name Resource name from arguments
 * @param {Resource} template Local template from meta file
 * @returns {Promise<boolean>}
 */
export async function buildCustomTemplate(name, template) {
  let results = []

  for (resource of template.resources) {
    const result = compose(
      checkPaths(name),
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
 * @param {import('../types.js').CustomTemplate} template Template data from meta file
 *
 * @returns {CommomReturn}
 */
function checkPaths(name, template) {
  return () => {
    const resourcePath = template?.folderWrapper
      ? join(template?.resource?.path, name)
      : template?.resource?.path

    const resourceSplitedPath = splitPathString(resourcePath)

    if (resourceSplitedPath) {
      targets.resource = checkDirectoriesTree(resourceSplitedPath)
    }

    if (!targets?.resource) {
      targets.resource = createDir(getTargetFullPath(resourcePath))
    }

    return { name, template, targets }
  }
}

/**
 * Get templates from local dir
 *
 * @param {ReturnType<typeof checkPaths>} param0 Template data from meta file
 */
function getTemplatesData({ name, template, targets }) {
  const templatesContent = {
    resource: null,
    story: null,
    style: null,
    test: null
  }

  try {
    templatesContent.resource = readFileContent(
      getTemplateFullPath(template?.resource?.template)
    )

    if (template?.test) {
      templatesContent.test = readFileContent(
        getTemplateFullPath(template?.test?.template)
      )
    }

    if (template?.story) {
      templatesContent.story = readFileContent(
        getTemplateFullPath(template?.story?.template)
      )
    }

    if (template?.style) {
      templatesContent.style = readFileContent(
        getTemplateFullPath(template?.style?.template)
      )
    }

    return { name, template, templatesContent, targets }
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
  templatesContent,
  targets
}) {
  if (!template.case) {
    return { name, template, templatesContent, targets }
  }

  name = convertCase(template.case, name)

  templatesContent.resource = templatesContent.resource?.replace(
    /ResourceName/g,
    name
  )

  if (templatesContent?.test) {
    templatesContent.test = replaceContentFromSideResource(
      name,
      templatesContent.test,
      'test',
      template
    )

    if (templatesContent?.story) {
      templatesContent.story = replaceContentFromSideResource(
        name,
        templatesContent.story,
        'story',
        template
      )
    }

    if (templatesContent?.style) {
      templatesContent.style = replaceContentFromSideResource(
        name,
        templatesContent.style,
        'style',
        template
      )
    }
  }

  return { name, template, templatesContent, targets }
}

/**
 * Create files after processing
 *
 * @param {ReturnType<typeof checkPaths>} param0 Template data from meta file
 * @returns {boolean}
 */
function createResources({ name, targets, template, templatesContent }) {
  /**
   * @type {string[]}
   */
  let created = []

  if (targets.resource) {
    if (template.folderWrapper)
      template.resource.path = join(template.resource?.path, name)

    const fullPath = getFullPath(name, 'resource', template)
    const resourceCreated = createFileWithContent(
      fullPath,
      templatesContent.resource
    )

    if (resourceCreated) created.push(fullPath)
  }

  if (targets?.test) {
    if (template.folderWrapper)
      template.test.path = join(template?.test?.path, name)

    const fullPath = getFullPath(name, 'test', template)
    const testCreated = createFileWithContent(fullPath, templatesContent.test)

    if (testCreated) created.push(fullPath)
  }

  if (targets?.style) {
    if (template.folderWrapper)
      template.style.path = join(template?.style?.path, name)

    const fullPath = getFullPath(name, 'style', template)
    const styleCreated = createFileWithContent(
      fullPath,
      templatesContent?.style
    )

    if (styleCreated) created.push(fullPath)
  }

  if (targets?.story) {
    if (template.folderWrapper)
      template.story.path = join(template?.story?.path, name)

    const fullPath = getFullPath(name, 'story', template)
    const storyCreated = createFileWithContent(
      fullPath,
      templatesContent?.story
    )

    if (storyCreated) created.push(fullPath)
  }

  return created
}
