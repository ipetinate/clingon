import {
  getPresetFileContent,
  getPresetFiles,
  getPresetsPreview,
  makePresetChoices
} from '../utils/preset.js'

import { namePrompt } from '../prompts/name.js'
import { selectPresetPrompt } from '../prompts/select-preset.js'
import { createResourcePrompt } from '../prompts/create-resource.js'

export async function createAction(resourceName, options, command) {
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

  console.log({ resourceName, options: options, command: command.name() })

  if (preset) {
    answers = getPresetFileContent(preset)

    answers.name = resourceName ?? (await namePrompt())
  } else {
    const presets = getPresetFiles()

    if (presets && presets.length > 0) {
      const presetPreviews = getPresetsPreview(presets)

      const presetChoices = makePresetChoices(presetPreviews)

      preset = await selectPresetPrompt(presetChoices)

      if (preset === false) {
        answers = await createResourcePrompt()
      }
    }
  }

  if (answers) {
    await mainGenerator(answers)
  } else {
    console.error('Error: an error has ocurred when retrieve answers, try again')
  }
}
