import { input } from '@inquirer/prompts'
import { checkDirectoriesTree } from '../utils/directory.js'
import { splitPathString } from '../utils/string.js'
import { generateComponent } from '../generators/components.js'
import { generateTests } from '../generators/tests.js'
import { generateFunction } from '../generators/functions.js'
import { generateStory } from '../generators/storybook-story.js'
import { generateStyle } from '../generators/css-styles.js'
import { FrameworkEnum } from '../enums/frameworks.js'

const currentRootPath = '.'

/**
 * Generate file from guided prompt
 *
 * @param {import("../types.js").Answers} data Information the user provided in the guided prompt
 */
export async function mainGenerator(data) {
  await checkProvidedPathRecursive(
    data.resourcePath,
    async (path) => {
      switch (data.type) {
        case 'page':
        case 'component': {
          generateComponent({ ...data, path })

          if (data.framework === FrameworkEnum.react) {
            await handleStyles(data, path)
          }

          break
        }
        case 'function': {
          generateFunction({ ...data, path })

          break
        }
        default: {
          break
        }
      }

      await handleTests(data, path)
      await handleStories(data, path)
    },
    data.type
  )
}

/**
 * Check if path already exists and return path if exist, else prompt user to provide a correct path
 *
 * @param {string} path Path to create file
 * @param {async () => Promise<void>} callback Callback to be executed after internal response
 * @param {Answers["type"]} target Target to fill info message on console
 * @returns {Promise<string>}
 */
async function checkProvidedPathRecursive(path, callback, target) {
  const pathArray = splitPathString(path)
  const pathExists = checkDirectoriesTree(pathArray)

  if (pathExists) {
    return await callback(path)
  } else {
    const pathFallback = await input({
      message: `The ${target} path not exist's. Provide the correct path:`
    })

    await checkProvidedPathRecursive(pathFallback, callback, target)
  }
}

/**
 * Handle tests flow
 *
 * @param {import("../types.js").Answers} data Information the user provided in the guided prompt
 * @param {string} path Path from main resource if should use same path
 *
 */
async function handleTests(data, path) {
  if (!data.withTest) return

  if (data.testPath === data.resourcePath) {
    return generateTests({ ...data, path })
  }

  return await checkProvidedPathRecursive(
    data.testPath,
    (newPath) => generateTests({ ...data, path: newPath, resourcePath: path }),
    data.testPostfix
  )
}

/**
 * Handle stories flow
 *
 * @param {import("../types.js").Answers} data Information the user provided in the guided prompt
 * @param {string} path Path from main resource if should use same path
 *
 */
async function handleStories(data, path) {
  if (!data.withStory) return

  if (data.storyPath === data.resourcePath) {
    return generateStory({ ...data, path })
  }

  return await checkProvidedPathRecursive(
    data.storyPath,
    (newPath) => generateStory({ ...data, path: newPath, resourcePath: path }),
    data.storyPostfix
  )
}

/**
 * Handle styles flow
 *
 * @param {import("../types.js").Answers} data Information the user provided in the guided prompt
 * @param {string} path Path from main resource if should use same path
 *
 */
async function handleStyles(data, path) {
  if (['no_style', 'tailwind_inline'].includes(data.cssFramework)) return

  if (data.storyPath === data.resourcePath) {
    return generateStyle({ ...data, path })
  }

  return await checkProvidedPathRecursive(
    data.storyPath,
    (newPath) => generateStyle({ ...data, path: newPath, resourcePath: path }),
    'style'
  )
}
