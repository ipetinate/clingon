import { select } from '@inquirer/prompts'

export async function selectPresetPrompt(presetChoices) {
  const preset = await select({
    message:
      'It appears that there is no template with that name, select an existing template from the list below: ',
    choices: [
      {
        name: 'No, create a new one',
        value: false
      },
      ...presetChoices
    ]
  })

  return preset
}
