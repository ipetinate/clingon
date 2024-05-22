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
 * @typedef {Record<keyof Omit<import('../types').CustomTemplate, "folderWrapper" | "identifier">, string>} TemplatesContent
 *
 * @typedef {Record<keyof Omit<import('../types').CustomTemplate, "folderWrapper" | "identifier">, boolean>} TargetPaths
 *
 * @typedef {{name: string, template: import('../types').CustomTemplate, targets: TargetPaths}} CommomReturn
 */

/**
 * Build resources from template
 *
 * @param {string} name Resource name from arguments
 * @param {import("../types").CustomTemplate} template Local template from meta file
 * @returns {Promise<boolean>}
 */
export async function buildFromTemplate(name, template) {
  const result = compose(
    checkPaths(name, template),
    getTemplatesData,
    handleTemplateReplacements,
    createResources
  )

  return result
}

/**
 * Check templates path and ask if not exists
 *
 * @param {string} name Resource name from arguments
 * @param {import('../types').CustomTemplate} template Template data from meta file
 *
 * @returns {CommomReturn}
 */
function checkPaths(name, template) {
  return () => {
    const targets = {
      resource: false,
      test: false,
      story: false
    }

    const resourcePath = template.folderWrapper
      ? join(template.resource.path, name)
      : template.resource.path
    const storyPath = template.folderWrapper
      ? join(template.story.path, name)
      : template.story.path
    const testPath = template.folderWrapper
      ? join(template.test.path, name)
      : template.test.path

    targets.resource = checkDirectoriesTree(splitPathString(resourcePath))

    if (!targets.resource) {
      targets.resource = createDir(getTargetFullPath(resourcePath))
    }

    if (template.test) {
      targets.test = checkDirectoriesTree(splitPathString(testPath))

      if (!targets.test) {
        targets.resource = createDir(getTargetFullPath(testPath))
      }
    }

    if (template.story) {
      targets.story = checkDirectoriesTree(splitPathString(storyPath))

      if (!targets.story) {
        targets.resource = createDir(getTargetFullPath(storyPath))
      }
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
  /**
   * @type {TemplatesContent}
   */
  const templatesContent = {
    resource: null,
    story: null,
    test: null
  }

  try {
    templatesContent.resource = readFileContent(
      getTemplateFullPath(template.resource.template)
    )

    if (template.test) {
      templatesContent.test = readFileContent(
        getTemplateFullPath(template.test.template)
      )
    }

    if (template.story) {
      templatesContent.story = readFileContent(
        getTemplateFullPath(template.story.template)
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
  name = convertCase('PascalCase', name)

  templatesContent.resource = templatesContent.resource.replace(
    /ResourceName/g,
    name
  )

  if (templatesContent.story) {
    templatesContent.story = replaceContentFromSideResource(
      name,
      templatesContent.story,
      template
    )
  }

  if (templatesContent.test) {
    templatesContent.test = replaceContentFromSideResource(
      name,
      templatesContent.test,
      template
    )
  }

  return { name, template, templatesContent, targets }
}

/**
 *
 * @param {ReturnType<typeof checkPaths>} param0 Template data from meta file
 * @returns {boolean}
 */
function createResources({ name, targets, template, templatesContent }) {
  const created = {
    resource: false,
    story: undefined,
    test: undefined
  }

  if (targets.resource) {
    if (template.folderWrapper)
      template.resource.path = join(template.resource.path, name)

    const fullPath = getFullPath(name, 'resource', template)

    created.resource = createFileWithContent(
      fullPath,
      templatesContent.resource
    )
  }

  if (targets.test) {
    if (template.folderWrapper)
      template.test.path = join(template.test.path, name)

    const fullPath = getFullPath(name, 'test', template)

    created.test = createFileWithContent(fullPath, templatesContent.test)
  }

  if (targets.story) {
    if (template.folderWrapper)
      template.story.path = join(template.story.path, name)

    const fullPath = getFullPath(name, 'story', template)

    created.story = createFileWithContent(fullPath, templatesContent.story)
  }

  return {
    created,
    paths: targets
  }
}
