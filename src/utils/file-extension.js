import { fileExtensionMap } from '../constants/file-extension-map.js'

/**
 * @typedef {{
 *    target: import("../types.js").Target
 *    postfix: import("../types.js").Postfix
 *    language: import("../types.js").Language
 *    framework: import("../types.js").Framework
 *    cssFramework: import('../types.js').CssFramework
 * }} Options
 */

/**
 * Make file extension based on target and options
 *
 * @param {Options} options - Options to make file extension
 *
 * @returns {string}
 */
export function getFileExtension({ framework, cssFramework, language, postfix, target }) {
  let extension = ''

  if (target === 'style') extension = fileExtensionMap.style[cssFramework]
  else extension = fileExtensionMap.resource[framework][language]

  return postfix ? `${postfix}.${extension}` : extension
}
