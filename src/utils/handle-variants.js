/**
 * Handle variants for
 *
 * @typedef {"js" | "ts"} VariantTarget - Target for handle variants
 *
 * @param {{ target: VariantTarget, variants: Record<VariantTarget, () => void> }} props Properties to handle JS, TS or others variants if needed
 */
export function handleVariants({ target, variants }) {
  const fn = variants[target]

  fn()
}
