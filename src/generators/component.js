import { handleVariants } from "../utils/handle-variants.js";
import {
  createFileWithContent,
  makeFileExtension,
  readFileContent,
} from "../utils/file.js";

export function generateComponent({
  framework,
  postfix,
  typescript,
  name,
  path,
}) {
  if (!framework) throw new Error("You must inform the framework!");

  const extension = makeFileExtension({
    postfix,
    typescript,
    vue: framework === "vue",
    withJsx: framework === "react",
  });

  switch (framework) {
    case "react": {
      const fileName = `${name}.${extension}`;
      const pathWithFileName = `${path}/${fileName}`;

      handleVariants({
        target: typescript ? "ts" : "js",
        variants: {
          ts: () => {
            readCreateFormatReactFile({
              name,
              path: "src/templates/react/ts/Component.tsx",
              pathWithFileName,
            });
          },
          js: () => {
            readCreateFormatReactFile({
              name,
              path: "src/templates/react/js/Component.jsx",
              pathWithFileName,
            });
          },
        },
      });

      break;
    }
    case "vue": {
      const fileName = `${name}.${extension}`;
      const pathWithFileName = `${path}/${fileName}`;

      handleVariants({
        target: typescript ? "ts" : "js",
        variants: {
          ts: () => {
            readCreateFormatVueFile({
              name,
              path: "src/templates/vue/3/ts/SetupComponent.vue",
              pathWithFileName,
            });
          },
          js: () => {
            readCreateFormatVueFile({
              name,
              path: "src/templates/vue/3/js/SetupComponent.vue",
              pathWithFileName,
            });
          },
        },
      });

      break;
    }
    default: {
      throw new Error("You must inform the framework!");
    }
  }
}

function readCreateFormatReactFile({ path, pathWithFileName, name }) {
  const fileContent = readFileContent(path);

  createFileWithContent(
    pathWithFileName,
    fileContent.replace("Component", name)
  );
}

function readCreateFormatVueFile({ path, pathWithFileName, name }) {
  const fileContent = readFileContent(path);

  createFileWithContent(
    pathWithFileName,
    fileContent.replace(/component/g, name.toLowerCase())
  );
}
