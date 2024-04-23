import { describe, it, expect } from "vitest";

import { FunctionName } from "functionPath";

describe("FunctionName", () => {
  it("should works properly", () => {
    const result = FunctionName();

    expect(result).toBeDefined();
  });
});
