import { FrameworkEnum } from "../enums/frameworks.js";

import { makeFileExtension } from "./file.js";

import { templates } from "../constants/templates.js";
import { createFileWithContent, readFileContent } from "../utils/file.js";
import { convertCase } from "./string.js";
import { VueVersionEnum } from "../enums/vue-version.js";

/**
 * @typedef {{
 *   type: string;
 *   name: string;
 *   framework: string;
 *   version: string | number
 *   resourcePath: string;
 *   testPostfix: string;
 *   typescript: boolean;
 *   withTest: boolean;
 *   withStory: boolean;
 * }} Answers
 *
 * @typedef {Record<2 | 3, "options" | "setup">} VueApi - Vue API variant options or setup (composition)
 */

/**
 * Get component template details
 *
 * @param {Answers} data - Data to compose component
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
      case FrameworkEnum.React: {
        templatePath = templates.react[variant].functional;

        return { ...data, templatePath };
      }
      case FrameworkEnum.Vue: {
        /**
         * @type {VueApi}
         */
        const api = vueApi[vueVersion];

        templatePath = templates.vue[vueVersion][variant][api];

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
    case FrameworkEnum.React: {
      data.fileContent = data.fileContent.replace("Component", data.name);

      return data;
    }
    case FrameworkEnum.Vue: {
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
    vue: data.framework === FrameworkEnum.Vue,
    withJsx: data.framework === FrameworkEnum.React,
  });

  const fileName = `${data.name}.${extension}`;
  const pathWithFileName = `${data.resourcePath}/${fileName}`;

  const success = createFileWithContent(pathWithFileName, data.fileContent);

  return {
    success,
    error: !success,
    path: pathWithFileName,
  };
}
