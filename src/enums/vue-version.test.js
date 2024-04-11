import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { VueVersionEnum } from "./vue-version";

describe("FrameworksEnum", () => {
  it("should return properly values", () => {
    assert.strictEqual(VueVersionEnum[2], 2);
    assert.strictEqual(VueVersionEnum[3], 3);
  });
});
