#!/usr/bin/env node

import { Command } from 'commander'

import { coldStart } from './flows/coldStart.js'

import { initAction } from './actions/init.js'
import { guidedAction } from './actions/guided.js'
import { createAction } from './actions/create.js'

import { TestFrameworkEnum } from './enums/frameworks.js'
import { getLocalLibDirname } from './utils/directory.js'
import { scaffoldAction } from './actions/scaffold.js'

/*
 * Global Variables
 */

const localDirname = getLocalLibDirname()

/*
 * Start app
 */

const { globalConfig } = await coldStart()

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
  .version('0.9.5', '-v, --version', 'Current version')

/*
 * Guided flow - generate components based on prompt answers
 */

program
  .command('gen')
  .argument('[name]', 'Resource name')
  .action(guidedAction)
  .description(
    'Start a guided flow to generate resources (components, functions, pages, etc)'
  )

/*
 * Advanced flow - generate components based on local templates
 */

program
  .command('scaffold')
  .argument('<name>', 'Resource name')
  .option('-t, --template <template>', 'Template name')
  .action(scaffoldAction)
  .description(
    'Generate resources based on a local template config inside meta.yaml or meta.json'
  )

/*
 * Preset flow - create instantly resources with presets
 */

program
  .command('create')
  .argument('<name>', 'Resource name')
  .option('-p, --preset [preset]', 'Preset name')
  .option(
    '-t, --type [resourceType]',
    'Resource type: "function" | "page" | "component"'
  )
  .option(
    '-vv, --vue-version [vueVersion]',
    'Vue version: "2" | "3" (default: 3))',
    '3'
  )
  .option(
    '-f, --framework [frameworkName]',
    'Framework name for default preset: vue or react'
  )
  .option(
    '-cs, --css-framework [cssFramework]',
    'Style approach: "css_modules" | "tailwind_inline" | "tailwind_file" | "css_vanilla" | "scss" (default: no_style)',
    'no_style'
  )
  .option(
    '-tf, --test-framework [testFrameworkName]',
    'Test framework: jest or vitest (default: vitest)',
    TestFrameworkEnum.vitest
  )
  .option(
    '-rp, --path [resourcePath]',
    'Path to resource, use dot (".") to current dir where command is executed'
  )
  .option(
    '-tp, --test-path [testPath]',
    'Path to test, use dot (".") to current dir where command is executed, if ommited, and --spec is present, will use the same path to resource'
  )
  .option(
    '-sp, --story-path [storyPath]',
    'Path to story, use dot (".") to current dir where command is executed, if ommited, and --spec is present, will use the same path to resource'
  )
  .option('-ts, --typescript', 'With TypeScript (default: false)', false)
  .option(
    '-tl, --testing-library',
    'With Testing Library (default: false)',
    false
  )
  .option('--test', 'Add test file (default: false)', false)
  .option('--spec', 'Add spec file (default: false)', false)
  .option('--story', 'Add story file (default: false)', false)
  .option(
    '-fw, --folder-wrapper',
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
 * Init tool assets, generate clingon.config.json
 */

program
  .command('init')
  .action(initAction)
  .option('-e, --examples [examples]', 'Generate folders with examples', false)
  .description(
    'Init all needed setup, generate files and create folders to store assets.'
  )

/*
 * Parse program to execution
 */

program.parse()

/*
 * Exports
 */

export { globalConfig, localDirname }
