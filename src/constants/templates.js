/**
 * Built-in templates path dictionary
 */
export const templates = {
  react: {
    ts: {
      functional: "src/templates/react/ts/FuncionalComponent.tsx",
    },
    js: {
      functional: "src/templates/react/js/FuncionalComponent.jsx",
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
