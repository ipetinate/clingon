import { FrameworkEnum } from "../enums/frameworks.js";

import { unitTestTemplates } from "../constants/templates.js";

import { compose } from "../utils/compose.js";
import { capitalizeLetter } from "../utils/string.js";
import {
  makeFileExtension,
  createFileWithContent,
  readFileContent,
} from "../utils/file.js";
import { localDirname } from "../main.js";

/**
 * Component generator
 *
 * @param {import("../types.js").Answers  & { path: string }} answers Answers prompted to the user
 */
export function generateTests(answers) {
  const { success, error, path } = compose(
    defineTestTemplate(answers),
    getTemplateContent,
    replaceAllTestTextOccurrences,
    generateTestFile
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
 * @param {import("../types.js").Answers & { path: string }} data - Data to compose component
 * @returns {() => import("../types.js").Answers & { templatePath: string }}
 */
export function defineTestTemplate(data) {
  return () => {
    /**
     * @type {"js" | "ts"}
     */
    const variant = data.typescript ? "ts" : "js";

    /**
     * Template path from path's dictionary
     */
    let templatePath = "";

    switch (data.framework) {
      case FrameworkEnum.react: {
        if (data.testFramework === "jest") {
          if (data.withTestingLibrary) {
            templatePath = unitTestTemplates.react[variant].jestTestingLibrary;
          } else {
            templatePath = unitTestTemplates.react[variant].jest;
          }
        }

        if (data.testFramework === "vitest") {
          if (data.withTestingLibrary) {
            templatePath =
              unitTestTemplates.react[variant].vitestTestingLibrary;
          } else {
            templatePath = unitTestTemplates.react[variant].vitest;
          }
        }
      }

      case FrameworkEnum.vue: {
        if (data.testFramework === "jest") {
          if (data.withTestingLibrary) {
            templatePath = unitTestTemplates.vue[variant].jestTestingLibrary;
          } else {
            templatePath = unitTestTemplates.vue[variant].jest;
          }
        }

        if (data.testFramework === "vitest") {
          if (data.withTestingLibrary) {
            templatePath = unitTestTemplates.vue[variant].vitestTestingLibrary;
          } else {
            templatePath = unitTestTemplates.vue[variant].vitest;
          }
        }
      }
    }

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
export function replaceAllTestTextOccurrences(data) {
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
export function generateTestFile(data) {
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
