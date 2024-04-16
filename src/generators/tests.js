import { compose } from "../utils/compose.js";
import { capitalizeLetter } from "../utils/string.js";
import {
  defineComponentTemplate,
  generateComponentFile,
  getTemplateContent,
  replaceAllComponentTextOccurrences,
} from "../utils/tests.js";

/**
 * Component generator
 *
 * @param {import("../types.js").Answers  & { path: string }} answers Answers prompted to the user
 */
export function generateTests(answers) {
  const { success, error, path } = compose(
    defineComponentTemplate(answers),
    getTemplateContent,
    replaceAllComponentTextOccurrences,
    generateComponentFile
  );

  if (success) {
    console.info(
      capitalizeLetter(answers.testPostfix) + " created successfully: " + path
    );
  }
  if (error) {
    console.info(`Error on create ${answers.testPostfix}, try again`);
  }
}
