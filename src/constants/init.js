export const templateCoreFiles = [
  {
    folder: 'templates/core/functions',
    target: 'functions',
    files: ['AsyncFunction.ts', 'AsyncFunction.spec.ts']
  },
  {
    folder: 'templates/core/markdown',
    target: 'docs',
    files: ['HookDoc.md']
  },
  {
    folder: 'templates/core/react-component',
    target: 'component/react-component',
    files: [
      'index.tsx',
      'Component.tsx',
      'Component.test.tsx',
      'Component.styles.css',
      'Component.stories.tsx'
    ]
  },
  {
    folder: 'templates/core',
    target: '',
    files: ['meta.yaml', 'SCAFFOLD_GUIDE.md']
  }
]

export const presetsCoreFiles = [
  {
    folder: 'templates/core',
    target: '',
    files: ['PRESETS_GUIDE.md', 'function-preset.json']
  }
]

export const globalCoreFiles = [
  {
    folder: 'templates/core',
    target: '',
    files: ['clingon.config.json']
  }
]
