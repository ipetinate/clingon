/**
 * @type {Record<import("../types").CssFramework, import("../types").CssFrameworkNames>}
 */
export const cssApproachLabels = {
  css_vanilla: 'CSS Vanilla',
  css_modules: 'CSS Modules',
  no_style: 'None',
  scss: 'Sass/Scss',
  tailwind_file: 'Tailwind (css file w/ @apply)',
  tailwind_inline: 'Tailwind (inline w/ class attr)'
}

/**
 * @type {Record<import("../types").Framework, import("../types").FrameworkNames>}
 */
export const frameworksLabel = {
  vue: 'Vue',
  react: 'React',
  vanilla: 'Vanilla'
}

/**
 * @type {Record<import("../types").TestFramework, import("../types").TestFrameworkNames>}
 */
export const testFrameworksLabel = {
  jest: 'Jest',
  vitest: 'Vitest'
}
