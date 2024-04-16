import { ResourceTypeEnum } from "enums/resource-type.js";
import { StoryPostfixEnum, TestPostfixEnum } from "enums/postfixes.js";
import {
  FrameworkEnum,
  TestFrameworkEnum,
  CssFrameworkEnum,
} from "enums/frameworks.js";

/**
 * @typedef {keyof ResourceTypeEnum} Resource - Resource type
 *
 * @typedef {keyof TestFrameworkEnum} TestFramework - Test framework target
 * @typedef {keyof CssFrameworkEnum} CssFramework - Test framework target
 *
 * @typedef {keyof FrameworkEnum} Framework - Framework target
 *
 * @typedef {keyof TestPostfixEnum} TestPostfix - Postfix for unit test file
 *
 * @typedef {keyof StoryPostfixEnum} StoryPostfix - Postfix for stories file (storybook, or other lib)
 *
 * @typedef {{
 *   name: string;
 *   type: Resource;
 *   framework: Framework;
 *   version: string | number
 *   typescript: boolean;
 *   withTest: boolean;
 *   withStory: boolean;
 *   withTestingLibrary: boolean
 *   testPostfix: TestPostfix;
 *   storyPostfix: StoryPostfix;
 *   testFramework: TestFramework
 *   cssFramework: CssFramework
 *   resourcePath: string;
 *   testPath: string
 *   storyPath: string
 * }} Answers - Users prompted answers
 *
 * @typedef {"Page" | "Component" | "Function" | "Type" | "Model" | "Enum" | "Test" | "Spec" | "Cypress Spec" | "Storybook Story"} TypeNames
 * @typedef {"Vue" | "React"} FrameworkNames
 * @typedef {"Vitest" | "Jest"} TestFrameworkNames
 * @typedef {"CSS Modules (.css)" | "Tailwind CSS Inline (inside component)" | "Tailwind CSS w/ File (.css w/ @apply)" | "Vanilla Pure CSS (.css)" | "SASS (.scss)"} CssFrameworkNames
 */

export default {};
