import { join } from 'node:path'

import { buildCustomTemplate } from '../generators/custom-template.js'

import {
  getTemplateFromMetaFile,
  validateTemplate
} from '../utils/scaffold-action.js'

/**
 * Build resources from local custom templates
 *
 * @typedef {"template"} Options
 *
 * @param {string} name
 * @param {Record<Options, string>} options
 */

export async function scaffoldAction(name, options) {
  /**
   * Templates folder path
   */
  const basePath = join(process.cwd(), '.clingon', 'templates')

  /**
   * Templates from meta file
   */
  const template = getTemplateFromMetaFile(options.template)

  /**
   * Template already be validated and flow can continue
   */
  const validationErrors = validateTemplate(template)

  if (validationErrors.length > 0) {
    console.error(
      `\n⎡ Template has many errors, review your meta file at: \n⎪\n⎣ → ${basePath}`
    )

    console.error(`\n⎡ Validation errors: \n⎪`)

    const last = validationErrors.length - 1

    validationErrors.forEach((error, index) =>
      console.error(`${last === index ? '⎣' : '⎪'} → ${error}`)
    )

    return
  }

  /**
   * Resources already be created
   *
   * @type {Record<"resource" | "test" | "story" | "style", string>}
   */
  const paths = await buildCustomTemplate(name, template)

  if (paths) showCreatedResources(paths)
}

export function showCreatedResources(paths) {
  console.info('⎧ 💿 Files successfully created at:\n⎪')

  paths.forEach((path) => console.info('⎪⎯→ ' + path))
}
