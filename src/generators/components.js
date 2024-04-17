import { FrameworkEnum } from "../enums/frameworks.js";

import { frameworkTemplates } from "../constants/templates.js";

import { compose } from "../utils/compose.js";
import { convertCase } from "../utils/string.js";
import { makeFileExtension } from "../utils/file.js";
import { createFileWithContent, readFileContent } from "../utils/file.js";

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

/**
 * @typedef {import("../actions/guided.js").Answers} Answers
 * @typedef {Record<2 | 3, "options" | "setup">} VueApi - Vue API variant options or setup (composition)
 */

/**
 * Get component template details
 *
 * @param {Answers & { path: string }} data - Data to compose component
 * @returns {() => Answers & { templatePath: string }}
 */
export function defineComponentTemplate(data) {
  return () => {
    /**
     * Template path from path's dictionary
     */
    let templatePath = "";

    /**
     * @type {"js" | "ts"}
     */
    const variant = data.typescript ? "ts" : "js";

    /**
     * @type {2 | 3}
     */
    const vueVersion = data.version;

    /**
     * @type {VueApi}
     */
    const vueApi = {
      2: "options",
      3: "setup",
    };

    switch (data.framework) {
      case FrameworkEnum.react: {
        templatePath = frameworkTemplates.react[variant].functional;

        return { ...data, templatePath };
      }
      case FrameworkEnum.vue: {
        /**
         * @type {VueApi}
         */
        const api = vueApi[vueVersion];

        templatePath = frameworkTemplates.vue[vueVersion][variant][api];

        return { ...data, templatePath };
      }
      default: {
        throw new Error("Framework is required to get a template");
      }
    }
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
  switch (data.framework) {
    case FrameworkEnum.react: {
      data.fileContent = data.fileContent.replace("Component", data.name);

      return data;
    }
    case FrameworkEnum.vue: {
      data.fileContent = data.fileContent.replace(
        /component/g,
        convertCase("kebab-case", data.name.toLowerCase())
      );

      return data;
    }
    default: {
      throw new Error(
        "Framework is required to replace all occurences inside template"
      );
    }
  }
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
    vue: data.framework === FrameworkEnum.vue,
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
