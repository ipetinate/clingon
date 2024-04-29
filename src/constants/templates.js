import { CssFrameworkEnum } from '../enums/frameworks.js'

/**
 * @template T
 * @typedef {Record<import("../types").LangType, Record<import("../types").Resource, Record<T, Record<import("../types").TemplateVariants, string>>>>} FrameworksTemplatesStructure
 */

/**
 * @typedef {Record<import("../types").VueVersion, FrameworksTemplatesStructure<import("../types").VueApi>>} Vue
 * @typedef {FrameworksTemplatesStructure<import("../types").ReactComponentVariant>} React
 */

/**
 * Built-in templates for components and pages path dictionary
 *
 * @type {{ vue: Vue, react: React }}
 */
export const frameworkTemplates = {
  react: {
    js: {
      component: {
        functional: {
          no_style: 'templates/react/js/component/Functional.jsx',
          css_modules: 'templates/react/js/component/CssModulesFunctional.jsx',
          scss: 'templates/react/js/component/FunctionalWithScss.jsx',
          vanilla_css: 'templates/react/js/component/FunctionalWithStyle.jsx',
          tailwind_inline: 'templates/react/js/component/TailwindInlineFunctional.jsx',
          tailwind_file: 'templates/react/js/component/TailwindFunctional.jsx'
        }
      }
    },
    ts: {
      component: {
        functional: {
          no_style: 'templates/react/ts/component/Functional.tsx',
          css_modules: 'templates/react/ts/component/CssModulesFunctional.tsx',
          scss: 'templates/react/ts/component/FunctionalWithScss.tsx',
          vanilla_css: 'templates/react/ts/component/FunctionalWithStyle.tsx',
          tailwind_inline: 'templates/react/ts/component/TailwindInlineFunctional.tsx',
          tailwind_file: 'templates/react/ts/component/TailwindFunctional.tsx'
        }
      }
    }
  },
  vue: {
    2: {
      js: {
        component: {
          options: {
            css_modules: 'templates/vue/2/js/component/CssModulesOptions.vue',
            scss: 'templates/vue/2/js/component/ScssOptions.vue',
            vanilla_css: 'templates/vue/2/js/component/Options.vue',
            tailwind_inline: 'templates/vue/2/js/component/TailwindInlineOptions.vue',
            tailwind_file: 'templates/vue/2/js/component/TailwindOptions.vue'
          }
        },
        page: {
          options: {
            css_modules: 'templates/vue/2/js/page/CssModulesOptions.vue',
            scss: 'templates/vue/2/js/page/ScssOptions.vue',
            vanilla_css: 'templates/vue/2/js/page/Options.vue',
            tailwind_inline: 'templates/vue/2/js/page/TailwindInlineOptions.vue',
            tailwind_file: 'templates/vue/2/js/page/TailwindOptions.vue'
          }
        }
      },
      ts: {
        component: {
          options: {
            css_modules: 'templates/vue/2/ts/component/CssModulesOptions.vue',
            scss: 'templates/vue/2/ts/component/ScssOptions.vue',
            vanilla_css: 'templates/vue/2/ts/component/Options.vue',
            tailwind_inline: 'templates/vue/2/ts/component/TailwindInlineOptions.vue',
            tailwind_file: 'templates/vue/2/ts/component/TailwindOptions.vue'
          }
        },
        page: {
          options: {
            css_modules: 'templates/vue/2/ts/page/CssModulesOptions.vue',
            scss: 'templates/vue/2/ts/page/ScssOptions.vue',
            vanilla_css: 'templates/vue/2/ts/page/Options.vue',
            tailwind_inline: 'templates/vue/2/ts/page/TailwindInlineOptions.vue',
            tailwind_file: 'templates/vue/2/ts/page/TailwindOptions.vue'
          }
        }
      }
    },
    3: {
      js: {
        component: {
          options: {
            css_modules: 'templates/vue/3/js/component/CssModulesOptions.vue',
            scss: 'templates/vue/3/js/component/ScssOptions.vue',
            vanilla_css: 'templates/vue/3/js/component/Options.vue',
            tailwind_inline: 'templates/vue/3/js/component/TailwindInlineOptions.vue',
            tailwind_file: 'templates/vue/3/js/component/TailwindOptions.vue'
          },
          setup: {
            css_modules: 'templates/vue/3/js/component/CssModulesSetup.vue',
            scss: 'templates/vue/3/js/component/ScssSetup.vue',
            vanilla_css: 'templates/vue/3/js/component/Setup.vue',
            tailwind_inline: 'templates/vue/3/js/component/TailwindInlineSetup.vue',
            tailwind_file: 'templates/vue/3/js/component/TailwindSetup.vue'
          }
        },
        page: {
          options: {
            css_modules: 'templates/vue/3/js/page/CssModulesOptions.vue',
            scss: 'templates/vue/3/js/page/ScssOptions.vue',
            vanilla_css: 'templates/vue/3/js/page/Options.vue',
            tailwind_inline: 'templates/vue/3/js/page/TailwindInlineOptions.vue',
            tailwind_file: 'templates/vue/3/js/page/TailwindOptions.vue'
          },
          setup: {
            css_modules: 'templates/vue/3/js/page/CssModulesSetup.vue',
            scss: 'templates/vue/3/js/page/ScssSetup.vue',
            vanilla_css: 'templates/vue/3/js/page/Setup.vue',
            tailwind_inline: 'templates/vue/3/js/page/TailwindInlineSetup.vue',
            tailwind_file: 'templates/vue/3/js/page/TailwindSetup.vue'
          }
        }
      },
      ts: {
        component: {
          options: {
            css_modules: 'templates/vue/3/ts/component/CssModulesOptions.vue',
            scss: 'templates/vue/3/ts/component/ScssOptions.vue',
            vanilla_css: 'templates/vue/3/ts/component/Options.vue',
            tailwind_file: 'templates/vue/3/ts/component/TailwindOptions.vue',
            tailwind_inline: 'templates/vue/3/ts/component/TailwindInlineOptions.vue'
          },
          setup: {
            css_modules: 'templates/vue/3/ts/component/CssModulesSetup.vue',
            scss: 'templates/vue/3/ts/component/ScssSetup.vue',
            vanilla_css: 'templates/vue/3/ts/component/Setup.vue',
            tailwind_file: 'templates/vue/3/ts/component/TailwindSetup.vue',
            tailwind_inline: 'templates/vue/3/ts/component/TailwindInlineSetup.vue'
          }
        },
        page: {
          options: {
            css_modules: 'templates/vue/3/ts/page/CssModulesOptions.vue',
            scss: 'templates/vue/3/ts/page/ScssOptions.vue',
            vanilla_css: 'templates/vue/3/ts/page/Options.vue',
            tailwind_file: 'templates/vue/3/ts/page/TailwindOptions.vue',
            tailwind_inline: 'templates/vue/3/ts/page/TailwindInlineOptions.vue'
          },
          setup: {
            css_modules: 'templates/vue/3/ts/page/CssModulesSetup.vue',
            scss: 'templates/vue/3/ts/page/ScssSetup.vue',
            vanilla_css: 'templates/vue/3/ts/page/Setup.vue',
            tailwind_file: 'templates/vue/3/ts/page/TailwindSetup.vue',
            tailwind_inline: 'templates/vue/3/ts/page/TailwindInlineSetup.vue'
          }
        }
      }
    }
  }
}

