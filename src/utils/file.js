import fs from "fs";
import path from "path";

import { FileExtensions } from "../enums/file-extensions.js";

export function getFiles(callback) {
  const folder = process.cwd();

  fs.readdir(folder, (err, files) => {
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
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      callback(err, null);
      return;
    }
    callback(null, data);
  });
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
