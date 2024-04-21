import fs from "node:fs";
import path from "node:path";
import nodePath from "node:path";

import { fileURLToPath } from "node:url";

/**
 * Get library `__dirname` to acces root based on lib and not on command was executed (`process.cwd()`)
 *
 * @returns {string}
 */
export function getLocalLibDirname() {
  const __filename = fileURLToPath(import.meta.url);
  const dirname = path.dirname(__filename);

  return dirname?.replace("/src/utils", "");
}

/**
 * Navigate to a path folder and return directories path inside specified folder, if not specify path `process.cwd()` will be used instead
 *
 * @param {string} path Path to a specific folder, if undefined `process.cwd()` will be used instead
 * @returns {string[]}
 */
export function getDirectories(path) {
  const folder = path ?? process.cwd();

  const dirs = fs.readdirSync(folder);

  return dirs.filter((directory) => {
    return fs.statSync(nodePath.join(folder, directory)).isDirectory();
  });
}

/**
 * Check if a tree structure of folders exists
 *
 * @param {string[]} directories List of dirs, e.g `["src", "utils"]`
 * @returns {boolean}
 */
export function checkDirectoriesTree(directories) {
  const rootDirectory = process.cwd();
  let currentDirectory = rootDirectory;

  for (const directory of directories) {
    currentDirectory = nodePath.join(currentDirectory, directory);
    if (
      !fs.existsSync(currentDirectory) ||
      !fs.statSync(currentDirectory).isDirectory()
    ) {
      return false;
    }
  }

  return true;
}
