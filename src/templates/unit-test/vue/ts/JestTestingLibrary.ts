import { render, screen, type RenderOptions } from '@testing-library/vue'

import ResourceName from 'resourcePath.vue'

type RenderComponent = {
  props: InstanceType<typeof ResourceName>['$props']
  slots: InstanceType<typeof ResourceName>['$slots']
} & RenderOptions

describe('ResourceName', () => {
  const componentData: RenderComponent = {
    props: {},
    slots: {}
  }

  it('renders the correct message', () => {
    render(ResourceName, componentData)

    expect(
      screen.getByText("Hello, I'm a resource auto generated by Clingon CLI!")
    ).toBeInTheDocument()
  })
})
