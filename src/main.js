#!/usr/bin/env node

import { Command } from 'commander'

import { guidedAction } from './actions/guided.js'
import { getLocalLibDirname } from './utils/directory.js'

import packageJson from '../package.json' assert { type: 'json' }
import { createAction } from './actions/create.js'

/*
 * Global Variables
 */

export const localDirname = getLocalLibDirname()

/*
 * Resources
 */

const program = new Command()

program
  .name('clingon')
  .description('CLI to generate files based on templates')
  .version(packageJson.version, '-v, --version', 'Current version')

/*
 * Read config file from rootDir
 */

// const config = readLocalConfig("clingon.json");

/*
 * Autogen flow - using built-in opinionated templates
 */

// TODO

/*
 * Guided flow - using user local templates from /.clingon-templates
 */

program
  .command('gen')
  .argument('[name]', 'Resource name')
  .action(guidedAction)
  .description('Start a guided flow to generate resources (components, functions, pages, etc)')

/*
 * Preset flow to create with no verbose
 */
program
  .command('create')
  .argument('<name>', 'Resource name')
  .option('-p, --preset <preset>', 'Preset name')
  .action(createAction)
  .description(
    'Creates the resources with a local preset in non-verbose mode (preview and ask to confirm are not shown, resources will be created immediately), if the preset folder is empty, it will call the guided flow (the same as the `gen` command executes)'
  )

/*
 * Init flow - generate needed files
 */

// TODO

/*
 * Parse program to execution
 */
program.parse()
