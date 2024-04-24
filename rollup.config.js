import { defineConfig } from 'rollup'

import copy from 'rollup-plugin-copy'
import json from '@rollup/plugin-json'
import terser from '@rollup/plugin-terser'

export default defineConfig({
  input: 'src/main.js',
  output: {
    file: 'lib/main.js',
    format: 'es',
    sourcemapFile: true,
    plugins: [terser()]
  },
  plugins: [
    json(),
    copy({
      targets: [{ src: 'src/templates', dest: 'lib' }]
    })
  ]
})
