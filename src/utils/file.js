import fs from "node:fs";
import path from "node:path";

import { FileExtensions } from "../enums/file-extensions.js";

/**
 * Get files from root directory
 *
 * @param {string | undefined} folderPath Path to folder, if omited rootDir (`process.cwd()`) will be used instead
 * @returns {string[]} Array of file paths
 */
export function getFiles(folderPath) {
  const folder = folderPath ?? process.cwd();

  try {
    const files = fs.readdirSync(folder);

    const filePaths = files.map((file) => path.join(folder, file));

    return filePaths;
  } catch (err) {
    throw new Error(`Error reading files: ${err}`);
  }
}

/**
 * Read file content and return as string
 *
 * @param {string} filePath Path to file
 * @returns {string}
 */
export function readFileContent(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

/**
 * Create a file with content and notify on console if success or error
 *
 * @param {string} filename Name with extensions, e.g `LoginView.vue` or "Login.tsx"
 * @param {string} content Content to be injected inside file
 */
export function createFileWithContent(filename, content) {
  try {
    fs.writeFileSync(filename, content, "utf8");

    console.log(`File "${filename}" created successfully.`);
  } catch (error) {
    console.error(`Error creating file "${filename}":`, error);
  }
}

/**
 * Make the file extension and returns without dot on start, e.g `tsx` or `vue` or `spec.ts`
 *
 * @param {{  postfix?: string, typescript?: boolean, withJsx?: boolean, vue?: boolean }} param0 Properties to compose extension
 * @returns string
 */
export function makeFileExtension({ typescript, postfix, withJsx, vue }) {
  if (vue) return FileExtensions.vue;

  const tsExt = withJsx ? FileExtensions.tsx : FileExtensions.ts;
  const jsExt = withJsx ? FileExtensions.jsx : FileExtensions.js;

  const extension = `${typescript ? tsExt : jsExt}`;

  if (postfix) return `${postfix}.${extension}`;

  return extension;
}
