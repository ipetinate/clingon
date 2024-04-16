import React from "react";
import ReactDOM from "react-dom";

import { ComponentName } from "componentPath/ComponentName";

describe("ComponentName", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");

    ReactDOM.render(<ComponentName />, div);
  });
});