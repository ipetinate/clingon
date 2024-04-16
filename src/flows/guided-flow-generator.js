import { input } from "@inquirer/prompts";
import { checkDirectoriesTree } from "../utils/directory.js";
import { splitPathString } from "../utils/string.js";
import { generateComponent } from "../generators/components.js";
import { generateTests } from "../generators/tests.js";

/**
 * Generate file from guided prompt
 *
 * @param {import("../types.js").Answers} data Information the user provided in the guided prompt
 */
export async function guidedFlowGenerator(data) {
  await checkProvidedPathRecursive(
    data.resourcePath,
    async (path) => {
      generateComponent({ ...data, path });

      await handleTests(data, path);
    },
    data.type
  );
}

/**
 * Check if path already exists and return path if exist, else prompt user to provide a correct path
 *
 * @param {string} path Path to create file
 * @param {async () => Promise<void>} callback Callback to be executed after internal response
 * @param {Answers["type"]} target Target to fill info message on console
 * @returns {Promise<string>}
 */
async function checkProvidedPathRecursive(path, callback, target) {
  const pathArray = splitPathString(path);
  const pathExists = checkDirectoriesTree(pathArray);

  if (pathExists) {
    return await callback(path);
  } else {
    const pathFallback = await input({
      message: `The ${target} path not exist's. Provide the correct path:`,
    });

    await checkProvidedPathRecursive(pathFallback, callback, target);
  }
}

/**
 * Handle tests flow
 *
 * @param {import("../types.js").Answers} data Information the user provided in the guided prompt
 * @param {string} path Path from main resource if should use same path
 *
 */
async function handleTests(data, path) {
  if (!data.withTest) return;

  if (!(data.testPath === data.resourcePath)) {
    return await checkProvidedPathRecursive(
      data.testPath,
      (newPath) => generateTests({ ...data, path: newPath }),
      data.testPostfix
    );
  }

  generateTests({ ...data, path });
}
