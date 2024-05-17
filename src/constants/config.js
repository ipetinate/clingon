export const defaultConfig = {
  /**
   * Alias for text ocurrences replacement
   *
   * 🚨 Be careful, do not replace "resourcePath" or "ResourceName", to avoid generating strange behavior in the templates,
   *    causing auto-completion to be unconfigured
   */
  alias: {
    /**
     * Will replace all `src` occurrences on templates to `@`, Example: `src/components/...` become `@/components/...`
     */
    src: '@'
  },
  /**
   * If `true` will default export functions, components, pages, etc. Example:
   */
  exportDefault: false
}
