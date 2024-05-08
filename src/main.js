#!/usr/bin/env node

import { Command } from 'commander'

import { guidedAction } from './actions/guided.js'
import { createAction } from './actions/create.js'

import { getLocalLibDirname } from './utils/directory.js'
import { TestFrameworkEnum } from './enums/frameworks.js'

/*
 * Global Variables
 */

export const localDirname = getLocalLibDirname()

/*
 * Resources
 */

const program = new Command()

/*
 * Setup
 */

program
  .name('clingon')
  .description('CLI to generate files based on templates')
  .version('0.9.0', '-v, --version', 'Current version')

/*
 * Guided flow - generate components based on prompt answers
 */

program
  .command('gen')
  .argument('[name]', 'Resource name')
  .action(guidedAction)
  .description('Start a guided flow to generate resources (components, functions, pages, etc)')

/*
 * Preset flow - create instantly resources with presets
 */

program
  .command('create')
  .argument('<name>', 'Resource name')
  .option('--preset [preset]', 'Preset name')
  .option('--type <resourceType>', 'Resource type: "function" | "page" | "component"')
  .option('--vue-version [vueVersion]', 'Vue version: "2" | "3" (default: 3))', '3')
  .option('--framework <frameworkName>', 'Framework name for default preset: vue or react')
  .option(
    '--css-framework [cssFramework]',
    'Style approach: "css_modules" | "tailwind_inline" | "tailwind_file" | "css_vanilla" | "scss" (default: no_style)',
    'no_style'
  )
  .option(
    '--test-framework [testFrameworkName]',
    'Test framework: jest or vitest (default: vitest)',
    TestFrameworkEnum.vitest
  )
  .option(
    '--path <resourcePath>',
    'Path to resource, use dot (".") to current dir where command is executed'
  )
  .option(
    '--test-path [testPath]',
    'Path to test, use dot (".") to current dir where command is executed, if ommited, and --spec is present, will use the same path to resource'
  )
  .option(
    '--story-path [storyPath]',
    'Path to story, use dot (".") to current dir where command is executed, if ommited, and --spec is present, will use the same path to resource'
  )
  .option('--typescript', 'With TypeScript (default: false)', false)
  .option('--testing-library', 'With Testing Library (default: false)', false)
  .option('--test', 'Add test file (default: false)', false)
  .option('--spec', 'Add spec file (default: false)', false)
  .option('--story', 'Add story file (default: false)', false)
  .option(
    '--folder-wrapper',
    'Creates a folder with the name of the resource, with the files inside it',
    false
  )
  .action(createAction)
  .usage('create <resourceName> --preset <presetName>')
  .usage(
    'create <resourceName> --type (component | page | function) --framework <framework> (--test | --spec) --typescript --folder-wrapper --story --test-framework (vitest | jest)'
  )
  .description(
    'Creates the resources with a local preset in non-verbose mode (preview and ask to confirm are not shown, resources will be created immediately), if the preset folder is empty, it will call the guided flow (the same as the `gen` command executes)'
  )

/*
 * Parse program to execution
 */

program.parse()
