import { confirm } from '@inquirer/prompts'

import {
  getPresetFileContent,
  getPresetFiles,
  getPresetsPreview,
  makePresetChoices,
  saveAnswersAsPreset
} from '../utils/preset.js'

import { namePrompt } from '../prompts/name.js'
import { selectPresetPrompt } from '../prompts/select-preset.js'
import { createResourcePrompt } from '../prompts/create-resource.js'
import { presetNamePrompt } from '../prompts/preset-name.js'
import { mainGenerator } from '../flows/main-generator.js'

/**
 * Create resource based on a command line argument and options
 *
 * @param {string} resourceName Resource name from command argument
 * @param {import('../types.js').CommanderOptions} options Options from command after argument
 */
export async function createAction(resourceName, options) {
  /**
   * Answers from prompt or preset
   *
   * @type {import('../types.js').Answers}
   */
  let answers

  /**
   * Selected preset
   *
   * @type {string }
   */
  let preset = options.preset

  if (!options.type) {
    // TODO: prompt type
  }

  if (!options.framework) {
    // TODO: prompt framework
  }

  if (!options.path) {
    // TODO: prompt framework
  }

  if (!preset && options.framework) {
    let storyPath = options.path
    let withStory = options.story

    let testPath = options.path
    let testPostfix = 'spec'
    let withTest = options.test || options.spec

    if (options.story) {
      storyPath = options.storyPath ?? options.path
    }

    if (options.test || options.spec) {
      testPath = options.testPath ?? options.path

      testPostfix = options.test ? 'test' : options.spec ? 'spec' : undefined
    }

    answers = {
      name: resourceName,
      framework: options.framework,
      testFramework: options.testFramework,
      cssFramework: options.cssFramework,
      typescript: options.typescript,
      type: options.type,
      resourcePath: options.path,
      withTestingLibrary: options.testingLibrary,
      storyPostfix: 'stories',
      version: options.vueVersion,
      testPath,
      storyPath,
      testPostfix,
      withStory,
      withTest
    }
  }

  console.log({ answers })

  if (!options.framework && preset) {
    answers = getPresetFileContent(preset + '.json')

    answers.name = resourceName ?? (await namePrompt())
  } else if (!options.framework) {
    const presets = getPresetFiles()

    if (presets && presets.length > 0) {
      const presetPreviews = getPresetsPreview(presets)

      const presetChoices = makePresetChoices(presetPreviews)

      preset = await selectPresetPrompt(presetChoices)
    }

    if (!presets || !preset) {
      console.info(
        "\nYou don't have presets yet, let's follow the creation flow and at the end you can save as a preset.\n"
      )

      answers = await createResourcePrompt()

      /**
       * Save answers as new preset
       *
       * @type {boolean}
       */
      const savePreset = await confirm({
        message: 'Do you want to save the answers as a preset to use later?'
      })

      /**
       * Save answers as new preset
       *
       * @type {boolean}
       */
      const presetName = await presetNamePrompt()

      if (savePreset) {
        const { success, path } = saveAnswersAsPreset(presetName, answers)

        if (success) {
          console.info('Preset saved with success on: ' + path)
        } else {
          console.error('Error on create preset file, try again')
        }
      }
    }
  }

  if (answers) {
    await mainGenerator(answers)
  } else {
    console.error('Error: an error has ocurred when retrieve answers, try again')
  }
}
