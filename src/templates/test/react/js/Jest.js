import React from "react";
import ReactDOM from "react-dom";

import { ResourceName } from "componentPath";

describe("ResourceName", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");

    ReactDOM.render(<ResourceName />, div);
  });
});
