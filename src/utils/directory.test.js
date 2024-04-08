import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { getDirectories } from "./directory.js";

const srcDirs = [
  "actions",
  "constants",
  "enums",
  "flows",
  "generators",
  "templates",
  "utils",
];

const rootDirs = [".git", "doc", "node_modules", "src"];

describe("Directory Utils", () => {
  describe("getDirectories util", () => {
    it("get directories from a specific path/dir", () => {
      const directories = getDirectories(process.cwd() + "/src");

      assert.deepEqual(directories, srcDirs);
    });

    it("get directories from root", () => {
      const directories = getDirectories();

      assert.deepEqual(directories, rootDirs);
    });
  });
});
