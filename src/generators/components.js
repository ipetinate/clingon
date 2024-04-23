import { FrameworkEnum } from "../enums/frameworks.js";

import { frameworkTemplates } from "../constants/templates.js";

import { compose } from "../utils/compose.js";
import { convertCase } from "../utils/string.js";
import { makeFileExtension } from "../utils/file.js";
import { createFileWithContent, readFileContent } from "../utils/file.js";
import { localDirname } from "../main.js";

/**
 * @typedef {import("../types.js").Answers} Answers
 * @typedef {Record<2 | 3, "options" | "setup">} VueApi - Vue API variant options or setup (composition)
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
        if (data.cssFramework === "vanilla_css") {
          templatePath =
            frameworkTemplates.react[variant].component.functional.vanilla_css;
        }
        if (data.cssFramework === "css_modules") {
          templatePath =
            frameworkTemplates.react[variant].component.functional.css_modules;
        }
        if (data.cssFramework === "scss") {
          templatePath =
            frameworkTemplates.react[variant].component.functional.scss;
        }
        if (data.cssFramework === "tailwind_file") {
          templatePath =
            frameworkTemplates.react[variant].component.functional
              .tailwind_file;
        }
        if (data.cssFramework === "tailwind_inline") {
          templatePath =
            frameworkTemplates.react[variant].component.functional
              .tailwind_inline;
        }

        return { ...data, templatePath };
      }
      case FrameworkEnum.vue: {
        const api = vueApi[vueVersion];

        if (data.cssFramework === "vanilla_css") {
          templatePath =
            frameworkTemplates.vue[vueVersion][variant].component[api]
              .vanilla_css;
        }
        if (data.cssFramework === "scss") {
          templatePath =
            frameworkTemplates.vue[vueVersion][variant].component[api].scss;
        }
        if (data.cssFramework === "css_modules") {
          templatePath =
            frameworkTemplates.vue[vueVersion][variant].component[api]
              .css_modules;
        }
        if (data.cssFramework === "tailwind_file") {
          templatePath =
            frameworkTemplates.vue[vueVersion][variant].component[api]
              .tailwind_file;
        }
        if (data.cssFramework === "tailwind_inline") {
          templatePath =
            frameworkTemplates.vue[vueVersion][variant].component[api]
              .tailwind_inline;
        }

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
export function replaceAllComponentTextOccurrences(data) {
  switch (data.framework) {
    case FrameworkEnum.react: {
      data.fileContent = data.fileContent.replace("ResourceName", data.name);

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
