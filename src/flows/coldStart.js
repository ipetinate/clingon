import { join } from 'node:path'
import { readFileContent } from '../utils/file.js'
import { getConfigContent } from '../utils/init-action.js'

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
    data.globalConfig = getConfigContent(configPath)
  } catch (error) {
    console.error(error)
  }

  return data
}
