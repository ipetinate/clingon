import { defineConfig } from 'rollup'

import json from '@rollup/plugin-json'

export default defineConfig({
  input: 'src/main.js',
  output: {
    file: 'dist/tricorder.js',
    format: 'es',
    sourcemapFile: true
  },
  plugins: [json()]
})
