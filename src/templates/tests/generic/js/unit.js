describe("ResourceName", () => {
  it("work's properly", () => {
    const result = true;

    expect(result).toBe(true);
  });

  it("work's properly async", async () => {
    const result = await Promise.resolve(true);

    expect(result).toBe(true);
  });
});
