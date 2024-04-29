import { ResourceName } from 'resourcePath'

const meta = {
  component: ResourceName,
  title: 'ResourceType/ResourceName',
  tags: ['autodocs'],
  argTypes
}

export default meta

export const Default = {
  render: () => <ResourceName id="clingon-component" />,
  args: {
    // component props
  }
}
