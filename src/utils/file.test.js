import { describe, it, todo } from "node:test";
import assert from "node:assert/strict";

import { getFiles, makeFileExtension, readFileContent } from "./file.js";

const typescript = true;
const withJsx = true;
const postfix = {
  spec: "spec",
  test: "test",
};

const fileList = [
  "tricorder/.git",
  "tricorder/.gitignore",
  "tricorder/README.md",
  "tricorder/doc",
  "tricorder/jsconfig.json",
  "tricorder/node_modules",
  "tricorder/package.json",
  "tricorder/src",
  "tricorder/tricorder.json",
  "tricorder/yarn.lock",
];

// Mockar tudo isso para evitar erros desnecessarios

describe("File Util", () => {
  describe("getFiles util", () => {
    it("get files from root dir", () => {
      const files = getFiles();

      files.forEach((file, index) => {
        assert.match(file, new RegExp(fileList[index]));
      });
    });

    it("get files content error flow", () => {
      // assert.throws(getFiles, Error);
    });
  });

  describe("readFileContent util", () => {
    it("get file content", () => {
      readFileContent(
        process.cwd() + "/tricorder.json",
        (error, fileContent) => {
          assert.deepEqual(JSON.parse(fileContent), { exportDefault: false });
        }
      );
    });

    it("get file content error flow", () => {
      const expectToThrowError = () =>
        readFileContent(
          process.cwd() + "/tricorder.blabla",
          (error, fileContent) => {}
        );

      assert.throws(expectToThrowError, Error);
    });
  });

  describe("createFileWithContent util", () => {
    // TODO: mock fs to make this test

    todo("create a file with content", () => {});
  });

  describe("makeFileExtension util", () => {
    it("make a file extension based on parameters for .vue", () => {
      const extension = makeFileExtension({ vue: true });

      assert.strictEqual(extension, "vue");
    });

    it("make a file extension based on parameters for .tsx", () => {
      const extension = makeFileExtension({ typescript, withJsx });

      assert.strictEqual(extension, "tsx");
    });

    it("make a file extension based on parameters for .jsx", () => {
      const extension = makeFileExtension({ withJsx });

      assert.strictEqual(extension, "jsx");
    });

    it("make a file extension based on parameters for .ts", () => {
      const extension = makeFileExtension({ typescript });

      assert.strictEqual(extension, "ts");
    });

    it("make a file extension based on parameters for .js", () => {
      const extension = makeFileExtension({ typescript: false });

      assert.strictEqual(extension, "js");
    });

    it("make a file extension based on parameters for .ts with postfix spec", () => {
      const extension = makeFileExtension({
        typescript,
        postfix: postfix.spec,
      });

      assert.strictEqual(extension, "spec.ts");
    });

    it("make a file extension based on parameters for .js with postfix spec", () => {
      const extension = makeFileExtension({
        typescript: false,
        postfix: postfix.spec,
      });

      assert.strictEqual(extension, "spec.js");
    });

    it("make a file extension based on parameters for .ts with postfix test", () => {
      const extension = makeFileExtension({
        typescript,
        postfix: postfix.test,
      });

      assert.strictEqual(extension, "test.ts");
    });

    it("make a file extension based on parameters for .js with postfix test", () => {
      const extension = makeFileExtension({
        typescript: false,
        postfix: postfix.test,
      });

      assert.strictEqual(extension, "test.js");
    });
  });
});
