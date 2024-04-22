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
    ts: {
      component: {
        functional: {
          standard: "templates/react/ts/component/Functional.tsx",
          tailwind_file: "templates/react/ts/component/TailwindFunctional.tsx",
          tailwind_inline:
            "templates/react/ts/component/TailwindInlineFunctional.tsx",
          css_modules: "templates/react/ts/component/CssModulesFunctional.tsx",
        },
      },
    },
    js: {
      functional: "templates/react/js/Functional.jsx",
      tailwind_file: "templates/react/js/TailwindFunctional.jsx",
      tailwind_inline: "templates/react/js/TailwindInlineFunctional.jsx",
      css_modules: "templates/react/js/CssModulesFunctional.jsx",
    },
  },
  vue: {
    2: {
      js: {
        component: {
          options: {
            css_modules: "templates/vue/2/js/CssModulesOptions.vue",
            scss: "templates/vue/2/js/ScssOptions.vue",
            vanilla_css: "templates/vue/2/js/Options.vue",
            tailwind_file: "templates/vue/2/js/TailwindInlineOptions.vue",
            tailwind_inline: "templates/vue/2/js/TailwindOptions.vue",
          },
        },
      },
      ts: {
        component: {
          options: {
            css_modules: "templates/vue/2/ts/CssModulesOptions.vue",
            scss: "templates/vue/2/ts/ScssOptions.vue",
            vanilla_css: "templates/vue/2/ts/Options.vue",
            tailwind_file: "templates/vue/2/ts/TailwindInlineOptions.vue",
            tailwind_inline: "templates/vue/2/ts/TailwindOptions.vue",
          },
        },
      },
    },
    3: {
      js: {
        component: {
          options: {
            css_modules: "templates/vue/3/js/component/CssModulesOptions.vue",
            scss: "templates/vue/3/js/component/ScssOptions.vue",
            vanilla_css: "templates/vue/3/js/component/Options.vue",
            tailwind_file:
              "templates/vue/3/js/component/TailwindInlineOptions.vue",
            tailwind_inline: "templates/vue/3/js/component/TailwindOptions.vue",
          },
          setup: {
            css_modules: "templates/vue/3/js/component/CssModulesSetup.vue",
            scss: "templates/vue/3/js/component/ScssSetup.vue",
            vanilla_css: "templates/vue/3/js/component/Setup.vue",
            tailwind_file:
              "templates/vue/3/js/component/TailwindInlineSetup.vue",
            tailwind_inline: "templates/vue/3/js/component/TailwindSetup.vue",
          },
        },
        page: {
          options: {
            css_modules: "templates/vue/3/js/page/CssModulesOptions.vue",
            scss: "templates/vue/3/js/page/ScssOptions.vue",
            vanilla_css: "templates/vue/3/js/page/Options.vue",
            tailwind_file: "templates/vue/3/js/page/TailwindInlineOptions.vue",
            tailwind_inline: "templates/vue/3/js/page/TailwindOptions.vue",
          },
          setup: {
            css_modules: "templates/vue/3/js/page/CssModulesSetup.vue",
            scss: "templates/vue/3/js/page/ScssSetup.vue",
            vanilla_css: "templates/vue/3/js/page/Setup.vue",
            tailwind_file: "templates/vue/3/js/page/TailwindInlineSetup.vue",
            tailwind_inline: "templates/vue/3/js/page/TailwindSetup.vue",
          },
        },
      },
      ts: {
        component: {
          options: {
            css_modules: "templates/vue/3/ts/component/CssModulesOptions.vue",
            scss: "templates/vue/3/ts/component/ScssOptions.vue",
            vanilla_css: "templates/vue/3/ts/component/Options.vue",
            tailwind_file:
              "templates/vue/3/ts/component/TailwindInlineOptions.vue",
            tailwind_inline: "templates/vue/3/ts/component/TailwindOptions.vue",
          },
          setup: {
            css_modules: "templates/vue/3/ts/component/CssModulesSetup.vue",
            scss: "templates/vue/3/ts/component/ScssSetup.vue",
            vanilla_css: "templates/vue/3/ts/component/Setup.vue",
            tailwind_file:
              "templates/vue/3/ts/component/TailwindInlineSetup.vue",
            tailwind_inline: "templates/vue/3/ts/component/TailwindSetup.vue",
          },
        },
        page: {
          options: {
            css_modules: "templates/vue/3/ts/page/CssModulesOptions.vue",
            scss: "templates/vue/3/ts/page/ScssOptions.vue",
            vanilla_css: "templates/vue/3/ts/page/Options.vue",
            tailwind_file: "templates/vue/3/ts/page/TailwindInlineOptions.vue",
            tailwind_inline: "templates/vue/3/ts/page/TailwindOptions.vue",
          },
          setup: {
            css_modules: "templates/vue/3/ts/page/CssModulesSetup.vue",
            scss: "templates/vue/3/ts/page/ScssSetup.vue",
            vanilla_css: "templates/vue/3/ts/page/Setup.vue",
            tailwind_file: "templates/vue/3/ts/page/TailwindInlineSetup.vue",
            tailwind_inline: "templates/vue/3/ts/page/TailwindSetup.vue",
          },
        },
      },
    },
  },
};

/**
 * Built-in templates for unit tests path dictionary
 */
export const unitTestTemplates = {
  generic: {
    ts: {
      unit: "templates/tests/generic/ts/unit.ts",
    },
    js: {
      unit: "templates/tests/generic/js/unit.js",
    },
  },
  react: {
    js: {
      jest: "templates/tests/react/js/Jest.ts",
      jestTestingLibrary: "templates/tests/react/js/JestTestingLibrary.ts",
      vitest: "templates/tests/react/js/Vitest.ts",
      vitestTestingLibrary: "templates/tests/react/js/VitestTestingLibrary.ts",
    },
    ts: {
      jest: "templates/tests/react/ts/Jest.ts",
      jestTestingLibrary: "templates/tests/react/ts/JestTestingLibrary.ts",
      vitest: "templates/tests/react/ts/Vitest.ts",
      vitestTestingLibrary: "templates/tests/react/ts/VitestTestingLibrary.ts",
    },
  },
  vue: {
    js: {
      jest: "templates/tests/vue/ts/Jest.ts",
      jestTestingLibrary: "templates/tests/vue/ts/JestTestingLibrary.ts",
      vitest: "templates/tests/vue/ts/Vitest.ts",
      vitestTestingLibrary: "templates/tests/vue/ts/VitestTestingLibrary.ts",
    },
    ts: {
      jest: "templates/tests/vue/ts/Jest.ts",
      jestTestingLibrary: "templates/tests/vue/ts/JestTestingLibrary.ts",
      vitest: "templates/tests/vue/ts/Vitest.ts",
      vitestTestingLibrary: "templates/tests/vue/ts/VitestTestingLibrary.ts",
    },
  },
};
