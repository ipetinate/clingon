import { CssFrameworkEnum, FrameworkEnum, TestFrameworkEnum } from '../enums/frameworks.js'
import { VueVersionEnum } from '../enums/vue-version.js'
import { ResourceTypeEnum } from '../enums/resource-type.js'
import { StoryPostfixEnum, TestPostfixEnum } from '../enums/postfixes.js'
import { cssApproachLabels, frameworksLabel, testFrameworksLabel } from './labels.js'

/**
 * @typedef {{ name: import("../types.js").TypeNames, value: import("../types.js").Resource }} TypeChoices
 *
 * @typedef {{ name: import("../types.js").FrameworkNames, value: import("../types.js").Framework }} FrameworkChoices
 *
 * @typedef {{ name: import("../types.js").TestFrameworkNames, value: import("../types.js").TestFramework }} TestFrameworkChoices
 *
 * @typedef {{ name: import("../types.js").CssFrameworkNames, value: import("../types.js").CssFramework }} CssrameworkChoices
 */

/**
 * Type choices for TS variant of resources
 * @type {TypeChoices[]}
 */
export const tsTypeChoices = [
  { name: 'Page', value: ResourceTypeEnum.page },
  { name: 'Component', value: ResourceTypeEnum.component },
  { name: 'Function', value: ResourceTypeEnum.function }
  // { name: "Type", value: ResourceTypeEnum.type },
  // { name: "Model", value: ResourceTypeEnum.model },
  // { name: "Enum", value: ResourceTypeEnum.enum },
  // { name: "Test", value: ResourceTypeEnum.test },
  // { name: "Spec", value: ResourceTypeEnum.spec },
  // { name: "Cypress Spec", value: ResourceTypeEnum.cypress_spec },
  // { name: "Storybook Story", value: ResourceTypeEnum.storybook_story },
]

/**
 * Type choices for JS variant of resources
 *
 * @type {TypeChoices[]}
 */
export const jsTypeChoices = [
  { name: 'Page', value: ResourceTypeEnum.page },
  { name: 'Component', value: ResourceTypeEnum.component },
  { name: 'Function', value: ResourceTypeEnum.function }
  // { name: "Enum", value: ResourceTypeEnum.enum },
  // { name: "Test", value: ResourceTypeEnum.test },
  // { name: "Spec", value: ResourceTypeEnum.spec },
  // { name: "Cypress Spec", value: ResourceTypeEnum.cypress_spec },
  // { name: "Storybook Story", value: ResourceTypeEnum.storybook_story },
]

/**
 * @type {TestFrameworkChoices[]}
 */
export const testFrameworkChoices = [
  {
    name: testFrameworksLabel.jest,
    value: TestFrameworkEnum.jest
  },
  {
    name: testFrameworksLabel.vitest,
    value: TestFrameworkEnum.vitest
  }
]

/**
 * @type {FrameworkChoices[]}
 */
export const frameworksAndLibsChoices = [
  {
    name: frameworksLabel.vue,
    value: FrameworkEnum.vue
  },
  {
    name: frameworksLabel.react,
    value: FrameworkEnum.react
  }
]

/**
 * @type {CssrameworkChoices[]}
 */
export const cssFrameworkChoices = [
  {
    name: cssApproachLabels.no_style,
    value: CssFrameworkEnum.no_style
  },
  {
    name: cssApproachLabels.css_vanilla,
    value: CssFrameworkEnum.css_vanilla
  },
  {
    name: cssApproachLabels.tailwind_inline,
    value: CssFrameworkEnum.tailwind_inline
  },
  {
    name: cssApproachLabels.tailwind_file,
    value: CssFrameworkEnum.tailwind_file
  },
  {
    name: cssApproachLabels.css_modules,
    value: CssFrameworkEnum.css_modules
  },
  {
    name: cssApproachLabels.scss,
    value: CssFrameworkEnum.scss
  }
]

export const vueVersionsChoices = [
  { name: '3', value: VueVersionEnum[3] },
  { name: '2', value: VueVersionEnum[2] }
]

