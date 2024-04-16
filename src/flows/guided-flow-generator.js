import { input } from "@inquirer/prompts";
import { checkDirectoriesTree } from "../utils/directory.js";
import { splitPathString } from "../utils/string.js";
import { generateComponent } from "../generators/components.js";
import { generateTests } from "../generators/tests.js";

/**
 * Generate file from guided prompt
 *
 * @typedef {import("../actions/guided.js").Answers} Answers
 *
 * @param {Answers} data Information the user provided in the guided prompt
 */
export async function guidedFlowGenerator(data) {
  await checkProvidedPathRecursive(data.resourcePath, async (path) => {
    generateComponent({ ...data, path });

    if (data.withTest) {
      if (data.testPath === data.resourcePath) {
        generateTests({ ...data, path });
      } else {
        await checkProvidedPathRecursive(data.testPath, (path) => {
          generateTests({ ...data, path });
        });
      }
    }
  });
}

/**
 * Check if path already exists and return path if exist, else prompt user to provide a correct path
 *
 * @param {string} path Path to create file
 * @returns {Promise<string>}
 */
async function checkProvidedPathRecursive(path, callback) {
  const pathArray = splitPathString(path);
  const pathExists = checkDirectoriesTree(pathArray);

  if (pathExists) {
    return await callback(path);
  } else {
    const pathFallback = await input({
      message: "The path not exist. Can you type the correct path?",
    });

    await checkProvidedPathRecursive(pathFallback, callback);
  }
}
