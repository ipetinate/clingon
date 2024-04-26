import type { ArgTypes, Meta, StoryFn } from '@storybook/vue3'

import { toRefs } from 'vue'

import ResourceName from 'resourcePath'

const argTypes = {
  // Describe your args type (component properties) here to autodocs show properly informations
}

const meta = {
  component: ResourceName,
  title: 'Components/UI/Card',
  tags: ['autodocs'],
  argTypes
}

export default meta

const Template = (args) => ({
  components: { ResourceName },
  setup() {
    const reactiveArgs = toRefs(args)

    return { args: reactiveArgs }
  },
  template: `
    <ResourceName 
      // pass here yours props, e.g: (remove this comment)

      :id="args.id"
    >
        <!-- If your component receive slots, pass them here, if not, remove this comment -->
    </ResourceName>
  `
})

export const Default = Template.bind({})
Default.args = {
  id: 'clingon-generated-resource'
}
