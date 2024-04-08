import fs from "fs";
import path from "path";

/**
 * Reads the content of a local configuration file named "tricorder.json".
 *
 * @param {string} filename The configuration file name.
 * @returns {Object | null} The content of the configuration file, or null if not found.
 */
export function readLocalConfig(filename) {
  try {
    const folder = process.cwd();

    const files = fs.readdirSync(folder);
    const localConfigPath = files.find((file) => file.includes(filename));

    if (!localConfigPath) {
      throw new Error("Error: Configuration file not found");
      return null;
    }

    const filePath = path.join(folder, localConfigPath);
    const fileContent = fs.readFileSync(filePath, "utf8");

    return JSON.parse(fileContent);
  } catch (error) {
    throw new Error(error);

    return null;
  }
}
