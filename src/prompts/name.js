import { input } from '@inquirer/prompts'

export async function namePrompt() {
  const name = await input({
    message: 'Name: ',
    validate: (value) => {
      return !value ? 'Invalid. Please enter name!' : true
    }
  })

  return name
}
