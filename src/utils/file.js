import fs from 'node:fs'
import path from 'node:path'

import { FileExtensionEnum } from '../enums/file-extension.js'

/**
 * Get files from root directory
 *
 * @param {string | undefined} folderPath Path to folder, if omited rootDir (`process.cwd()`) will be used instead
 * @returns {string[]} Array of file paths
 */
export function getFiles(folderPath) {
  const folder = folderPath ?? process.cwd()

  try {
    const files = fs.readdirSync(folder)

    const filePaths = files.map((file) => path.join(folder, file))

    return filePaths
  } catch (err) {
    throw new Error(`Error reading files: ${err}`)
  }
}

/**
 * Read file content and return as string
 *
 * @param {string} filePath Path to file
 * @returns {string}
 */
export function readFileContent(filePath) {
  return fs.readFileSync(filePath, 'utf8')
}

/**
 * Create a file with content and notify on console if success or error
 *
 * @param {string} filename Name with extensions, e.g `LoginView.vue` or "Login.tsx"
 * @param {string} content Content to be injected inside file
 */
export function createFileWithContent(filename, content) {
  try {
    fs.writeFileSync(filename, content, 'utf8')

    return true
  } catch (error) {
    return false
  }
}

/**
 * Make the file extension and returns without dot on start, e.g `tsx` or `vue` or `spec.ts`
 *
 * @typedef {{
 *    postfix?: string,
 *    typescript?: boolean,
 *    withJsx?: boolean,
 *    vue?: boolean,
 *    cssFramework: import('../types.js').CssFramework
 *  }} Props
 *
 * @param {Props} props Properties to compose extension
 * @returns string
 */
export function makeFileExtension({ typescript, postfix, withJsx, vue, cssFramework }) {
  if (cssFramework) {
    switch (cssFramework) {
      case 'scss': {
        return FileExtensionEnum.scss
      }
      case 'css_modules':
      case 'vanilla_css':
      case 'tailwind_file':
      default: {
        return postfix ? postfix + FileExtensionEnum.css : FileExtensionEnum.css
      }
    }
  }

  if (vue) return FileExtensionEnum.vue

  const tsExt = withJsx ? FileExtensionEnum.tsx : FileExtensionEnum.ts
  const jsExt = withJsx ? FileExtensionEnum.jsx : FileExtensionEnum.js

  const extension = `${typescript ? tsExt : jsExt}`

  if (postfix) return `${postfix}.${extension}`

  return extension
}
