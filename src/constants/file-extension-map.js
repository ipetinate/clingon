/**
 * @typedef {Record<import('../types').Framework, Record<import('../types').Language, import('../types').Extension>>} Resource
 * @typedef {Record<import('../types').CssFramework, import('../types').Extension>} Style
 */

/**
 * File extension map by target > framework > language > (extension | css framework > extension)
 *
 * @type {{ resource: Resource, style: Style }}
 */
export const fileExtensionMap = {
  resource: {
    react: {
      js: 'jsx',
      ts: 'tsx'
    },
    vue: {
      js: 'vue',
      ts: 'vue'
    },
    vanilla: {
      js: 'js',
      ts: 'ts'
    }
  },
  style: {
    css_modules: 'css',
    tailwind_file: 'css',
    vanilla_css: 'css',
    scss: 'scss'
  }
}
