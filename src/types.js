import { ResourceTypeEnum } from 'enums/resource-type.js'
import { FileExtensionEnum } from 'enums/file-extension.js'
import { FrameworkEnum, TestFrameworkEnum, CssFrameworkEnum } from 'enums/frameworks.js'
import { StoryPostfixEnum, TestPostfixEnum, StylePostfixEnum } from 'enums/postfixes.js'

/**
 * @typedef {keyof typeof ResourceTypeEnum} Resource - Resource type
 *
 * @typedef {keyof typeof FileExtensionEnum} Extension - File extension
 *
 * @typedef {keyof typeof TestFrameworkEnum} TestFramework - Test framework target
 *
 * @typedef {keyof typeof CssFrameworkEnum} CssFramework - Test framework target
 *
 * @typedef {keyof typeof FrameworkEnum | "vanilla"} Framework - Framework target
 *
 * @typedef {keyof typeof TestPostfixEnum} TestPostfix - Postfix for unit test file
 *
 * @typedef {keyof typeof StoryPostfixEnum} StoryPostfix - Postfix for stories file (storybook, or other lib)
 *
 * @typedef {keyof typeof StylePostfixEnum} StylePostfix - Postfix for styles file (module, style, ...)
 *
 * @typedef {TestPostfix | StoryPostfix | StylePostfix} Postfix - All files postfixes
 *
 * @typedef {{
 *  name: string;
 *  type: Resource;
 *  framework: Framework;
 *  version: string | number
 *  typescript: boolean;
 *  withTest: boolean;
 *  withStory: boolean;
 *  withTestingLibrary: boolean
 *  folderWrapper: boolean
 *  testPostfix: TestPostfix;
 *  storyPostfix: StoryPostfix;
 *  testFramework: TestFramework
 *  cssFramework: CssFramework
 *  resourcePath: string;
 *  testPath: string
 *  storyPath: string
 * }} Answers - Users prompted answers
 *
 * @typedef {{
 *  preset: string,
 *  type: Resource,
 *  framework: Framework,
 *  testFramework: TestFramework,
 *  cssFramework: CssFramework
 *  path: string,
 *  testPath: string,
 *  storyPath: string,
 *  test: boolean,
 *  spec: boolean,
 *  story: boolean,
 *  typescript: boolean,
 *  testingLibrary: boolean,
 *  folderWrapper: boolean,
 *  vueVersion: VueVersion
 * }} CommanderOptions - Commander command line options
 *
 * @typedef {{
 *  alias: {
 *    src: string
 *  },
 * exportDefault: boolean
 * }} GlobalConfig - Clingon global config object
 *
 * @typedef {"Page" | "Component" | "Function" | "Type" | "Model" | "Enum" | "Test" | "Spec" | "Cypress Spec" | "Storybook Story"} TypeNames - Resource type names
 *
 * @typedef {"Vue" | "React" | "Vanilla"} FrameworkNames - Framework names
 *
 * @typedef {"Vitest" | "Jest"} TestFrameworkNames - Test framework Names
 *
 * @typedef {"CSS Modules" | "Tailwind (inline w/ class attr)" | "Tailwind (css file w/ @apply)" | "CSS Vanilla" | "Sass/Scss" | "None"} CssFrameworkNames - Css Framework names
 *
 * @typedef { "2" | "3" } VueVersion - Vue JS versions
 *
 * @typedef {"resource" | "style"} Target - Resource target
 *
 * @typedef {"ts" | "js"} Language - Language (js, ts, etc)
 *
 * @typedef {"options" | "setup"} VueApi - Vue api template syntax
 *
 * @typedef {"class" | "functional"} ReactComponentVariant - React component type variant (class or functional)
 */

export default {}
