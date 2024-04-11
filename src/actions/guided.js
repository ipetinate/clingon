import { confirm, input, select } from "@inquirer/prompts";
import {
  frameworksAndLibsChoices,
  jsTypeChoices,
  postfixChoices,
  resourcesPaths,
  tsTypeChoices,
  vueVersionsChoices,
} from "../constants/choices.js";
import { boolAsText } from "../utils/string.js";

import { guidedFlowGenerator } from "../flows/guided-flow-generator.js";
import { FrameworkEnum } from "../enums/frameworks.js";

/**
 * @typedef {{
 *   type: string;
 *   name: string;
 *   framework: string;
 *   version: string | number
 *   resourcePath: string;
 *   testPath: string
 *   storyPath: string
 *   testPostfix: string;
 *   typescript: boolean;
 *   withTest: boolean;
 *   withStory: boolean;
 * }} Answers
 */

export async function guidedAction() {
  let withTest = false;
  let withStory = false;
  let testPostfix = null;

  let testPath = null;
  let storyPath = null;
  let resourcePath = null;

  let version = null;

  const framework = await select({
    message: "Select your framework/lib",
    choices: frameworksAndLibsChoices,
  });

  if (framework === FrameworkEnum.Vue) {
    version = await select({
      message: "What is your Vue version?",
      choices: vueVersionsChoices,
    });
  }

  const typescript = await confirm({ message: "Do you use TypeScript?" });

  const type = await select({
    message: "What do you want to create?",
    choices: typescript ? tsTypeChoices : jsTypeChoices,
  });

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

  if (["component", "page"].includes(type)) {
    withStory = await confirm({
      message: "Would you like to add storybook story?",
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
      choices: postfixChoices,
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
  }

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
    type,
    typescript,
    withStory,
    withTest,
  };

  showPreview(answers);

  const allowedToGenerate = await confirm({
    message: "Confirm this is what you want to create?",
  });

  if (allowedToGenerate) {
    await guidedFlowGenerator(answers);
  } else {
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