/**
 * Built-in templates for unit test path dictionary
 */
export const unitTestTemplates = {
  react: {
    js: {
      jest: 'templates/unit-test/react/js/Jest.ts',
      jestTestingLibrary: 'templates/unit-test/react/js/JestTestingLibrary.ts',
      vitest: 'templates/unit-test/react/js/Vitest.ts',
      vitestTestingLibrary: 'templates/unit-test/react/js/VitestTestingLibrary.ts'
    },
    ts: {
      jest: 'templates/unit-test/react/ts/Jest.ts',
      jestTestingLibrary: 'templates/unit-test/react/ts/JestTestingLibrary.ts',
      vitest: 'templates/unit-test/react/ts/Vitest.ts',
      vitestTestingLibrary: 'templates/unit-test/react/ts/VitestTestingLibrary.ts'
    }
  },
  vue: {
    js: {
      jest: 'templates/unit-test/vue/ts/Jest.ts',
      jestTestingLibrary: 'templates/unit-test/vue/ts/JestTestingLibrary.ts',
      vitest: 'templates/unit-test/vue/ts/Vitest.ts',
      vitestTestingLibrary: 'templates/unit-test/vue/ts/VitestTestingLibrary.ts'
    },
    ts: {
      jest: 'templates/unit-test/vue/ts/Jest.ts',
      jestTestingLibrary: 'templates/unit-test/vue/ts/JestTestingLibrary.ts',
      vitest: 'templates/unit-test/vue/ts/Vitest.ts',
      vitestTestingLibrary: 'templates/unit-test/vue/ts/VitestTestingLibrary.ts'
    }
  },
  function: {
    js: {
      jest: 'templates/unit-test/function/js/Jest.js',
      vitest: 'templates/unit-test/function/js/Vitest.js'
    },
    ts: {
      jest: 'templates/unit-test/function/ts/Jest.ts',
      vitest: 'templates/unit-test/function/ts/Vitest.ts'
    }
  }
}

/**
 * Stories templates
 */
export const storiesTemplates = {
  storybook: {
    vue: {
      3: {
        js: {
          component: 'templates/storybook/vue/3/js/Component.js'
        },
        ts: {
          component: 'templates/storybook/vue/3/ts/Component.ts'
        }
      }
    },
    react: {
      js: {
        component: 'templates/storybook/react/js/Component.jsx'
      },
      ts: {
        component: 'templates/storybook/react/ts/Component.tsx'
      }
    }
  }
}

/**
 * Functions templates
 */
export const functionTemplates = {
  js: 'templates/function/js/function.js',
  ts: 'templates/function/ts/function.ts'
}

/**
 * Styles templates
 *
 * @type {Record<keyof typeof CssFrameworkEnum, string>}
 */
export const stylesTemplates = {
  scss: 'templates/styles/Default.scss',
  css_modules: 'templates/styles/Default.css',
  vanilla_css: 'templates/styles/Default.css',
  tailwind_file: 'templates/styles/Tailwind.css'
}
