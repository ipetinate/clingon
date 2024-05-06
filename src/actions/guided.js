import { confirm, select } from '@inquirer/prompts'

import { mainGenerator } from '../flows/main-generator.js'

import { showPreview } from '../utils/guided-action.js'
import {
  getPresetFileContent,
  getPresetFiles,
  getPresetsPreview,
  makePresetChoices,
  saveAnswersAsPreset
} from '../utils/preset.js'

import { namePrompt } from '../prompts/name.js'
import { presetNamePrompt } from '../prompts/preset-name.js'

export async function guidedAction(resourceName) {
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
  let preset = false

  const presets = getPresetFiles()

  if (presets && presets.length > 0) {
    const presetPreviews = getPresetsPreview(presets)

    const presetChoices = makePresetChoices(presetPreviews)

    preset = await select({
      message: 'You already have some presets saved. Want to use some?',
      choices: [
        {
          name: 'No, create a new one',
          value: false
        },
        ...presetChoices
      ]
    })
  }

  if (preset) {
    answers = getPresetFileContent(preset)

    answers.name = resourceName ?? (await namePrompt())
  } else {
    answers = await createResourcePrompt(resourceName)
  }

  if (answers) {
    showPreview(answers)
  }

  if (!preset) {
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

  /**
   * User's confirmation to proceed with generation after preview setup
   *
   * @type {boolean}
   */
  const allowedToGenerate = await confirm({
    message: 'Confirm this is what you want to create?'
  })

  if (allowedToGenerate) {
    await mainGenerator(answers)
  } else {
    /**
     * If user made a mistake, ask if he want's to restart generation
     *
     * @type {boolean}
     */
    const doAgain = await confirm({
      message: 'Do you want to restart the generator?'
    })

    if (doAgain) guidedAction()
  }
}
