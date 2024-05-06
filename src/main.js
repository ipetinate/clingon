#!/usr/bin/env node

import { Command } from 'commander'

import { guidedAction } from './actions/guided.js'
import { createAction } from './actions/create.js'

import { getLocalLibDirname } from './utils/directory.js'

import packageJson from '../package.json' assert { type: 'json' }

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
  .version(packageJson.version, '-v, --version', 'Current version')

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
  .option('--preset <preset>', 'Preset name')
  .action(createAction)
  .usage('create <resourceName> -p <presetName>')
  .description(
    'Creates the resources with a local preset in non-verbose mode (preview and ask to confirm are not shown, resources will be created immediately), if the preset folder is empty, it will call the guided flow (the same as the `gen` command executes)'
  )

/*
 * Parse program to execution
 */

program.parse()
