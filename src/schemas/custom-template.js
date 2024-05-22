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
 * @type {Record<keyof import("../types").CustomTemplate, import("../types").Primitives | typeof templateResourceTypeMap> }
 */
export const customTemplateTypeMap = {
  identifier: 'string',
  case: 'string',
  resource: templateResourceTypeMap
}
