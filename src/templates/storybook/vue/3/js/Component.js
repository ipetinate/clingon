import { ArgTypes, Meta, StoryFn } from '@storybook/vue3'

import { toRefs } from 'vue'

import ResourceName from 'resourcePath'

const argTypes = {
  // Describe your args type (component properties) here to autodocs show properly informations
}

const meta = {
  component: ResourceName,
  title: 'ResourceType/ResourceName',
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
    <div style="width: 100%; height: 100%; display: flex; justify-content: center; align-content: center; align-items: center;">
      <ResourceName
        :id="args.id"
        
        // pass here yours props, e.g: (remove this comment before run)
      >
          <!-- If your component receive slots, pass them here, if not, remove this comment -->
      </ResourceName>
    </div>
  `
})

export const Default = Template.bind({})
Default.args = {
  id: 'clingon-generated-resource'
}
