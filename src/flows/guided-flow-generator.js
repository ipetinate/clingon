import { input } from "@inquirer/prompts";
import { checkDirectoriesTree } from "../utils/directory.js";
import { splitPathString } from "../utils/string.js";
import { generateComponent } from "../generators/components.js";

/**
 * Generate file from guided prompt
 *
 * @typedef {import("../actions/guided.js").Answers} Answers
 *
 * @param {Answers} data Information the user provided in the guided prompt
 */
export async function guidedFlowGenerator(data) {
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
  const pathArray = splitPathString(path);
  const pathExists = checkDirectoriesTree(pathArray);

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
