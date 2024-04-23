import fs from 'node:fs'
import path from 'node:path'

/**
 * Reads the content of a local configuration file named "tricorder.json".
 *
 * @typedef {{ exportDefault: boolean }} GlobalConfig - Project global configuration
 *
 * @param {string} filename The configuration file name.
 * @returns {GlobalConfig | null}
 */
export function readLocalConfig(filename) {
  try {
    const folder = process.cwd()

    const files = fs.readdirSync(folder)
    const localConfigPath = files.find((file) => file.includes(filename))

    if (!localConfigPath) {
      throw new Error('Error: Configuration file not found')
    }

    const filePath = path.join(folder, localConfigPath)
    const fileContent = fs.readFileSync(filePath, 'utf8')

    return JSON.parse(fileContent)
  } catch (error) {
    throw new Error(error)
  }
}
