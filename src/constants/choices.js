import { FrameworkEnum } from "../enums/frameworks.js";
import { VueVersionEnum } from "../enums/vue-version.js";

export const tsTypeChoices = [
  { name: "Page", value: "page" },
  { name: "Component", value: "component" },
  { name: "Function", value: "function" },
  { name: "Type", value: "type" },
  { name: "Model", value: "model" },
  { name: "Enum", value: "enum" },
  { name: "Test", value: "test" },
  { name: "Spec", value: "spec" },
  { name: "Cypress Spec", value: "cypress_spec" },
  { name: "Storybook Story", value: "storybook_story" },
];

export const jsTypeChoices = [
  { name: "Page", value: "page" },
  { name: "Component", value: "component" },
  { name: "Function", value: "function" },
  { name: "Enum", value: "enum" },
  { name: "Test", value: "test" },
  { name: "Spec", value: "spec" },
  { name: "Cypress Spec", value: "cypress_spec" },
  { name: "Storybook Story", value: "storybook_story" },
];

export const frameworksAndLibsChoices = [
  { name: "Vue", value: FrameworkEnum.Vue },
  { name: "React", value: FrameworkEnum.React },
];

export const vueVersionsChoices = [
  { name: "Vue 2", value: VueVersionEnum[2] },
  { name: "Vue 3", value: VueVersionEnum[3] },
];

export const postfixChoices = [
  { name: ".spec", value: "spec" },
  { name: ".test", value: "test" },
];

export const resourcesPaths = {
  page: [
    { name: "src/pages", value: "src/pages" },
    { name: "src/views", value: "src/views" },
  ],
  component: [
    { name: "components", value: "components" },
    { name: "src/components", value: "src/components" },
  ],
  function: [
    { name: "functions", value: "functions" },
    { name: "src/functions", value: "src/functions" },
    { name: "utils", value: "utils" },
    { name: "src/utils", value: "src/utils" },
    { name: "helpers", value: "helpers" },
    { name: "src/helpers", value: "src/helpers" },
  ],
  type: [
    { name: "@types", value: "@types" },
    { name: "types", value: "types" },
    { name: "src/types", value: "src/types" },
    { name: "src/@types", value: "src/@types" },
  ],
  model: [{ name: "src/models", value: "src/models" }],
  enum: [
    { name: "src/enums", value: "src/enums" },
    { name: "src/models", value: "src/models" },
  ],
  test: {
    page: [
      { name: "src/__tests__", value: "src/__tests__" },
      { name: "src/pages", value: "src/pages" },
      { name: "src/pages/__tests__", value: "src/pages/__tests__" },
      { name: "src/views", value: "src/views" },
      { name: "src/views/__tests__", value: "src/views/__tests__" },
    ],
    component: [
      { name: "src/tests", value: "src/tests" },
      { name: "src/__tests__", value: "src/__tests__" },
      { name: "src/components", value: "src/components" },
      { name: "src/components/__tests__", value: "src/components/__tests__" },
    ],
  },
  cypress_spec: [
    { name: "e2e", value: "e2e" },
    { name: "src/e2e", value: "src/e2e" },
    { name: "cypress", value: "cypress" },
    { name: "src/cypress", value: "src/cypress" },
  ],
  storybook_story: {
    page: [
      { name: "storybook", value: "storybook" },
      { name: "stories", value: "stories" },
      { name: "src/storybook", value: "src/storybook" },
      { name: "src/stories", value: "src/stories" },
      { name: "src/__stories__", value: "src/__stories__" },
      { name: "src/pages/__stories__", value: "src/pages/__stories__" },
    ],
    component: [
      { name: "storybook", value: "storybook" },
      { name: "stories", value: "stories" },
      { name: "src/storybook", value: "src/storybook" },
      { name: "src/stories", value: "src/stories" },
      { name: "src/__stories__", value: "src/__stories__" },
      {
        name: "src/components/__stories__",
        value: "src/components/__stories__",
      },
    ],
  },
};
