import fs from "fs";
import path from "path";

export function getDirectories(callback) {
  const folder = process.cwd();

  fs.readdir(folder, (error, directories) => {
    if (error) return callback(error, null);

    const dirs = directories.filter((directory) => {
      return fs.statSync(path.join(folder, directory)).isDirectory();
    });

    callback(null, dirs);
  });
}

export function checkDirectoriesTree(directories) {
  const rootDirectory = process.cwd();
  let currentDirectory = rootDirectory;

  for (const directory of directories) {
    currentDirectory = path.join(currentDirectory, directory);
    if (
      !fs.existsSync(currentDirectory) ||
      !fs.statSync(currentDirectory).isDirectory()
    ) {
      return false;
    }
  }

  return true;
}
