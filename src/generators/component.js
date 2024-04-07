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
        typescript,
        tsVariantCallback: () => {
          readCreateFormatReactFile({
            name,
            path: "src/templates/react/ts/Component.tsx",
            pathWithFileName,
          });
        },
        jsVariantCallback: () => {
          readCreateFormatReactFile({
            name,
            path: "src/templates/react/js/Component.jsx",
            pathWithFileName,
          });
        },
      });

      break;
    }
    case "vue": {
      const fileName = `${name}.${extension}`;
      const pathWithFileName = `${path}/${fileName}`;

      handleVariants({
        typescript,
        tsVariantCallback: () => {
          readCreateFormatVueFile({
            name,
            path: "src/templates/vue/3/ts/SetupComponent.vue",
            pathWithFileName,
          });
        },
        jsVariantCallback: () => {
          readCreateFormatVueFile({
            name,
            path: "src/templates/vue/3/js/SetupComponent.vue",
            pathWithFileName,
          });
        },
      });

      break;
    }
    default: {
      throw new Error("You must inform the framework!");
    }
  }
}

function handleVariants({ typescript, jsVariantCallback, tsVariantCallback }) {
  if (typescript) tsVariantCallback();

  jsVariantCallback();
}

function readCreateFormatReactFile({ path, pathWithFileName, name }) {
  readFileContent(path, (_, fileContent) => {
    createFileWithContent(
      pathWithFileName,
      fileContent.replace("Component", name)
    );
  });
}

function readCreateFormatVueFile({ path, pathWithFileName, name }) {
  readFileContent(path, (_, fileContent) => {
    createFileWithContent(
      pathWithFileName,
      fileContent.replace(/component/g, name.toLowerCase())
    );
  });
}
