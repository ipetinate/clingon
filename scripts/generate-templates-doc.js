import { readdirSync, statSync, readFileSync, writeFileSync } from 'fs'
import { join, extname, relative, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const baseDir = join(process.cwd(), 'src/templates')

const outputFile = join(__dirname, 'TEMPLATES_DOC.md')

const extLangMap = {
  '.js': 'javascript',
  '.ts': 'typescript',
  '.jsx': 'javascript-react',
  '.tsx': 'typescript-react',
  '.vue': 'vue',
  '.css': 'css',
  '.scss': 'scss',
  '.html': 'html',
  '.json': 'json'
}

function getAllFiles(dir, fileList = []) {
  const files = readdirSync(dir)

  files.forEach((file) => {
    const filePath = join(dir, file)
    if (statSync(filePath).isDirectory()) {
      getAllFiles(filePath, fileList)
    } else {
      fileList.push(filePath)
    }
  })

  return fileList
}

function generateDocumentation() {
  const allFiles = getAllFiles(baseDir)
  const output = []

  allFiles.forEach((filePath) => {
    const ext = extname(filePath)
    const lang = extLangMap[ext] || 'plaintext'

    output.push(`## ${relative(baseDir, filePath)}`)
    output.push('```' + lang)
    const content = readFileSync(filePath, 'utf-8')
    output.push(content)
    output.push('```')
    output.push('')
  })

  writeFileSync(outputFile, output.join('\n'))
}

generateDocumentation()

console.log('Documentação gerada com sucesso!')
