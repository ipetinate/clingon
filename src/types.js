import { FrameworkEnum } from "enums/frameworks.js";
import { ResourceTypeEnum } from "enums/resource-type.js";
import { StoryPostfixEnum, TestPostfixEnum } from "enums/postfixes.js";

/**
 * @typedef {keyof ResourceTypeEnum} Resource - Resource type
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
 *   testPostfix: TestPostfix;
 *   storyPostfix: StoryPostfix;
 *   resourcePath: string;
 *   testPath: string
 *   storyPath: string
 * }} Answers - Users prompted answers
 *
 * @typedef {"Page" | "Component" | "Function" | "Type" | "Model" | "Enum" | "Test" | "Spec" | "Cypress Spec" | "Storybook Story"} TypeNames
 * @typedef {"Vue" | "React"} FrameworkNames
 */

export default {};
