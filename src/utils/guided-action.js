import { boolAsText } from './string.js'

import { resourcesPaths } from '../constants/choices.js'
import { cssApproachLabels } from '../constants/labels.js'

/**
 * Get path choices for list on prompt
 *
 * @param {{ type: import("../types.js").Resource, target: "test" | "story" }} props
 * @returns {import("../constants/choices.js").TypeChoices[]}
 */
export function getPathChoices({ type, target }) {
  if (target === 'test') return resourcesPaths.test[type]
  if (target === 'story') return resourcesPaths.storybook_story[type]

  return resourcesPaths[type]
}

/**
 * Viewing answers to questions asked to the user
 *
 * @param {import("../types.js").Answers} answers User's responses
 */
export function showPreview(answers) {
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
export function getCssApproachName(target) {
  if (!target) return null

  return cssApproachLabels[target]
}

/**
 * Path validator for inquirer `input()`
 */
export function pathValidator(value) {
  return !value ? 'Enter an existing path. For root dir, use "."' : true
}
