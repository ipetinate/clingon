import { join } from 'node:path'

import { buildFromTemplate } from '../generators/scaffold-template.js'

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
  const alreadyOkContinue = validateTemplate(template)

  if (!alreadyOkContinue) {
    throw new Error(
      'Template has many errors, please, review your meta at: ',
      basePath
    )
  }

  /**
   * Resources already be created
   *
   * @type {Record<"resource" | "test" | "story" | "style", string>}
   */
  const paths = await buildFromTemplate(name, template)

  if (paths) {
    showCreatedResources(paths)
  } else {
    console.error('An error has ocurred, try again')
  }
}

export function showCreatedResources(paths) {
  console.info('⎧ 💿 Files successfully created at:\n⎪')

  paths.forEach((path) => console.info('⎪⎯→ ' + path))
}
