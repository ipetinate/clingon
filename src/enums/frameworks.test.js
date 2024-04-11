import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { FrameworkEnum } from "./frameworks.js";

describe("FrameworksEnum", () => {
  it("should return properly values", () => {
    assert.strictEqual(FrameworkEnum.Vue, "vue");
    assert.strictEqual(FrameworkEnum.React, "react");
  });
});
