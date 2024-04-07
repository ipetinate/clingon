import { input } from "@inquirer/prompts";
import { checkDirectoriesTree } from "../utils/directory.js";
import { splitPathString } from "../utils/string.js";
import { generateComponent } from "../generators/component.js";

/**
 * Generate file from guided prompt
 *
 * @param {{
 *   type: string;
 *   name: string;
 *   framework: string;
 *   resourcePath: string;
 *   testPostfix: string;
 *   typescript: boolean;
 *   withTest: boolean;
 *   withStory: boolean;
 * }} data Information the user provided in the guided prompt
 * @param {{ exportDefault: boolean } | undefined} globalConfig
 */
export async function guidedFlowGenerator(data, globalConfig) {
  await checkProvidedPathRecursive(data.resourcePath, (path) => {
    generateComponent({ ...data, path });
  });
}

/**
 * Check if path already exists and return path if exist, else prompt user to provide a correct path
 *
 * @param {string} path Path to create file
 * @returns {Promise<string>}
 */
async function checkProvidedPathRecursive(path, callback) {
  const pathExists = checkDirectoriesTree(splitPathString(path));

  if (pathExists) {
    return callback(path);
  } else {
    const pathFallback = await input({
      message:
        "The path you provided does not exist. Can you type the correct path to the resource?",
    });

    await checkProvidedPathRecursive(pathFallback, callback);
  }
}
