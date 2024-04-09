import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { checkDirectoriesTree, getDirectories } from "./directory.js";

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

  describe("checkDirectoriesTree util", () => {
    it("returns true if directory tree structure exists", () => {
      const exists = checkDirectoriesTree(["src", "actions"]);

      assert.strictEqual(exists, true);
    });

    it("returns false if directory tree structure not exists", () => {
      const exists = checkDirectoriesTree(["src", "foo", "bar"]);

      assert.strictEqual(exists, false);
    });
  });
});
