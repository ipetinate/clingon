import { FrameworkEnum } from "../enums/frameworks.js";

import { unitTestTemplates } from "../constants/templates.js";

import { compose } from "../utils/compose.js";
import { capitalizeLetter } from "../utils/string.js";
import {
  makeFileExtension,
  createFileWithContent,
  readFileContent,
} from "../utils/file.js";

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

/**
 * Get component template details
 *
 * @param {Answers & { path: string }} data - Data to compose component
 * @returns {() => Answers & { templatePath: string }}
 */
export function defineComponentTemplate(data) {
  return () => {
    /**
     * @type {"js" | "ts"}
     */
    const variant = data.typescript ? "ts" : "js";

    /**
     * Template path from path's dictionary
     */
    const templatePath = unitTestTemplates.generic[variant].unit;

    return { ...data, templatePath };
  };
}

/**
 * Get template content from file
 *
 * @param {Answers & { templatePath: string }} data - Data to compose component
 * @returns {() => Answers & {
 *    templatePath: string,
 *    fileContent: string
 *  }}
 */
export function getTemplateContent(data) {
  const fileContent = readFileContent(data.templatePath);

  return { ...data, fileContent };
}

/**
 * Get template content from file
 *
 * @param {Answers & {
 *    templatePath: string,
 *    fileContent: string
 *  }} data - Data to compose component
 * @returns {() => data}
 */
export function replaceAllComponentTextOccurrences(data) {
  data.fileContent = data.fileContent.replace("ResourceName", data.name);

  return data;
}

/**
 * Get template content from file
 *
 * @param {Answers & {
 *    templatePath: string,
 *    fileContent: string
 *  }} data - Data to compose component
 * @returns {() => string}
 */
export function generateComponentFile(data) {
  const extension = makeFileExtension({
    typescript: data.typescript,
    postfix: data.testPostfix,
    withJsx: data.framework === FrameworkEnum.react,
  });

  const fileName = `${data.name}.${extension}`;
  const pathWithFileName = `${data.path}/${fileName}`;

  const success = createFileWithContent(pathWithFileName, data.fileContent);

  return {
    success,
    error: !success,
    path: pathWithFileName,
  };
}
