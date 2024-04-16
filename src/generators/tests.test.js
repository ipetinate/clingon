import { describe, it } from "node:test";
import assert from "node:assert/strict";

/**
 * @type {import("./components.js").Answers}
 */
const answers = {
  framework: FrameworkEnum.vue,
  name: "Test",
  resourcePath: "/folder",
  testPostfix: "spec",
  type: "page",
  typescript: true,
  version: null,
  withStory: false,
  withTest: false,
};

describe.todo("Tests Generator", () => {
  todo(
    "should create a component based on answers (user's prompted)",
    () => {}
  );
});