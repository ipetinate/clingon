import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { ResourceTypeEnum } from "./resource-type.js";

describe("ResourceTypeEnum", () => {
  it("should return properly values", () => {
    assert.strictEqual(ResourceTypeEnum.component, "component");
    assert.strictEqual(ResourceTypeEnum.cypress_spec, "cypress_spec");
    assert.strictEqual(ResourceTypeEnum.enum, "enum");
    assert.strictEqual(ResourceTypeEnum.function, "function");
    assert.strictEqual(ResourceTypeEnum.model, "model");
    assert.strictEqual(ResourceTypeEnum.page, "page");
    assert.strictEqual(ResourceTypeEnum.spec, "spec");
    assert.strictEqual(ResourceTypeEnum.test, "test");
    assert.strictEqual(ResourceTypeEnum.storybook_story, "storybook_story");
    assert.strictEqual(ResourceTypeEnum.type, "type");
  });
});
