import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { FileExtensionEnum } from "./file-extension.js";

describe("FileExtensionEnum", () => {
  it("should return properly value", () => {
    assert.strictEqual(FileExtensionEnum.js, "js");
    assert.strictEqual(FileExtensionEnum.jsx, "jsx");
    assert.strictEqual(FileExtensionEnum.json, "json");
    assert.strictEqual(FileExtensionEnum.ts, "ts");
    assert.strictEqual(FileExtensionEnum.tsx, "tsx");
    assert.strictEqual(FileExtensionEnum.vue, "vue");
  });
});
