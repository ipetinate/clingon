import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { FileExtensions } from "./file-extensions.js";

describe("FileExtension Enum", () => {
  it("should return properly value", () => {
    assert.strictEqual(FileExtensions.js, "js");
    assert.strictEqual(FileExtensions.jsx, "jsx");
    assert.strictEqual(FileExtensions.json, "json");
    assert.strictEqual(FileExtensions.ts, "ts");
    assert.strictEqual(FileExtensions.tsx, "tsx");
    assert.strictEqual(FileExtensions.vue, "vue");
  });
});
