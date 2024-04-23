import { localDirname } from "../main.js";

import { functionTemplates } from "../constants/templates.js";

import { compose } from "../utils/compose.js";
import { convertCase } from "../utils/string.js";
import { makeFileExtension } from "../utils/file.js";
import { createFileWithContent, readFileContent } from "../utils/file.js";

/**
 * @typedef {import("../types.js").Answers} Answers
 */

/**
 * Function generator
 *
 * @param {Answers & { path: string }} answers Answers prompted to the user
 */
export function generateFunction(answers) {
  const { success, error, path } = compose(
    defineFunctionTemplate(answers),
    getTemplateContent,
    replaceAllFunctionTextOccurrences,
    generateFunctionFile
  );

  if (success) {
    console.info("Function created successfully: " + path);
  }
  if (error) {
    console.info("Error on create component, try again");
  }
}

/**
 * Get component template details
 *
 * @param {Answers & { path: string }} data - Data to compose component
 * @returns {() => Answers & { templatePath: string }}
 */
export function defineFunctionTemplate(data) {
  return () => {
    /**
     * Template path from path's dictionary
     */
    let templatePath = "";

    /**
     * @type {"js" | "ts"}
     */
    const variant = data.typescript ? "ts" : "js";

    templatePath = functionTemplates[variant];

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
  const fullPath = `${localDirname}/${data.templatePath}`;

  const fileContent = readFileContent(fullPath);

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
export function replaceAllFunctionTextOccurrences(data) {
  data.name = convertCase("camelCase", data.name);

  data.fileContent = data.fileContent.replace("FunctionName", data.name);

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
export function generateFunctionFile(data) {
  const extension = makeFileExtension({ typescript: data.typescript });

  const fileName = `${data.name}.${extension}`;
  const pathWithFileName = `${data.path}/${fileName}`;

  const success = createFileWithContent(pathWithFileName, data.fileContent);

  return {
    success,
    error: !success,
    path: pathWithFileName,
  };
}
