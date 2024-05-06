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

  if (preset) {
    answers = getPresetFileContent(preset + '.json')

    answers.name = resourceName ?? (await namePrompt())
  } else {
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
