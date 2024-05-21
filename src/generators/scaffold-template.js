import { compose } from '../utils/compose.js'
import { convertCase, splitPathString } from '../utils/string.js'
import { readFileContent } from '../utils/file.js'
import { replaceContentFromSideResource } from '../utils/scaffold-action.js'
import { checkDirectoriesTree } from '../utils/directory.js'

/**
 * @typedef {Record<keyof Omit<import('../types').CustomTemplate, "folderWrapper" | "identifier">, string>} TemplatesContent
 *
 * @typedef {{name: string, template: import('../types').CustomTemplate, templatesContent: TemplatesContent}} CommomReturn
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
    getTemplatesData(name, template),
    handleTemplateReplacements,
    checkPaths,
    createResources
  )

  return result
}

/**
 * Get templates from local dir
 *
 * @param {string} name Resource name from arguments
 * @param {import('../types').CustomTemplate} template Template data from meta file
 *
 * @returns {CommomReturn}
 */
function getTemplatesData(name, template) {
  return () => {
    /**
     * @type {TemplatesContent}
     */
    const templatesContent = {
      resource: readFileContent(template.resource.template)
    }

    if (template.test) {
      templatesContent.test = readFileContent(template.test.template)
    }

    if (template.story) {
      templatesContent.story = readFileContent(template.story.template)
    }

    return { name, template, templatesContent }
  }
}

/**
 * Replace text occurrences inside template
 *
 * @param {ReturnType<typeof getTemplatesData>} param0 - Template data and templates content
 */
function handleTemplateReplacements({ name, template, templatesContent }) {
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

  return { name, template, templatesContent }
}

/**
 * Check templates path and ask if not exists
 *
 * @param {ReturnType<typeof handleTemplateReplacements>} param0 Template data from meta file
 */
function checkPaths({ name, template, templatesContent }) {
  const targets = {
    resource: false,
    test: false,
    story: false
  }

  targets.resource = checkDirectoriesTree(
    splitPathString(template.resource.path)
  )

  if (templatesContent.test) {
    targets.test = checkDirectoriesTree(splitPathString(template.test.path))
  }

  if (templatesContent.story) {
    targets.story = checkDirectoriesTree(splitPathString(template.story.path))
  }

  return { name, template, templatesContent, targets }
}

/**
 *
 * @param {ReturnType<typeof checkPaths>} param0 Template data from meta file
 * @returns {boolean}
 */
function createResources({ name, targets, template, templatesContent }) {
  if (targets.resource) {
    // TODO: generate file
  }
  if (targets.test) {
    // TODO: generate file
  }
  if (targets.style) {
    // TODO: generate file
  }

  return true
}
