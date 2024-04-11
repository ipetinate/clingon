import { confirm, input, select } from "@inquirer/prompts";
import {
  frameworksAndLibsChoices,
  jsTypeChoices,
  testPostfixChoices,
  resourcesPaths,
  tsTypeChoices,
  vueVersionsChoices,
  storiesPostfixChoices,
} from "../constants/choices.js";

import { boolAsText } from "../utils/string.js";
import { guidedFlowGenerator } from "../flows/guided-flow-generator.js";

import { ResourceType } from "../enums/resource-type.js";
import { FrameworkEnum } from "../enums/frameworks.js";
import { StoryPostfixEnum, TestPostfixEnum } from "../enums/postfixes.js";

/**
 * @typedef {keyof ResourceType} Resource - Resource type
 * @typedef {keyof FrameworkEnum} Framework - Framework target
 * @typedef {keyof TestPostfixEnum} TestPostfix - Postfix for unit test file
 * @typedef {keyof StoryPostfixEnum} StoryPostfix - Postfix for stories file (storybook, or other lib)
 * @typedef {{
 *   name: string;
 *   type: Resource;
 *   framework: Framework;
 *   version: string | number
 *   typescript: boolean;
 *   withTest: boolean;
 *   withStory: boolean;
 *   testPostfix: TestPostfix;
 *   storyPostfix: StoryPostfix;
 *   resourcePath: string;
 *   testPath: string
 *   storyPath: string
 * }} Answers - Users prompted answers
 */

export async function guidedAction() {
  /**
   * With unit tests?
   *
   * @type {boolean}
   */
  let withTest = false;
  /**
   * With stories
   *
   * @type {boolean}
   */
  let withStory = false;
  /**
   * Test file postfix
   *
   * @type {TestPostfix}
   */
  let testPostfix = null;
  /**
   * Test file postfix
   *
   * @type {StoryPostfix}
   */
  let storyPostfix = null;

  /**
   * Test file path
   *
   * @type {string}
   */
  let testPath = null;
  /**
   * Story file path
   *
   * @type {string}
   */
  let storyPath = null;
  /**
   * Resource file path
   *
   * @type {string}
   */
  let resourcePath = null;

  /**
   * Target version of framework (e.g Vue 2 or 3, etc)
   *
   * @type {number | string}
   */
  let version = null;

  /**
   * @type {Framework} - Framework target value
   */
  const framework = await select({
    message: "Select your framework/lib",
    choices: frameworksAndLibsChoices,
  });

  if (framework === FrameworkEnum.vue) {
    version = await select({
      message: "What is your Vue version?",
      choices: vueVersionsChoices,
    });
  }

  /**
   * With typescript
   *
   * @type {boolean}
   */
  const typescript = await confirm({ message: "Do you use TypeScript?" });

  /**
   * Resource to be generated type
   *
   * @type {Resource}
   */
  const type = await select({
    message: "What do you want to create?",
    choices: typescript ? tsTypeChoices : jsTypeChoices,
  });

  /**
   * Opinionated path choices
   */
  const choices = getPathChoices({ type });

  if (choices) {
    resourcePath = await select({
      message: `What is the folder path that I should create your ${type} in?`,
      choices,
    });
  } else {
    resourcePath = await input({
      message: `What is the folder path that I should create your ${type} in? e.g. folder/here`,
    });
  }

  if (["component", "function", "page"].includes(type)) {
    withTest = await confirm({
      message: "Would you like to add unit tests?",
    });
  }

  if (withTest) {
    const choices = getPathChoices({ type, target: "test" });

    if (choices) {
      testPath = await select({
        message: "What is the folder path that I should create your tests in?",
        choices,
      });
    } else {
      testPath = await input({
        message:
          "What is the folder path that I should create your tests in? e.g. folder/here",
      });
    }

    testPostfix = await select({
      message: "What postfix do you use in your test file?",
      choices: testPostfixChoices,
    });
  }

  if (["component", "page"].includes(type)) {
    withStory = await confirm({
      message: "Would you like to add storybook story?",
    });
  }

  if (withStory) {
    const choices = getPathChoices({ type, target: "story" });

    if (choices) {
      storyPath = await select({
        message: "What is the folder path that I should create your story in?",
        choices,
      });
    } else {
      storyPath = await input({
        message:
          "What is the folder path that I should create your story in? e.g. folder/here",
      });
    }

    storyPostfix = await select({
      message: "What postfix do you use in your story file?",
      choices: storiesPostfixChoices,
    });
  }

  /**
   * Resource name (e.g if is a component, should be like `PersonCard`)
   */
  const name = await input({ message: "Name" });

  /**
   * @type {Answers}
   */
  const answers = {
    framework,
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
  };

  showPreview(answers);

  /**
   * User's confirmation to proceed with generation after preview setup
   *
   * * @type {boolean}
   */
  const allowedToGenerate = await confirm({
    message: "Confirm this is what you want to create?",
  });

  if (allowedToGenerate) {
    await guidedFlowGenerator(answers);
  } else {
    /**
     * If user made a mistake, ask if he want's to restart generation
     *
     * @type {boolean}
     */
    const doAgain = await confirm({
      message: "Do you want to restart the generator?",
    });

    if (doAgain) guidedAction();
  }
}

function getPathChoices({ type, target }) {
  if (target === "test") return resourcesPaths.test[type];
  if (target === "story") return resourcesPaths.storybook_story[type];

  return resourcesPaths[type];
}

function showPreview(answers) {
  console.table({
    "Framework/Lib": answers.framework,
    Type: answers.type,
    "Resource Name": answers.name,
    "Resource Path": answers.resourcePath,
    "Test Path": answers.testPath,
    "Spec Path": answers.storyPath,
    "With TypeScript": boolAsText(answers.typescript),
    "With Story": boolAsText(answers.withStory),
    "With Unit Test": boolAsText(answers.withTest),
    "My Test Postfix": answers.testPostfix,
  });
}
