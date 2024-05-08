import { input } from '@inquirer/prompts'

export async function presetNamePrompt() {
  const presetName = await input({
    message: 'Preset name: ',
    validate: (value) => {
      return !value ? 'Invalid. Please enter preset name!' : true
    }
  })

  return presetName
}
