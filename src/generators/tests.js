/**
 * @typedef {import("../actions/guided.js").Answers} Answers
 */

import { compose } from "../utils/compose.js";
import {
  defineComponentTemplate,
  generateComponentFile,
  getTemplateContent,
  replaceAllComponentTextOccurrences,
} from "../utils/tests.js";

/**
 * Component generator
 *
 * @param {Answers  & { path: string }} answers Answers prompted to the user
 */
export function generateTests(answers) {
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
