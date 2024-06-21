/**
 * Define the type map for TemplateResource
 *
 * @type {Record<keyof import("../types").TemplateResource, import("../types").Primitives>}
 */
export const templateResourceTypeMap = {
  path: 'string',
  template: 'string'
}

/**
 * Define the type map for CustomTemplate
 *
 * @type {Record<keyof import("../types").CustomTemplate, import("../types").Primitives | typeof templateResourceTypeMap | { type: 'array', items: object }>}
 */
export const customTemplateTypeMap = {
  identifier: 'string',
  folderWrapper: 'boolean',
  resources: { type: 'array', items: templateResourceTypeMap } // Define array with item type map
}
