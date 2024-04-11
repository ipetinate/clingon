import {
  defineComponentTemplate,
  generateComponentFile,
  getTemplateContent,
  replaceAllComponentTextOccurrences,
} from "../utils/component.js";
import { compose } from "../utils/compose.js";

/**
 * @typedef {{
 *    path: string,
 *    pathWithFileName: string,
 *    name: string
 *  }} CreateComponentData - Data to create component file
 * @typedef {"vue" | "react"} Framework - Framework target
 * @typedef {"spec" | "test"} TestPostfix - Postfix for unit test file
 * @typedef {"stories"} StoryPostfix - Postfix for stories file (storybook, or other lib)
 * @typedef {import("../actions/guided.js").Answers} Answers
 */

/**
 * Component generator
 *
 * @param {Answers} answers Answers prompted to the user
 */
export function generateComponent(answers) {
  if (!answers.framework) {
    throw new Error("You must inform the framework!");
  }

  const { success, error, path } = compose(
    defineComponentTemplate(answers),
    getTemplateContent,
    replaceAllComponentTextOccurrences,
    generateComponentFile
  );

  if (success) {
    console.info("Component created successfully: " + path);
  }
  if (error) {
    console.info("Error on create component, try again");
  }
}
