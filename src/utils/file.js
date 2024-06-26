import fs from 'node:fs'
import path from 'node:path'

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
 * Check if file exists
 *
 * @param {string} fullPath File path
 * @returns {boolean}
 */
export function checkFileExists(fullPath) {
  try {
    fs.accessSync(fullPath, fs.constants.F_OK)

    return true
  } catch {
    return false
  }
}
