import { readFileContent } from '../utils/file.js'
import { parse as parseYaml } from 'yaml'

export function scaffoldAction(name, options) {
  const template = getTemplateFomMetaFile(options.template)
}

export function getTemplateFomMetaFile() {
  try {
    const path = join(process.cwd(), '.clingon', 'templates', 'meta.yaml')

    const fileContent = readFileContent(path)

    const parsedYamlFileContent = yaml

    return parsedYamlFileContent
  } catch (error) {
    console.error(error)
  }
}
