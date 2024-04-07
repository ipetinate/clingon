import { getFiles, readFileContent } from "./file.js";

export async function readLocalConfig(callback) {
  getFiles((err, files) => {
    if (err) {
      console.error("Error:", err);

      return;
    }

    const localConfigPath = files.find((file) =>
      file.includes("tricorder.json")
    );

    readFileContent(localConfigPath, callback);
  });
}
