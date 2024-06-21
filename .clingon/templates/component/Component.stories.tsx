import type { Meta, StoryObj } from '@storybook/react'

import { ResourceName } from './ResourceName'

const meta: Meta<typeof ResourceName> = {
  component: ResourceName
}

export default meta
type Story = StoryObj<typeof ResourceName>

export const Primary: Story = {
  args: {
    message: "I'm a component called ResourceName"
  }
}
