/**
 * Built-in templates for components and pages path dictionary
 */
export const frameworkTemplates = {
  react: {
    ts: {
      // TODO: add react class templates
      functional: "src/templates/react/ts/FunctionalComponent.tsx",
      tailwind_file: "src/templates/react/ts/TailwindFunctionalComponent.tsx",
      tailwind_inline:
        "src/templates/react/ts/TailwindInlineFunctionalComponent.tsx",
      css_modules: "src/templates/react/ts/CssModulesFunctionalComponent.tsx",
    },
    js: {
      // TODO: add react class templates
      functional: "src/templates/react/js/FunctionalComponent.jsx",
      tailwind_file: "src/templates/react/js/TailwindFunctionalComponent.jsx",
      tailwind_inline:
        "src/templates/react/js/TailwindInlineFunctionalComponent.jsx",
      css_modules: "src/templates/react/js/CssModulesFunctionalComponent.jsx",
    },
  },
  vue: {
    2: {
      js: {
        options: "src/templates/vue/3/js/OptionsComponent.vue",
      },
      ts: {
        options: "src/templates/vue/2/ts/OptionsComponent.vue",
      },
    },
    3: {
      ts: {
        setup: "src/templates/vue/3/ts/SetupComponent.vue",
      },
      js: {
        setup: "src/templates/vue/3/js/SetupComponent.vue",
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
      unit: "src/templates/tests/generic/ts/unit.ts",
    },
    js: {
      unit: "src/templates/tests/generic/js/unit.js",
    },
  },
  // TODO: add jest, vitest, etc
};
