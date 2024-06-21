import { join } from 'node:path'
import { checkFileExists, readFileContent } from '../utils/file.js'

export async function coldStart() {
  const configPath = join(process.cwd(), 'clingon.config.json')

  /**
   * App data
   */
  const data = {
    /**
     * @type {import('../types').GlobalConfig | undefined}
     */
    globalConfig: undefined
  }

  try {
    const exists = checkFileExists(configPath)

    if (!exists) return { globalConfig: null }

    const fileContent = readFileContent(configPath)
    const fileContentParsed = JSON.parse(fileContent)

    data.globalConfig = fileContentParsed
  } catch (error) {
    console.error(error)
  }

  return data
}
