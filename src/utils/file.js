import fs from "node:fs";
import path from "node:path";

import { FileExtensions } from "../enums/file-extensions.js";

/**
 * Get files form root dir
 *
 * @param {(error, files) => void} callback Function to handle file result or error
 */
export function getFiles(callback) {
  const folder = process.cwd();

  fs.readdirSync(folder, (err, files) => {
    if (err) {
      callback(err, null);
      return;
    }

    const filePaths = files.map((file) => {
      return path.join(folder, file);
    });

    callback(null, filePaths);
  });
}

export function readFileContent(filePath, callback) {
  fs.readFileSync(filePath, "utf8", callback);
}

export function createFileWithContent(filename, content) {
  try {
    fs.writeFileSync(filename, content, "utf8");

    console.log(`File "${filename}" created successfully.`);
  } catch (error) {
    console.error(`Error creating file "${filename}":`, error);
  }
}

export function makeFileExtension({ typescript, postfix, withJsx, vue }) {
  if (vue) return FileExtensions.vue;

  const tsExt = withJsx ? FileExtensions.tsx : FileExtensions.ts;
  const jsExt = withJsx ? FileExtensions.jsx : FileExtensions.js;

  const extension = `${typescript ? tsExt : jsExt}`;

  if (postfix) return `${postfix}.${extension}`;

  return extension;
}
