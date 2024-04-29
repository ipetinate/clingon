import type { Meta, StoryObj, ArgTypes } from '@storybook/react'

import { ResourceName } from 'resourcePath'

type Story = StoryObj<typeof ResourceName>

const argTypes: Partial<ArgTypes<Story['args']>> = {
  // Declare arg types here (props description to autodocs)
}
const args: Story['args'] = {
  // Component props here
}

const meta: Meta<typeof ResourceName> = {
  component: ResourceName,
  title: 'Components/ResourceName',
  tags: ['autodocs'],
  argTypes
}

export default meta

export const Default: Story = {
  render: () => <ResourceName id="clingon-component" />,
  args
}
