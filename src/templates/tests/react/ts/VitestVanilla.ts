import React from "react";
import ReactDOM from "react-dom";

import { describe, it, expect } from "vitest";

import { ComponentName } from "componentPath";

describe("ComponentName", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");

    const element = ReactDOM.render(<ComponentName />, div);

    expect(element).toBeDefined();
  });
});