export const testPostfixChoices = [
  { name: '.spec', value: TestPostfixEnum.spec },
  { name: '.test', value: TestPostfixEnum.test }
]

export const storiesPostfixChoices = [{ name: '.stories', value: StoryPostfixEnum.stories }]

export const chooseMyOwnPathChoice = [{ name: 'Type my path', value: 'type-path' }]

export const resourcesPaths = {
  page: [
    { name: 'src/pages', value: 'src/pages' },
    { name: 'src/views', value: 'src/views' }
  ],
  component: [
    { name: 'components', value: 'components' },
    { name: 'src/components', value: 'src/components' }
  ],
  function: [
    { name: 'functions', value: 'functions' },
    { name: 'src/functions', value: 'src/functions' },
    { name: 'utils', value: 'utils' },
    { name: 'src/utils', value: 'src/utils' },
    { name: 'helpers', value: 'helpers' },
    { name: 'src/helpers', value: 'src/helpers' }
  ],
  type: [
    { name: '@types', value: '@types' },
    { name: 'types', value: 'types' },
    { name: 'src/types', value: 'src/types' },
    { name: 'src/@types', value: 'src/@types' }
  ],
  model: [{ name: 'src/models', value: 'src/models' }],
  enum: [
    { name: 'src/enums', value: 'src/enums' },
    { name: 'src/models', value: 'src/models' }
  ],
  test: {
    page: [
      { name: 'src/__tests__', value: 'src/__tests__' },
      { name: 'src/pages', value: 'src/pages' },
      { name: 'src/pages/__tests__', value: 'src/pages/__tests__' },
      { name: 'src/views', value: 'src/views' },
      { name: 'src/views/__tests__', value: 'src/views/__tests__' }
    ],
    component: [
      { name: 'src/tests', value: 'src/tests' },
      { name: 'src/__tests__', value: 'src/__tests__' },
      { name: 'src/components', value: 'src/components' },
      { name: 'src/components/__tests__', value: 'src/components/__tests__' }
    ],
    function: [
      { name: 'src/tests', value: 'src/tests' },
      { name: 'src/__tests__', value: 'src/__tests__' },
      { name: 'src/utils', value: 'src/utils' },
      { name: 'src/utils/__tests__', value: 'src/utils/__tests__' },
      { name: 'src/helpers', value: 'src/helpers' },
      { name: 'src/helpers/__tests__', value: 'src/helpers/__tests__' },
      { name: 'src/functions', value: 'src/functions' },
      { name: 'src/functions/__tests__', value: 'src/functions/__tests__' },
      { name: 'src/core', value: 'src/core' },
      { name: 'src/core/__tests__', value: 'src/core/__tests__' },
      { name: 'src/shared', value: 'src/shared' },
      { name: 'src/shared/__tests__', value: 'src/shared/__tests__' }
    ]
  },
  cypress_spec: [
    { name: 'e2e', value: 'e2e' },
    { name: 'src/e2e', value: 'src/e2e' },
    { name: 'cypress', value: 'cypress' },
    { name: 'src/cypress', value: 'src/cypress' }
  ],
  storybook_story: {
    page: [
      { name: 'storybook', value: 'storybook' },
      { name: 'stories', value: 'stories' },
      { name: 'src/storybook', value: 'src/storybook' },
      { name: 'src/stories', value: 'src/stories' },
      { name: 'src/__stories__', value: 'src/__stories__' },
      { name: 'src/pages/__stories__', value: 'src/pages/__stories__' }
    ],
    component: [
      { name: 'storybook', value: 'storybook' },
      { name: 'stories', value: 'stories' },
      { name: 'src/storybook', value: 'src/storybook' },
      { name: 'src/stories', value: 'src/stories' },
      { name: 'src/__stories__', value: 'src/__stories__' },
      {
        name: 'src/components/__stories__',
        value: 'src/components/__stories__'
      }
    ]
  }
}
