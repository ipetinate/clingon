import {
  defineComponentTemplate,
  generateComponentFile,
  getTemplateContent,
  replaceAllComponentTextOccurrences,
} from "../utils/component.js";
import { compose } from "../utils/compose.js";

/**
 * @typedef {import("../actions/guided.js").Answers} Answers
 */

/**
 * Component generator
 *
 * @param {Answers & { path: string }} answers Answers prompted to the user
 */
export function generateComponent(answers) {
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
