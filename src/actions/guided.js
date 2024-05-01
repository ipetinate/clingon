import { confirm, input, select } from '@inquirer/prompts'
import {
  frameworksAndLibsChoices,
  jsTypeChoices,
  testPostfixChoices,
  resourcesPaths,
  tsTypeChoices,
  vueVersionsChoices,
  storiesPostfixChoices,
  testFrameworkChoices,
  cssFrameworkChoices,
  chooseMyOwnPathChoice
} from '../constants/choices.js'

import { boolAsText } from '../utils/string.js'
import { guidedFlowGenerator } from '../flows/guided-flow-generator.js'

import { CssFrameworkEnum, FrameworkEnum } from '../enums/frameworks.js'

export async function guidedAction() {
  /**
   * With unit tests?
   *
   * @type {boolean}
   */
  let withTest = false

  /**
   * With stories
   *
   * @type {boolean}
   */
  let withStory = false

  /**
   * With Testing Library on tests
   *
   * @type {boolean}
   */
  let withTestingLibrary = false

  /**
   * Test file postfix
   *
   * @type {import("../types.js").TestPostfix}
   */
  let testPostfix = null

  /**
   * Test file postfix
   *
   * @type {import("../types.js").StoryPostfix}
   */
  let storyPostfix = 'stories'

  /**
   * @type {import("../types.js").Framework} - Framework target value
   */
  let framework = null

  /**
   * Test file postfix
   *
   * @type {import("../types.js").TestFramework}
   */
  let testFramework = null

  /**
   * Test file path
   *
   * @type {string}
   */
  let testPath = null

  /**
   * Story file path
   *
   * @type {string}
   */
  let storyPath = null

  /**
   * Resource file path
   *
   * @type {string}
   */
  let resourcePath = null

  /**
   * Css Framework target
   *
   * @type {import("../types.js").CssFramework}
   */
  let cssFramework = 'vanilla_css'

  /**
   * Target version of framework (e.g Vue 2 or 3, etc)
   *
   * @type {number | string}
   */
  let version = null

  /**
   * With typescript
   *
   * @type {boolean}
   */
  const typescript = await confirm({ message: 'Do you use TypeScript?' })

  /**
   * Resource to be generated type
   *
   * @type {import("../types.js").Resource}
   */
  const type = await select({
    message: 'What do you want to create?',
    choices: typescript ? tsTypeChoices : jsTypeChoices
  })

  if (['component', 'page'].includes(type)) {
    framework = await select({
      message: 'Select your framework/lib',
      choices: frameworksAndLibsChoices
    })
  }

  if (framework === FrameworkEnum.vue) {
    version = await select({
      message: 'What is your Vue version?',
      choices: vueVersionsChoices
    })
  }

  if (['component', 'page'].includes(type)) {
    cssFramework = await select({
      message: 'Would you like to select the CSS styles?',
      choices: cssFrameworkChoices,
      default: CssFrameworkEnum.no_style
    })
  }

  /**
   * Opinionated path choices
   */
  const choices = getPathChoices({ type })

  if (choices) {
    resourcePath = await select({
      message: `What is the folder path that I should create your ${type} in?`,
      choices: [...chooseMyOwnPathChoice, ...choices]
    })
  }

  if (!choices || resourcePath === 'type-path') {
    resourcePath = await input({
      message: `What is the folder path that I should create your ${type} in? e.g. src/folder/here`,
      validate: pathValidator
    })
  }

  if (['component', 'function', 'page'].includes(type)) {
    withTest = await confirm({
      message: 'Would you like to add unit tests?'
    })
  }

  if (withTest) {
    const choices = getPathChoices({ type, target: 'test' })

    if (choices) {
      testPath = await select({
        message: 'What is the folder path that I should create your tests in?',
        choices: [
          {
            name: `Same as your ${type}: ${resourcePath}`,
            value: resourcePath
          },
          ...chooseMyOwnPathChoice,
          ...choices
        ]
      })
    }

    if (!choices || testPath === 'type-path') {
      testPath = await input({
        message: 'What is the folder path that I should create your tests in? e.g. folder/here',
        validate: pathValidator
      })
    }

    testFramework = await select({
      message: 'What is your test framework?',
      choices: testFrameworkChoices
    })

    if (['component', 'page'].includes(type)) {
      withTestingLibrary = await confirm({
        message: 'Do you use Testing Library in your tests?'
      })
    }

    testPostfix = await select({
      message: 'What postfix do you use in your test file?',
      choices: testPostfixChoices
    })
  }

  const isVue2TypeScript = framework === FrameworkEnum.vue && version === 2 && typescript

  if (['component'].includes(type) && !isVue2TypeScript) {
    withStory = await confirm({
      message: 'Would you like to add storybook story?'
    })
  }

  if (withStory) {
    const choices = getPathChoices({ type, target: 'story' })

    if (choices) {
      storyPath = await select({
        message: 'What is the folder path that I should create your story in?',
        choices: [
          {
            name: `Same as your ${type}: ${resourcePath}`,
            value: resourcePath
          },
          ...chooseMyOwnPathChoice,
          ...choices
        ]
      })
    }

    if (!choices || storyPath === 'type-path') {
      storyPath = await input({
        message: 'What is the folder path that I should create your story in? e.g. folder/here',
        validate: pathValidator
      })
    }
  }

  /**
   * Resource name (e.g if is a component, should be like `PersonCard`)
   * @type {string}
   */
  const name = await input({ message: 'Name' })

  /**
   * Result of user's prompted asked questions
   *
   * @type {import("../types.js").Answers}
   */
  const answers = {
    framework,
    cssFramework,
    testFramework,
    version,
    name,
    resourcePath,
    testPath,
    storyPath,
    testPostfix,
    storyPostfix,
    type,
    typescript,
    withStory,
    withTest,
    withTestingLibrary
  }

  showPreview(answers)

  /**
   * User's confirmation to proceed with generation after preview setup
   *
   * @type {boolean}
   */
  const allowedToGenerate = await confirm({
    message: 'Confirm this is what you want to create?'
  })

  if (allowedToGenerate) {
    await guidedFlowGenerator(answers)
  } else {
    /**
     * If user made a mistake, ask if he want's to restart generation
     *
     * @type {boolean}
     */
    const doAgain = await confirm({
      message: 'Do you want to restart the generator?'
    })

    if (doAgain) guidedAction()
  }
}

/**
 * Get path choices for list on prompt
 *
 * @param {{ type: import("../types.js").Resource, target: }} props
 * @returns {import("../constants/choices.js").TypeChoices[]}
 */
function getPathChoices({ type, target }) {
  if (target === 'test') return resourcesPaths.test[type]
  if (target === 'story') return resourcesPaths.storybook_story[type]

  return resourcesPaths[type]
}

/**
 * Viewing answers to questions asked to the user
 *
 * @param {import("../types.js").Answers} answers User's responses
 */
function showPreview(answers) {
  const askedQuestions = {
    'Framework/Lib': answers.framework,
    'Framework/Lib Version': answers.version,
    'Resource Type': answers.type,
    'Resource Name': answers.name,
    'With TypeScript': boolAsText(answers.typescript),
    'CSS approach': getCssApproachName(answers.cssFramework),
    'With Story': boolAsText(answers.withStory),
    'With Unit Test': boolAsText(answers.withTest),
    'With Testing Library': boolAsText(answers.withTestingLibrary),
    'My Test Postfix': answers.testPostfix,
    'My Test Framework': answers.testFramework,
    'Resource Path': answers.resourcePath,
    'Test Path': answers.testPath,
    'Story Path': answers.storyPath
  }

  const preview = Object.fromEntries(Object.entries(askedQuestions).filter(([_, v]) => v !== null))

  console.table(preview)
}

/**
 * Css Frameworks
 *
 * @param {import("../types.js").CssFramework} target Css framework
 */
function getCssApproachName(target) {
  if (!target) return null

  const option = cssFrameworkChoices.find(({ value }) => value && value === target)

  return option?.name
}

/**
 * Path validator for inquirer `input()`
 */
function pathValidator(value) {
  return value ?? 'Enter an existing path. For root dir, use "."'
}
